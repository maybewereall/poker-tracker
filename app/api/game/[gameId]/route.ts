import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { gameId: string } }
) {
    try {
        if (!params.gameId){
            return new NextResponse("Game ID is required", { status: 400 });
        }
        
        const game = await prismadb.game.findUnique({
            where: {
                id: params.gameId,
            }
        });

        return NextResponse.json(game);
    } catch (error) {
        console.log("[GAME_GET]", error);
        return new NextResponse("Internal error", { status: 500 })
    }
}