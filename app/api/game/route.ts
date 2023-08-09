import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        if(!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        const game = await prismadb.game.create({
            data: {
                date: new Date
            }
        });

        return NextResponse.json(game);
        
    } catch (error) {
        console.log('[GAME_POST]', error);
        return new NextResponse("Internal error", {status: 500})
    }
}