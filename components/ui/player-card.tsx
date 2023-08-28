import { Button } from "@/components/ui/button";

import { IGameParticipantData } from "@/hooks/use-game-data";
import { cn } from "@/lib/utils";

export interface IPlayerDataModel {
    playerName: string;
    playerId: number;
    participantId: number;
}

interface PlayerCardProps {
    item: IGameParticipantData;
    cashedOut?: boolean;
    handleModal: (playerData: IPlayerDataModel, modalType: 'buyIn' | 'cashOut', isOpen: boolean) => void;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ item, handleModal, cashedOut }) => {

    const calculateBuyIn = (arr: {
        amount: number
        timestamp: Date
    }[]) => {
        const val = arr.reduce((acc, obj) => {
            return acc + Number(obj.amount)
        }, 0);
        return val;
    }
    const totalBuyIn = calculateBuyIn(item.buy_in);
    const cashOut = item.cash_out_amount !== -1 ? item.cash_out_amount : 0
    const finalResult = cashOut - totalBuyIn;

    return (
        <div className={cn("border rounded-md border-cyan-800 flex flex-col justify-between p-3", cashedOut && "bg-gray-100" )}>
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
                                <span key={(buyIn.timestamp).toString()} className="top-up-val font-bold text-lg"> {(buyIn.amount).toString()}</span>
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
        </div>
    );
}