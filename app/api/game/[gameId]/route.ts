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

        if (isNaN(parseInt(params.gameId))) {
            return new NextResponse("Invalid Game ID", { status: 400 });
        }
        
        const game = await prismadb.games.findUnique({
            where: {
                game_id: parseInt(params.gameId),
            },
            include: {
                gameParticipants: {
                    include: {
                        player: true,
                        buy_in: true
                    },
                    orderBy: {
                        player: {
                            full_name: 'asc'
                        }
                    },
                },
            },
        });

        return NextResponse.json(game);
    } catch (error) {
        console.log("[GAME_GET]", error);
        return new NextResponse(`Internal error`, { status: 500 })
    }
}