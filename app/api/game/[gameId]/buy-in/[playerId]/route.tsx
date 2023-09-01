// buy in via player id param

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { gameId: string, playerId: string } }
) {
    const body = await req.json();
    console.log({body});
    const { participant_id, amount, timestamp } = body;
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
        const updatedParticipant = await prismadb.buyIn.create({
            data: {
                amount: Number(amount),
                timestamp: new Date(timestamp),
                participant: {
                  connect: {
                    participant_id,
                  },
                },
              },
          });
        return NextResponse.json(updatedParticipant);
    } catch (error) {
        console.log("[TOPUP_PATCH]", error);
        return new NextResponse(`Internal error`, { status: 500 })
    }
}