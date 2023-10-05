import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
) {
    try {
        const game = await prismadb.games.findFirst({
            where: {
                active: true
              },
              orderBy: {
                game_date: 'desc'
              }
        });
        return NextResponse.json(game);
    } catch (error) {
        console.log("[GAME_GET]", error);
        return new NextResponse(`Internal error`, { status: 500 })
    }
}