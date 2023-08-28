"use client";

import axios from 'axios'
import { useState } from 'react';
import { useParams } from "next/navigation";
import { Players, BuyIn } from '@prisma/client';
import GameClient from './components/client';
import { useEffect } from 'react';

interface IGameResultsData {
    buy_in: BuyIn[]
    cash_out_amount: number
    game_id: number
    participant_id: number
    player: Players
    player_id: number
}

export default function GameResultPage() {
    const params = useParams();
    const [gameResultData, setGameResultData] = useState<IGameResultsData[]>();
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/api/game/${params.gameId}/results`);
            setGameResultData(response.data);
        }
        fetchData();
    }, [])
    const formattedGamesResults = gameResultData && gameResultData.map((item) => ({
        player: item.player.full_name,
        buy_in: item.buy_in.reduce((total, buyIn) => Number(total) + Number(buyIn.amount), 0),
        cash_out: item.cash_out_amount,
        result: item.cash_out_amount - item.buy_in.reduce((total, buyIn) => Number(total) + Number(buyIn.amount), 0),
    }));
    console.log(formattedGamesResults);
    return (
        <div className="flex-col w-full max-w-[800px] mx-auto">
            <div className="flex-1 space-y-4 p-8 pt-6">
                {formattedGamesResults && <GameClient data={formattedGamesResults} />}
            </div>
        </div>
    )
}
