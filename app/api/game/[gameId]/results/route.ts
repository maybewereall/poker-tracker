import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function GET(
    req: Request,
    { params }: { params: { gameId: string } }
) {
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

export async function POST(
    req: Request,
    { params }: { params: { gameId: string } }
) {
    const body = await req.json();
    const { rake, results } = body;
    const { userId } = auth();

    if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 })
    }
    if (!params.gameId) {
        return new NextResponse("Game ID is required", { status: 400 });
    }
    if (isNaN(parseInt(params.gameId))) {
        return new NextResponse("Invalid Game ID", { status: 400 });
    }

    const gameId = Number(params.gameId);

    try {
        // UPDATE GAME STATISTICS
        const existingGameStatistics = await prismadb.gameStatistics.findUnique({
            where: { game_id: gameId }
        });

        if (existingGameStatistics) {
            return new NextResponse("Game statistics already exist for this game ID", { status: 400 });
        }

        let totalBuyIns = 0;
        let totalCashOuts = 0;
        let gameStatistics;

        for (const result of results) {
            totalBuyIns += result.buyIns;
            totalCashOuts += result.cashOutAmount;
        }

        try {
            gameStatistics = await prismadb.gameStatistics.create({
                data: {
                    game_id: gameId,
                    buy_ins: totalBuyIns,
                    cash_outs: totalCashOuts,
                    result: totalBuyIns - (totalCashOuts + Number(rake)),
                    rake: Number(rake)
                }
            });
        } catch (error: any) {
            console.log("[GAME_STATISTICS_CREATE_ERROR]", error);
            return new NextResponse("Error creating game statistics", { status: 500 });
        }

        // UPDATE PLAYER STATISTICS
        const playerUpdates = [];

        for (const result of results) {
            playerUpdates.push(
                prismadb.playerStatistics.upsert({
                    where: { player_id: result.playerId },
                    update: {
                        total_games_played: { increment: 1 },
                        total_buy_ins: { increment: result.buyIns },
                        total_cash_outs: { increment: result.cashOutAmount }
                    },
                    create: {
                        player_id: result.playerId,
                        total_games_played: 1,
                        total_buy_ins: result.buyIns,
                        total_cash_outs: result.cashOutAmount
                    }
                })
            );
        }

        try {
            await prismadb.$transaction(playerUpdates);
        } catch (error: any) {
            console.log("[PLAYER_STATISTICS_UPSERT_ERROR]", error);
            return new NextResponse("Error upserting player statistics", { status: 500 });
        }

        // SET GAME ACTIVE TO FALSE
        try {
            await prismadb.games.update({
                where: {
                    game_id: gameId
                },
                data: {
                    active: false
                }
            });
        } catch (error: any) {
            console.log("[GAME_UPDATE_ERROR]", error);
            return new NextResponse("Error updating game", { status: 500 });
        }
        return NextResponse.json(gameStatistics);
    } catch (error: any) {
        console.log("[GAME_COMPLETE_POST]", error, { status: 500 })
        return new NextResponse(error);
    }
}