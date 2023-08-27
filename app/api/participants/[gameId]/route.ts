import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { gameId: string } }
) {
    try {
        const players = await prismadb.gameParticipants.findMany({
            where: {
                game_id: Number(params.gameId)
            },
            include: {
                player: true
            }
        });
        if(players) {
            return NextResponse.json(players);
        } else {
            return new NextResponse("Couldn't get players", {status: 404})
        }
    } catch (error) {
        console.log("[PLAYERS_GET]", error);
        return new NextResponse(`Internal error`, { status: 500 })
    }
}