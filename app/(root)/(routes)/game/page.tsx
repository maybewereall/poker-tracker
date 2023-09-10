import format from "date-fns/format";

import { GameColumn } from './components/columns';
import GameClient from './components/client';

import prismadb from "@/lib/prismadb";


export default async function GamesPage() {

    const games = await prismadb.gameStatistics.findMany({
        include: {
            game: true,
        },
        orderBy: {
            game: {
                game_date: "desc"
            }
        }
    });
    const formattedGames = games.map((item) => ({
        id: item.game_id,
        date: format(item.game.game_date, "dd/LL/yy"),
        buy_ins: item.buy_ins,
        cash_outs: item.cash_outs,
        rake: item.rake,
        result: item.result,
        active: item.game.active
    }));
    console.log(formattedGames);
    return (
        <div className="flex-col w-full max-w-[1200px] mx-auto">
            <div className="flex-1 space-y-4 pt-6">
                <GameClient data={formattedGames}/>
            </div>
        </div>
    )
}
