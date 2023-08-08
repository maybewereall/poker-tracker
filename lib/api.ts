import { NextResponse } from "next/server";

export const handleApiError = (error: Error, errorName: string) => {
    console.log(`[${errorName}]`, error);
    return new NextResponse("Internal error", { status: 500 });
};