import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export async function GET(
    req: Request,
    { params }: { params: { playerId: string } }
) {
    const playerId = Number(params.playerId);
    let playerStats;
    let gameStats;
    try {
        try {
            playerStats = await prismadb.playerStatistics.findUnique({
                where: {
                    player_id: playerId
                },
                include: {
                    player: true
                }
            });
            
        } catch (error: any) {
            return new NextResponse("Could not fetch player stats", { status: 500 });
        }
        try {
            gameStats = await prismadb.gameParticipants.findMany({
                where: {
                    player_id: playerId,
                    game: {
                        active: false
                    }
                },
                include: {
                    buy_in: true,
                    game: true
                },
                orderBy: {
                    game_id: 'desc'
                }
            })
            return NextResponse.json({playerStats, gameStats});
        } catch (error: any) {
            console.log("[PLAYER_GAME_STATS_GET]: ", error);
            return new NextResponse("Could not fetch game stats", { status: 500 });
        }
    } catch (error: any) {
        console.log("[PLAYER_GET]: ", error);
        return new NextResponse("something went wrong", { status: 500 });
    }
}
