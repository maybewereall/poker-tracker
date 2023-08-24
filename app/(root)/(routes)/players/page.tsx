import format from "date-fns/format";

import { PlayerColumn } from './components/columns';
import PlayerClient from './components/client';

import prismadb from "@/lib/prismadb";


export default async function PlayerPage() {
  const players = await prismadb.players.findMany({
    include: {
      playerStatistics: true
    }
  })
  const formattedPlayers: PlayerColumn[] = players.map((item) => ({
    player_id: item.player_id,
    full_name: item.full_name,
    email: item.email,
    playerStatistics: item.playerStatistics,
    date_joined: format(item.date_joined, "MMM do, yyyy")
  }))
  return (
    <div className="flex-col w-full max-w-[800px] mx-auto">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <PlayerClient data={formattedPlayers}/>
        </div>
    </div>
  )
}
