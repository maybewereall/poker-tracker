"use client";

import axios from 'axios'
import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import { Players, BuyIn } from '@prisma/client';

import GameClient from './components/client';
import TransactionsModal from '@/components/modals/transactions-modal';
import { Modal } from "@/components/ui/modal";

import { useLoading } from '@/hooks/use-loading';

import { TransactionType } from '@/types/types';
import { Button } from '@/components/ui/button';


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
    const { loading, setLoading } = useLoading();
    const [playerResultData, setPlayerResultData] = useState<IPlayerResultsData[]>();
    const [gameResultData, setGameResultData] = useState<IGameResultData>();
    const [openTransactions, setOpenTransactions] = useState(false);
    const [transactionData, setTransactionData] = useState<TransactionType[]>();
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/api/game/${params.gameId}/results`);
            setPlayerResultData(response.data.playerStats);
            setGameResultData(response.data.gameStats);
            const transactions = await axios.get(`/api/game/${params.gameId}/transactions`);
            setTransactionData(transactions.data);
        }
        fetchData();
    }, [])
    const formattedPlayerResults = playerResultData && playerResultData.map((item) => ({
        player: item.player.full_name,
        buy_in: item.buy_in.reduce((total, buyIn) => Number(total) + Number(buyIn.amount), 0),
        cash_out: item.cash_out_amount,
        result: item.cash_out_amount - item.buy_in.reduce((total, buyIn) => Number(total) + Number(buyIn.amount), 0),
    }));
    const handleCloseModal = () => {
        setOpenTransactions(false);
    }
    const handleOpenTransactions = () => {
        setOpenTransactions(true);
    }
    return (
        <div className="flex-col w-full max-w-[1200px] mx-auto">
            <div><Button onClick={handleOpenTransactions}>View Transactions</Button></div>
            <div className="flex-1 space-y-4 py-6">
                {(formattedPlayerResults && gameResultData) && <GameClient playerData={formattedPlayerResults} gameData={gameResultData} />}
            </div>
            <Modal title="Transactions" description="" isOpen={openTransactions} onClose={handleCloseModal}>
                <TransactionsModal loading={loading} transactionData={transactionData} />
            </Modal>
        </div>
    )
}
