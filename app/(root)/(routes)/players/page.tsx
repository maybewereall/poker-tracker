import format from "date-fns/format";

import { PlayerColumn } from './components/columns';
import PlayerClient from './components/client';

import prismadb from "@/lib/prismadb";


export default async function PlayerPage() {
  const players = await prismadb.player.findMany({
    include: {
      games: true
    }
  })
  console.log({players});
  const formattedPlayers: PlayerColumn[] = players.map((item, index) => ({
    id: item.id,
    games: item.games.length,
    name: item.name,
    // games: item.games.length,
    createdAt: format(item.createdAt, "MMM do, yyyy")
  }))
  return (
        <div className="flex-col w-full max-w-[800px]">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <PlayerClient data={formattedPlayers}/>
            </div>
        </div>
  )
}
