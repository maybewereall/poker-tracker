import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { gameId: string, playerId: string } }
) {
    const body = await req.json();
    console.log({body});
    const { participant_id, amount } = body;
    const { userId } = auth();
    
    if(!userId) {
        return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!params.gameId){
        return new NextResponse("Game ID is required", { status: 400 });
    }

    if (!params.playerId){
        return new NextResponse("Player ID is required", { status: 400 });
    }

    try {
        const updatedParticipant = await prismadb.gameParticipants.update({
            where: {
                participant_id: participant_id
            },
            data: {
                cash_out_amount: parseInt(amount)
            },
          });
        return NextResponse.json(updatedParticipant);
    } catch (error) {
        console.log("[CASHOUT_PATCH]", error);
        return new NextResponse(`Internal error`, { status: 500 })
    }
}