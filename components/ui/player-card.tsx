import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { IGameParticipantData } from "@/hooks/use-game-data";

export interface IPlayerDataModel {
    playerName: string;
    playerId: number;
    participantId: number;
}

interface PlayerCardProps {
    item: IGameParticipantData;
    handleModal: (playerData: IPlayerDataModel, modalType: 'topUp' | 'cashOut', isOpen: boolean) => void;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ item, handleModal }) => {
    const isCashedOut = item.cash_out_amount > 0;
    return (
        <div key={item.player_id} className={cn("border rounded-md border-cyan-800 flex flex-col justify-between p-3", isCashedOut && "player-cashed-out")}>
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
                    {item.cash_out_amount ? ("cashed out") : ("-")}
                </div>
                <div className="flex w-full gap-4">
                    <Button variant="ghost" className="" onClick={() => handleModal(
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
                        'topUp',
                        true
                    )}>Top Up</Button>
                </div>
            </div>
        </div>
    );
}