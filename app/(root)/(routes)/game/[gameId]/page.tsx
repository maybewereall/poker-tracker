"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import CashOutModal from "@/components/modals/cash-out-modal";
import BuyInModal from "@/components/modals/buy-in-modal";
import { Button } from "@/components/ui/button";
import { IPlayerDataModel, PlayerCard } from "@/components/ui/player-card";

import useGameData from "@/hooks/use-game-data";

import { Modal } from "@/components/ui/modal";
import NewPlayerForm from "@/components/forms/new-player";
import AddPlayerForm from "@/components/forms/add-player";
import AddRakeForm from "@/components/forms/add-rake";

export default function GamePage() {
    const params = useParams();
    const [openCashOut, setOpenCashOut] = useState(false);
    const [openTopUp, setOpenTopUp] = useState(false);
    const [openAddPlayerModal, setOpenAddPlayerModal] = useState(false);
    const [openFinishGame, setOpenFinishGame] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [loading, setLoading] = useState(false);
    const [openNewPlayerModal, setOpenNewPlayerModal] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState<IPlayerDataModel>({
        playerName: "",
        playerId: 0,
        participantId: 0,
    });

    let gameId = params.gameId as string;
    
    const router = useRouter();
    const { gameData, allCashedOut, error } = useGameData(gameId, refreshKey);

    if(gameData && !gameData.active) {
        router.push(`/game/${gameId}/results`);
    }


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

    const handleAddPlayerSubmit = async (data: { playerId: string }) => {
        try {
            setLoading(true);
            const response = await axios.post(`/api/game/${gameId}/add-player`, data);
            setOpenAddPlayerModal(false);
            setLoading(false);
            setRefreshKey(oldKey => oldKey + 1);
        } catch (error: any) {
            toast.error("Something went wrong");
            console.log(error);
        }
    }
    const handleNewPlayerSubmit = async (data: {full_name: string, email: string}) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/players', {
                ...data
            });
            toast.success("Player added");
            setLoading(false);
        } catch (error) {
            toast.error("Something went wrong.")
            setLoading(false);
        } finally {
        }
    }

    const handleBuyInSubmit = async (data: { participant_id: number, amount: string, timestamp: number }) => {
        setLoading(true);
        try {
            const response = await axios.post(`/api/game/${params.gameId}/buy-in/${selectedPlayer.playerId}`, { ...data });
            handleCloseModal('buyIn');
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong.")
        }
        setLoading(false);
    }
    const handleCashOutSubmit = async (data: { participant_id: number, amount: string }) => {
        setLoading(true);
        try {
            const response = await axios.patch(`/api/game/${params.gameId}/cash-out`, { ...data });
            toast.success("Player cashed out!");
            handleCloseModal('cashOut');
        } catch (error: any) {
            console.log(error);
            toast.error("Something went wrong.")
        }
        setLoading(false);
    }

    const handleFinishGame = async (data: { rake: number }) => {
        const results = gameData?.gameParticipants.map(player => ({
            playerId: player.player_id,
            participantId: player.participant_id,
            cashOutAmount: player.cash_out_amount,
            buyIns: player.buy_in.reduce((total, buyIn) => total + Number(buyIn.amount), 0),
            net_profit: player.cash_out_amount - player.buy_in.reduce((total, buyIn) => total + Number(buyIn.amount), 0)
        }));
        console.log(results);
        try {
            setLoading(true);
            await axios.post(`/api/game/${gameId}/complete`, {
                rake: data.rake,
                results: results
            });
            toast.success("Game completed");
            router.push(`/game/${gameId}/results`);
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
            setLoading(false);
        }
    };

    return (

        <div>
            <div className="flex justify-between w-auto mt-4 text-right mr-auto">
                <div><Button onClick={() => setOpenFinishGame(true)} disabled={!allCashedOut}>Finish Game</Button></div>
                <div><Button onClick={() => setOpenAddPlayerModal(true)}><Plus width={20} height={20} className="mr-1" />Add Player</Button></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {gameData &&
                    gameData.gameParticipants.filter(player => player.cash_out_amount < 0).map((player) =>
                        <PlayerCard key={player.participant_id} item={player} handleModal={handleModal} />
                    )
                }
            </div>
            <hr className="my-8" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {gameData &&
                    gameData.gameParticipants.filter(player => player.cash_out_amount >= 0).map((player) =>
                        <PlayerCard key={player.participant_id} item={player} handleModal={handleModal} cashedOut />
                    )
                }
            </div>

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

            <Modal title="Create Player" description="Add new player to the club" isOpen={openNewPlayerModal} onClose={() => setOpenNewPlayerModal(false)}>
                <NewPlayerForm
                    onSubmit={handleNewPlayerSubmit}
                    onCancel={() => setOpenNewPlayerModal(false)}
                    loading={loading}
                />
            </Modal>

            <Modal title="Add Player" description="Add player to the game" isOpen={openAddPlayerModal} onClose={() => setOpenAddPlayerModal(false)}>
                <AddPlayerForm
                    onSubmit={handleAddPlayerSubmit}
                    onCancel={() => setOpenAddPlayerModal(false)}
                    loading={loading}
                    participants={gameData ? gameData.gameParticipants.map(participant => participant.player_id) : []}
                />
            </Modal>
            <Modal title="Add Rake" description="Final rake total" isOpen={openFinishGame} onClose={() => setOpenFinishGame(false)}>
                <AddRakeForm
                    onSubmit={handleFinishGame}
                    onCancel={() => setOpenFinishGame(false)}
                    loading={loading}
                />
            </Modal>
        </div>
    )
}