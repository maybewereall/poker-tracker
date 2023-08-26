import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { gameId: string } }
) {
    const body = await req.json();
    const { participant_id, amount } = body;
    const { userId } = auth();
    if(!userId) {
        return new NextResponse("Unauthenticated", { status: 401 })
    }
    if (!params.gameId){
        return new NextResponse("Game ID is required", { status: 400 });
    }
    if (isNaN(parseInt(params.gameId))) {
        return new NextResponse("Invalid Game ID", { status: 400 });
    }

    

    try {

    } catch (error: any) {

    }
}