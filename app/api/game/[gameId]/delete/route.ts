import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
export async function GET(
    req: Request,
    { params }: { params: { gameId: string } }
) {
try {
    const gameId = Number(params.gameId);
    const deleteGame = await prismadb.$transaction([
      prismadb.buyIn.deleteMany({
        where: {
          participant: {
            game_id: gameId,
          },
        },
      }),
      prismadb.gameParticipants.deleteMany({
        where: {
          game_id: gameId,
        },
      }),
      prismadb.gameStatistics.deleteMany({
        where: {
          game_id: gameId,
        },
      }),
      prismadb.games.delete({
        where: {
          game_id: gameId,
        },
      }),
    ]);
    return NextResponse.json(deleteGame);
  } catch (error) {
    console.error("Error deleting game: ", error);
    return new NextResponse("[GAME_DELETE]:", {status: 500})
  }
}