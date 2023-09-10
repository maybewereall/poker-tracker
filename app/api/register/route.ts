import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import bcrypt from "bcrypt";

export async function POST(
    req: Request,
    res: NextResponse
) {
    const body = await req.json();
    const { email, password } = body;

    if( !email || !password ) {
        return new NextResponse("Missing data in request", { status: 406 })
    }

    try {
        const existingUser = await prismadb.user.findMany({
            where: {
                username: email
            }
        });

        if(existingUser.length > 0) {
            return new NextResponse("User with this email already exists", { status: 406 })
        }

        const user = await prismadb.user.create({
            data: {
                username: email,
                password: await bcrypt.hash(password, 10)
            }
        });
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return new NextResponse(`Could not add user: ${error}`, { status: 500 })
    }
}