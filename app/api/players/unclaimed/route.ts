import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export async function GET(
    req: Request,
) {
    try {
        const players = await prismadb.players.findMany({
            where: {
                googleId: null
            },
            orderBy: {
                full_name: 'asc'
            }
        });
        if(players) {
            return NextResponse.json(players);
        } else {
            return new NextResponse("Couldn't get players", {status: 404})
        }
    } catch (error) {
        console.log("[UNCLAIMED_GET]", error);
        return new NextResponse(`Internal error`, { status: 500 })
    }
}