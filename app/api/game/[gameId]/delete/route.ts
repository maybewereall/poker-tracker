import prismadb from "@/lib/prismadb";
export async function GET(
    req: Request,
    { params }: { params: { gameId: string } }
) {
try {
    const gameId = Number(params.gameId);
    await prismadb.$transaction([
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
  } catch (error) {
    console.error("Error deleting game: ", error);
  }
}