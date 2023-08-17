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
        console.log('[GAME_GET]', error);
        return new NextResponse("Internal error", { status: 500 })
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
                            connectOrCreate: {
                                where: { player_id: player.player_id },
                                create: {
                                    player_id: player.player_id,
                                    full_name: player.full_name,
                                    email: player.email,
                                    date_joined: new Date()
                                },
                            },
                        },
                        buy_in_amount: parseInt(initial_buyin),
                        cash_out_amount: 0,
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

        return NextResponse.json(newGame);

    } catch (error) {
        console.log('[GAME_POST]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}