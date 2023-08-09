import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
export async function GET(
    req: Request
) {
    try {
        const players = await prismadb.player.findMany();
        return NextResponse.json(players);
    } catch (error) {
        console.log('[PLAYERS_POST]', error);
        return new NextResponse("Internal error", {status: 500})
    }
}
export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { name } = body;
        console.log({name});
        if(!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }
        if (!name) {
            return new NextResponse("name is required", { status: 400 })
        }

        const player = await prismadb.player.create({
            data: {
                name
            }
        })

        return NextResponse.json(player);

    } catch (error) {
        console.log('[PLAYERS_POST]', error);
        return new NextResponse("Internal error", {status: 500})
    }
}