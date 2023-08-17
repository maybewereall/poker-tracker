"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface IGameResponseData {
    gameParticipants: {
        buy_in_amount: Number
        cash_out_amount: Number
        game_id: Number
        participant_id: Number
        player_id: 4
        player: { 
            player_id: Number
            full_name: string
            email: string
            date_joined: string
        }
    }[]
    game_date: string
    game_id: Number
    location: string
}

export default function GamePage() {
    const params = useParams();
    const [gameData, setGameData] = useState<IGameResponseData>();
    useEffect(() => {
        async function fetchPlayers() {
            try {
                const response = await fetch(`/api/game/${params.gameId}`);
                const data = await response.json();
                setGameData(data);
                console.log(data);
            } catch (error) {
                console.log(error);        
            }
        }
        fetchPlayers();
    }, []);

    return (
        <div className="grid grid-cols-4 gap-4">
            {gameData && 
                gameData.gameParticipants.map((item, index) => (
                    <div key={index} className="border rounded-md border-cyan-800 p-3">
                        <div className="font-bold text-xl text-center">{item.player.full_name}</div>
                        <div>Total Buy In: {(item.buy_in_amount).toString()}</div>
                        <div className="flex w-full gap-4">
                            <Button variant="ghost" className="">Cash Out</Button>
                            <Button variant="default" className="grow">Top Up</Button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}