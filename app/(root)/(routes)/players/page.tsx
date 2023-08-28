import format from "date-fns/format";

import { PlayerColumn } from './components/columns';
import PlayerClient from './components/client';

import prismadb from "@/lib/prismadb";


export default async function PlayerPage() {
 
  const playersWithStatistics = await prismadb.players.findMany({
    include: {
      playerStatistics: true,
    },
    orderBy: {
      playerStatistics:{
        total_games_played: 'desc'
      }
    }
  });
  const formattedPlayers: PlayerColumn[] = playersWithStatistics.map((item) => ({
    player_id: item.player_id,
    full_name: item.full_name,
    playerStatistics: item.playerStatistics,
    total_games: item.playerStatistics?.total_games_played || 0,
    total_buy_in: item.playerStatistics?.total_buy_ins || 0,
    total_cash_out: item.playerStatistics?.total_cash_outs || 0,
    profit: item.playerStatistics ? item.playerStatistics.total_cash_outs - item.playerStatistics.total_buy_ins : 0,
  }));

  return (
    <div className="flex-col w-full max-w-[800px] mx-auto">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <PlayerClient data={formattedPlayers}/>
        </div>
    </div>
  )
}
