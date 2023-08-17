import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function GET(
    req: Request
) {
    try {
        const games = await prismadb.games.findMany();
        if(games) {
            return NextResponse.json(games);
        } else {
            return new NextResponse("No games available", { status: 404 })
        }
    } catch (error) {
        console.log('[GAME_GET]', error);
        return new NextResponse("Internal error", {status: 500})
    }
}

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        if(!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }
        const gameData = {
            game_date: new Date(), 
            location: 'Aria',
        }
        const game = await prismadb.games.create({
            data: gameData
        });

        return NextResponse.json(game);
        
    } catch (error) {
        console.log('[GAME_POST]', error);
        return new NextResponse("Internal error", {status: 500})
    }
}