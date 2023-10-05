import { formatter } from '@/lib/utils'
import { Games } from '@prisma/client'
import Link from 'next/link'

type Props = {
    game: Games
}

export default function ActiveGame({game}: Props) {
    const dateTime = new Date(game.game_date);
  return (
    <div className="w-full text-center mb-3">
        <h3 className="text-2xl font-bold py-3">Active Game</h3>
        <Link href={`/game/${game.game_id}`}>
            <div className="text-blue-900 w-full md:w-[600px] mx-auto flex justify-around p-3 border border-blue-900 rounded-xl">
                <div>{(game.game_date).toString()}</div>
                <div>{game.location}</div>
            </div>
        </Link>
    </div>
  )
}