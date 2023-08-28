import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    req:Request,
    { params }: { params: { gameId: string } }
) {
    console.log({"[GAME_ID_PARAM]": params.gameId});
    const gamesResults = await prismadb.gameParticipants.findMany({
        where: {
            game_id: Number(params.gameId)
        },
        include: {
            buy_in: true,
            player: true
        }
    });
    console.log(gamesResults);
    return NextResponse.json(gamesResults);
}