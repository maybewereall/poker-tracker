"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";

import { IGameParticipantData } from "@/hooks/use-game-data";
import { cn } from "@/lib/utils";
import { BuyIn } from "@prisma/client";
import { Modal } from "./modal";
import EditBuyInForm from "../forms/edit-buy-in";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";

export interface IPlayerDataModel {
    playerName: string;
    playerId: number;
    participantId: number;
}

interface PlayerCardProps {
    item: IGameParticipantData;
    cashedOut?: boolean;
    handleModal: (playerData: IPlayerDataModel, modalType: 'buyIn' | 'cashOut' | 'editBuyIn', isOpen: boolean) => void;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ item, handleModal, cashedOut }) => {

    const [openEditBuyIn, setOpenEditBuyIn] = useState(false);
    const [currentBuyIn, setCurrentBuyIn] = useState<BuyIn>(item.buy_in[0]);
    const params = useParams();

    const calculateBuyIn = (arr: {
        amount: number
        timestamp: Date
    }[]) => {
        const val = arr.reduce((acc, obj) => {
            return acc + Number(obj.amount)
        }, 0);
        return val;
    }
    const handleEditBuyInModal = (buyin: BuyIn) => {
        setCurrentBuyIn(buyin);
        setOpenEditBuyIn(true)
    }
    
    const handleEditBuyInSubmit = async (data: { amount: string, id: number }) => {
        try {
            const response = await axios.patch(`/api/game/${params.gameId}/buy-in/${data.id}`, { ...data });
            toast.success("Buy in updated")
            setOpenEditBuyIn(false);
        } catch (error) {
            toast.error("Something went wrong.");
        }
    }

    const totalBuyIn = calculateBuyIn(item.buy_in);
    const cashOut = item.cash_out_amount !== -1 ? item.cash_out_amount : 0
    const finalResult = cashOut - totalBuyIn;

    return (
        <div className={cn("border rounded-md border-cyan-800 flex flex-col justify-between p-3 relative", cashedOut && "bg-gray-100" )}>
            <div className="absolute flex px-2 pt-2 gap-2 right-0 top-0">
                <Trash className="w-4  h-4 cursor-pointer text-red-200" onClick={console.log} />
            </div>
            <div className="font-bold text-xl text-center">{item.player.full_name}</div>
            {cashedOut ? (
                <div>
                    <div>Buy In: <span className="font-bold">{totalBuyIn}</span></div>
                    <div>Cash Out: <span className="font-bold">{cashOut}</span></div>
                    <div className={cn("text-center font-bold text-3xl", finalResult < 0 ? "text-red-600" : "text-green-600")}>{finalResult}</div>
                </div>
            ) : (
            <div>
                <div><span className="pr-1">Buy In: </span>
                    {item.buy_in.length > 0 ? (
                        <>
                            {item.buy_in.map((buyIn) => (
                                <span 
                                    key={(buyIn.timestamp).toString()} 
                                    className="top-up-val font-bold text-lg cursor-pointer"
                                    onClick={() => handleEditBuyInModal(buyIn)}
                                > 
                                    {(buyIn.amount).toString()}
                                </span>
                            ))}
                        </>
                    ) : (
                        <span className="top-up-val font-bold text-lg">0</span>
                    )}    
                </div>
                <div>
                    <span className="pr-1">Cash Out:</span>
                    <span className="top-up-val font-bold text-lg">0</span>
                </div>
            </div>

            )}
            <div className="mt-4">
                {!cashedOut && (<div className="flex w-full gap-4">
                    <Button variant="outline" className="" onClick={() => handleModal(
                        {
                            playerName: item.player.full_name,
                            playerId: item.player_id,
                            participantId: item.participant_id
                        },
                        'cashOut',
                        true
                    )}>Cash Out</Button>
                    <Button variant="default" className="grow" onClick={() => handleModal(
                        {
                            playerName: item.player.full_name,
                            playerId: item.player_id,
                            participantId: item.participant_id
                        },
                        'buyIn',
                        true
                    )}>Buy In</Button>
                </div>)}
            </div>
            <Modal title={`Edit Buy In for ${item.player.full_name}`} description="" isOpen={openEditBuyIn} onClose={() => setOpenEditBuyIn(false)}>
                <EditBuyInForm
                    onSubmit={handleEditBuyInSubmit}
                    onCancel={() => setOpenEditBuyIn(false)}
                    loading={false}
                    buyIn={currentBuyIn}
                />
            </Modal>
        </div>
    );
}