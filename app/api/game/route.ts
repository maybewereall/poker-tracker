import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Players } from "@prisma/client";

export async function GET(
    req: Request
) {
    try {
        const games = await prismadb.games.findMany();
        if (games) {
            return NextResponse.json(games);
        } else {
            return new NextResponse("No games available", { status: 404 })
        }
    } catch (error) {
        console.log("[GAME_GET]", error);
        return new NextResponse(`Internal error`, { status: 500 })
    }
}

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }
        const body = await req.json();
        const { date, initial_buyin, players } = body;

        const newGame = await prismadb.games.create({
            data: {
                game_date: date,
                location: "Aria",
                gameParticipants: {
                    create: players.map((player: Players) => ({
                        player: {
                            connect: { player_id: player.player_id },
                        },
                        cash_out_amount: -1,
                    })),
                },
            },
            include: {
                gameParticipants: {
                    include: {
                        player: true,
                    },
                },
            },
        });

        for (let eachParticipant of newGame.gameParticipants) {
            await prismadb.buyIn.create({
                data: {
                    amount: initial_buyin,
                    timestamp: new Date(),
                    participant: {
                        connect: {
                          participant_id: eachParticipant.participant_id
                        },
                    },
                },
            });
        }

        return NextResponse.json(newGame);

    } catch (error) {
        console.log('[GAME_POST]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}