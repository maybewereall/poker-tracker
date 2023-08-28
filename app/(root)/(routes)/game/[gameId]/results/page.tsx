"use client";

import axios from 'axios'
import { useState } from 'react';
import { useParams } from "next/navigation";

import GameClient from './components/client';
import { useEffect } from 'react';

export default function GameResultPage() {
    const params = useParams();
    const [gameResultData, setGameResultData] = useState();
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/api/game/${params.gameId}/results`);
            setGameResultData(response.data);
        }
        fetchData();
    }, [])
    const formattedGamesResults = gameResultData && gameResultData.map((item) => ({
        player: item.player.full_name,
        buy_in: item.buy_in.reduce((total, buyIn) => total + Number(buyIn.amount), 0),
        cash_out: item.cash_out_amount,
        result: item.cash_out_amount - item.buy_in.reduce((total, buyIn) => total + Number(buyIn.amount), 0),
    }));
    console.log(formattedGamesResults);
    return (
        <div className="flex-col w-full max-w-[800px] mx-auto">
            <div className="flex-1 space-y-4 p-8 pt-6">
                {/* <GameClient data={formattedGamesResults}/> */}
            </div>
        </div>
    )
}
