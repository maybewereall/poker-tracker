import { handleApiError } from "@/lib/api";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req: Request
) {
    try {
        const players = await prismadb.players.findMany();
        if(players) {
            return NextResponse.json(players);
        } else {
            return new NextResponse("Couldn't get players", {status: 404})
        }
    } catch (error) {
        console.log("[PLAYERS_GET]", error);
        return new NextResponse(`Internal error`, { status: 500 })
    }
}

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { full_name, email } = body;

        if(!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if(!full_name) {
            return new NextResponse("Username is required", { status: 402 })
        }
        const player = await prismadb.players.create({
            data: {
                full_name,
                email,
                date_joined: new Date()
            },
        })

        return NextResponse.json(player);

    } catch (error) {
        console.log('[PLAYERS_POST]', error);
        return new NextResponse("Internal error", {status: 500})
    }
}