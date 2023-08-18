"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import format from "date-fns/format";

import TopUpModal from "@/components/modals/top-up-modal";
import { Button } from "@/components/ui/button";

interface IGameResponseData {
    gameParticipants: {
        buy_in_amount: Number
        cash_out_amount: Number
        game_id: Number
        participant_id: Number
        player_id: Number
        top_ups: {
            amount: Number
            timestamp: Date
        }[]
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

interface IPlayerDataModel {
    playerName: string;
    playerId: Number;
    participantId: Number;
}

export default function GamePage() {
    const params = useParams();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [gameData, setGameData] = useState<IGameResponseData>();
    const [selectedPlayer, setSelectedPlayer] = useState<IPlayerDataModel>({
        playerName: "",
        playerId: 0,
        participantId: 0,
    })

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
    const handleTopupModal = (playerData: IPlayerDataModel) => {
        setSelectedPlayer(playerData);
        setOpen(true);
    }
    const calculateResult = () => {

    }
    return (
        <div className="grid grid-cols-4 gap-4">
            {gameData && 
                gameData.gameParticipants.map((item, index) => (
                    <div key={index} className="border rounded-md border-cyan-800 flex flex-col justify-between p-3">
                        <div>
                            <div className="font-bold text-xl text-center">{item.player.full_name}</div>
                            <div>Buy In: <span className="text-lg font-bold mx-1 pl-1">{(item.buy_in_amount).toString()}</span></div>
                                <div>
                                    Top up: 
                                    {item.top_ups.length > 0 ? (
                                        <div className="inline">
                                            {item.top_ups.map((topup) => (
                                                <span className="top-up-val font-bold text-lg mx-1 pl-1"> {(topup.amount).toString()}</span>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="inline font-bold text-lg mx-1">0</div>
                                    )}
                                </div>
                        </div>
                        <div>
                            <div className="p-6 text-center font-bold text-3xl">
                                {item.cash_out_amount ? ("cashed out") : ("-") }
                            </div>
                            <div className="flex w-full gap-4">
                                <Button variant="ghost" className="">Cash Out</Button>
                                <Button variant="default" className="grow" onClick={() => handleTopupModal({
                                    playerName: item.player.full_name,
                                    playerId: item.player_id,
                                    participantId: item.participant_id
                                })}>Top Up</Button>
                            </div>
                        </div>
                    </div>
                ))
            }
            <TopUpModal
                isOpen={open}
                onClose={() => {setOpen(false)}}
                onConfirm={() => null}
                loading={loading}
                playerName={selectedPlayer.playerName}
                playerId={selectedPlayer.playerId}
                participantId={selectedPlayer.participantId}
            />
        </div>
    )
}