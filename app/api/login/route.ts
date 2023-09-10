import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST( req: Request, res: NextResponse) {
    const body = await req.json();
    const { email, password } = body;

    const user = await prismadb.user.findFirst({
        where: {
            username: email
        }
    });

    if(!user) {
        return new NextResponse("Invalid email or password", { status: 401 });
    }

    const validPassword = await bcrypt.compare(password, user.password);

}