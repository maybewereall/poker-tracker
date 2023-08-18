"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import format from "date-fns/format";

import { cn } from "@/lib/utils";

import TopUpModal from "@/components/modals/top-up-modal";
import CashOutModal from "@/components/modals/cash-out-modal";
import { Button } from "@/components/ui/button";

interface IGameResponseData {
    gameParticipants: {
        buy_in_amount: number
        cash_out_amount: number
        game_id: number
        participant_id: number
        player_id: number
        top_ups: {
            amount: number
            timestamp: Date
        }[]
        player: { 
            player_id: number
            full_name: string
            email: string
            date_joined: string
        }
    }[]
    game_date: string
    game_id: number
    location: string
}

interface IPlayerDataModel {
    playerName: string;
    playerId: number;
    participantId: number;
}

export default function GamePage() {
    const params = useParams();
    const [openCashOut, setOpenCashOut] = useState(false);
    const [openTopUp, setOpenTopUp] = useState(false);
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
    const handleTopUpModal = (playerData: IPlayerDataModel) => {
        setSelectedPlayer(playerData);
        setOpenTopUp(true);
    }
    const handleCashOutModal = (playerData: IPlayerDataModel) => {
        setSelectedPlayer(playerData);
        setOpenCashOut(true);
    }
    return (
        <div className="grid grid-cols-4 gap-4">
            {gameData && 
                gameData.gameParticipants.map((item, index) => (
                    <div key={index} className={cn("border rounded-md border-cyan-800 flex flex-col justify-between p-3", item.cash_out_amount > 0 && "player-cashed-out")}>
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
                                <Button variant="ghost" className="" onClick={() => handleCashOutModal({
                                    playerName: item.player.full_name,
                                    playerId: item.player_id,
                                    participantId: item.participant_id
                                })}>Cash Out</Button>
                                <Button variant="default" className="grow" onClick={() => handleTopUpModal({
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
                isOpen={openTopUp}
                onClose={() => {setOpenTopUp(false)}}
                onConfirm={() => null}
                loading={loading}
                playerName={selectedPlayer.playerName}
                playerId={selectedPlayer.playerId}
                participantId={selectedPlayer.participantId}
            />
            <CashOutModal
                isOpen={openCashOut}
                onClose={() => {setOpenCashOut(false)}}
                onConfirm={() => null}
                loading={loading}
                playerName={selectedPlayer.playerName}
                playerId={selectedPlayer.playerId}
                participantId={selectedPlayer.participantId}
            />
        </div>
    )
}