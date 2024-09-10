import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import { auth } from "@clerk/nextjs/server";

export async function GET() {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        const players = await prismadb.players.findMany({
            where: {
                email: "demo@email.com"
            },
            select: {
                player_id: true,
                full_name: true
            }
        });

        return NextResponse.json(players);
    } catch (error) {
        console.error('[PLAYERS_GET]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function PATCH(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { selected_player_id, loggedIn_email } = body;

        if(!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }
        if(!selected_player_id) {
            return new NextResponse("Missing Player Id", { status: 402 })
        }

        if(!loggedIn_email) {
            return new NextResponse("Username is required", { status: 402 })
        }


        const updatePlayer = await prismadb.players.update({
            data: {
                email: loggedIn_email
            },
            where: {
                player_id: parseInt(selected_player_id)
            }
        })

        return NextResponse.json(updatePlayer);
    }
    catch (error: any) {
        console.log('[ONBOARDING_POST]', error);
        return new NextResponse("Internal error", {status: 500})
    }
}