"use client";

import axios from 'axios'
import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import { Players, BuyIn } from '@prisma/client';

import GameClient from './components/client';

interface IPlayerResultsData {
    buy_in: BuyIn[]
    cash_out_amount: number
    game_id: number
    participant_id: number
    player: Players
    player_id: number
}

interface IGameResultData {
    game_id: number;
    buy_ins: number;
    cash_outs: number;
    rake: number;
    result: number;
}

export default function GameResultPage() {
    const params = useParams();
    const [playerResultData, setPlayerResultData] = useState<IPlayerResultsData[]>();
    const [gameResultData, setGameResultData] = useState<IGameResultData>();
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/api/game/${params.gameId}/results`);
            setPlayerResultData(response.data.playerStats);
            setGameResultData(response.data.gameStats);
        }
        fetchData();
    }, [])
    const formattedPlayerResults = playerResultData && playerResultData.map((item) => ({
        player: item.player.full_name,
        buy_in: item.buy_in.reduce((total, buyIn) => Number(total) + Number(buyIn.amount), 0),
        cash_out: item.cash_out_amount,
        result: item.cash_out_amount - item.buy_in.reduce((total, buyIn) => Number(total) + Number(buyIn.amount), 0),
    }));
    console.log(gameResultData);
    return (
        <div className="flex-col w-full max-w-[800px] mx-auto">
            <div className="flex-1 space-y-4 p-8 pt-6">
                {(formattedPlayerResults && gameResultData) && <GameClient playerData={formattedPlayerResults} gameData={gameResultData} />}
            </div>
        </div>
    )
}
