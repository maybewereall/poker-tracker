import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { gameId: string, playerId: string } }
) {
    const body = await req.json();
    const { playerId } = body;
    const { userId } = auth();
    if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 })
    }
    try {
        const player = await prismadb.players.findUnique({ where: { player_id: Number(playerId) } });

        if (!player) {
            return new NextResponse('Player not found', { status: 404 });
        }

        const participant = await prismadb.gameParticipants.create({
            data: {
                game_id: Number(params.gameId),
                player_id: Number(playerId),
                cash_out_amount: -1
            },
        });

        return NextResponse.json(participant, {status: 200});
    } catch (error) {
        console.error(error);
        return new NextResponse('An error occurred while adding the player to the game.', { status: 500 } );
    }
}