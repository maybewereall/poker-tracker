"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

import format from "date-fns/format";

import { cn } from "@/lib/utils";

import useGameData from "@/hooks/use-game-data";

import TopUpModal from "@/components/modals/top-up-modal";
import CashOutModal from "@/components/modals/cash-out-modal";
import { Button } from "@/components/ui/button";

interface IPlayerDataModel {
    playerName: string;
    playerId: number;
    participantId: number;
}

export default function GamePage() {
    const params = useParams();
    const [openCashOut, setOpenCashOut] = useState(false);
    const [openTopUp, setOpenTopUp] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [selectedPlayer, setSelectedPlayer] = useState<IPlayerDataModel>({
        playerName: "",
        playerId: 0,
        participantId: 0,
    });
    
    let gameId = params.gameId as string;
    
    const { gameData, loading, error } = useGameData(gameId, refreshKey);
    
    
    const handleTopUpModal = (playerData: IPlayerDataModel) => {
        setSelectedPlayer(playerData);
        setOpenTopUp(true);
    }

    const handleCashOutModal = (playerData: IPlayerDataModel) => {
        setSelectedPlayer(playerData);
        setOpenCashOut(true);
    }

    const handleCloseTopUpModal = () => {
        console.log("close top up");
        setOpenTopUp(false);
        setRefreshKey(oldKey => oldKey + 1);
    }

    const handleCloseCashOutModal = () => {
        console.log("close cash out");
        setOpenCashOut(false);
        setRefreshKey(oldKey => oldKey + 1);
    }

    const handleTopUpSubmit = async (data: { participant_id: number, amount: string, timestamp: number }) => {
        console.log("handleTopupSubmit")
        try {
          const response = await axios.patch(`/api/game/${params.gameId}/top-up/${selectedPlayer.playerId}`, {...data});
          console.log("topped up", response);
          toast.success("Topped up!");
          handleCloseTopUpModal();
        } catch(error) {
          console.log(error);
          toast.error("Something went wrong.")
        }
      }
    return (
        <div className="grid grid-cols-4 gap-4 mt-4">
            {gameData && 
                gameData.gameParticipants.map((item) => (
                    <div key={item.player_id} className={cn("border rounded-md border-cyan-800 flex flex-col justify-between p-3", item.cash_out_amount > 0 && "player-cashed-out")}>
                        <div>
                            <div className="font-bold text-xl text-center">{item.player.full_name}</div>
                            <div>Buy In: <span className="text-lg font-bold mx-1 pl-1">{(item.buy_in_amount).toString()}</span></div>
                            <div>
                                Top up: 
                                {item.top_ups.length > 0 ? (
                                    <div className="inline">
                                        {item.top_ups.map((topup) => (
                                            <span key={(topup.timestamp).toString()} className="top-up-val font-bold text-lg mx-1 pl-1"> {(topup.amount).toString()}</span>
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
                onClose={handleCloseTopUpModal}
                onSubmit={handleTopUpSubmit}
                loading={loading}
                playerName={selectedPlayer.playerName}
                participantId={selectedPlayer.participantId}
            />
            <CashOutModal
                isOpen={openCashOut}
                onClose={() => handleCloseCashOutModal}
                onConfirm={() => null}
                loading={loading}
                playerName={selectedPlayer.playerName}
                playerId={selectedPlayer.playerId}
                participantId={selectedPlayer.participantId}
            />
        </div>
    )
}