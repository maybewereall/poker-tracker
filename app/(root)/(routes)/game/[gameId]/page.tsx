"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import CashOutModal from "@/components/modals/cash-out-modal";
import BuyInModal from "@/components/modals/buy-in-modal";
import { IPlayerDataModel, PlayerCard } from "@/components/ui/player-card";

import useGameData from "@/hooks/use-game-data";

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
    
    
    const handleModal = (playerData: IPlayerDataModel, modalType: 'buyIn' | 'cashOut', isOpen: boolean) => {
        setSelectedPlayer(playerData);
        if (modalType === 'buyIn') {
            setOpenTopUp(isOpen);
        } else if (modalType === 'cashOut') {
            setOpenCashOut(isOpen);
        }
    }
    
    const handleCloseModal = (modalType: 'buyIn' | 'cashOut') => {
        if (modalType === 'buyIn') {
            setOpenTopUp(false);
        } else if (modalType === 'cashOut') {
            setOpenCashOut(false);
        }
        setRefreshKey(oldKey => oldKey + 1);
    }

    const handleBuyInSubmit = async (data: { participant_id: number, amount: string, timestamp: number }) => {
        try {
          const response = await axios.post(`/api/game/${params.gameId}/buy-in/${selectedPlayer.playerId}`, {...data});
          handleCloseModal('buyIn');
        } catch(error) {
          console.log(error);
          toast.error("Something went wrong.")
        }
    }
    const handleCashOutSubmit = async (data: { participant_id: number, amount: string }) => {
        try {
            const response = await axios.patch(`/api/game/${params.gameId}/cash-out`, {...data});
            toast.success("Player cashed out!");
            handleCloseModal('cashOut');
        } catch(error: any) {
            console.log(error);
            toast.error("Something went wrong.")
        }
    }
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {gameData && 
                    gameData.gameParticipants.filter(player => player.cash_out_amount === 0).map((player) => 
                        <PlayerCard key={player.participant_id} item={player} handleModal={handleModal} />
                    )
                }
                <BuyInModal
                    isOpen={openTopUp}
                    onClose={() => handleCloseModal('buyIn')}
                    onSubmit={handleBuyInSubmit}
                    loading={loading}
                    playerName={selectedPlayer.playerName}
                    participantId={selectedPlayer.participantId}
                />
                <CashOutModal
                    isOpen={openCashOut}
                    onClose={() => handleCloseModal('cashOut')}
                    onSubmit={handleCashOutSubmit}
                    loading={loading}
                    playerName={selectedPlayer.playerName}
                    participantId={selectedPlayer.participantId}
                />
            </div>
            <hr className="my-8" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {gameData && 
                    gameData.gameParticipants.filter(player => player.cash_out_amount !== 0).map((player) => 
                        <PlayerCard key={player.participant_id} item={player} handleModal={handleModal} cashedOut />
                    )
                }
            </div>
        </div>
    )
}