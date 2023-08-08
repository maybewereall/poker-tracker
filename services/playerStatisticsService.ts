import prismadb from '@/lib/prismadb';

interface IAddPlayerStatistics {
    playerId: number
    buyInAmount: number;
    cashOutAmount: number;
}

export async function addPlayerStatistics({
    playerId,
    buyInAmount,
    cashOutAmount
}: IAddPlayerStatistics) {
  try {
    // const newStatistics = await prismadb.playerStatistics.create({
    //   data: {
    //     player: {
    //       connect: {
    //         player_id: playerId,
    //       },
    //     },
    //     total_games_played: 1,
    //     total_buy_ins: buyInAmount,
    //     total_cash_outs: cashOutAmount,
    //   },
    // });

    // return newStatistics;
  } catch (error) {
    throw new Error('Error adding player statistics');
  }
}