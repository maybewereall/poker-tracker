import { useEffect, useState } from "react";

type IGameResponseData = {
    gameParticipants: {
        cash_out_amount: number
        game_id: number
        participant_id: number
        player_id: number
        buy_in: {
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

const useFetchGameData = (gameId: string, refreshData: boolean): { gameData: IGameResponseData | undefined, error: Error | null } => {
    const [gameData, setGameData] = useState<IGameResponseData>();
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await fetch(`/api/game/${gameId}`);
                const data = await response.json();
                setGameData(data);
            } catch (error: any) {
                setError(error);
            }
        }
        fetchPlayers();
    }, [gameId, refreshData]);

    return { gameData, error };
}

export default useFetchGameData;