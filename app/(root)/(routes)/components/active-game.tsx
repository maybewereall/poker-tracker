import { formatter } from '@/lib/utils'
import { Games } from '@prisma/client'
import Link from 'next/link'

type Props = {
    game: Games
}

export default function ActiveGame({game}: Props) {
    // const dateTime = new Date(game.game_date);
  return (
    <div className="w-full text-center mb-12 border p-6 rounded-xl">
        <h3 className="text-2xl font-bold py-3">Active Game</h3>
        <Link href={`/game/${game.game_id}`}>
            <div className="bg-muted w-full md:w-[600px] mx-auto flex justify-center p-3 border border-blue-900 rounded-xl">
                <div className="font-xl font-bold">Game: {game.game_id}</div>
            </div>
        </Link>
    </div>
  )
}