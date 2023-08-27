import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { gameId: string } }
) {
    const body = await req.json();
    const { rake, results } = body;
    const { userId } = auth();

    console.log({ rake, results });

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
        const existingGameStatistics = await prismadb.gameStatistics.findUnique({
            where: { game_id: gameId }
        });

        if (existingGameStatistics) {
            return new NextResponse("Game statistics already exist for this game ID", { status: 400 });
        }

        let totalBuyIns = 0;
        let totalCashOuts = 0;
        const participantUpdates = [];

        for (const result of results) {
            try {
                participantUpdates.push(
                    prismadb.gameParticipants.update({
                        where: { player_id: result.playerId, participant_id: result.participantId, game_id: gameId },
                        data: { cash_out_amount: result.cashOutAmount }
                    })
                );
            } catch (error: any) {
                console.log("[GAME_PARTICIPANT_UPDATE_ERROR]", error);
                return new NextResponse("Error updating game participant", { status: 500 });
            }

            totalBuyIns += result.buyIns;
            totalCashOuts += result.cashOutAmount;
        }

        try {
            await prismadb.$transaction(participantUpdates);
        } catch (error: any) {
            console.log("[TRANSACTION_ERROR]", error);
            return new NextResponse("Error executing transaction", { status: 500 });
        }

        let gameStatistics;
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