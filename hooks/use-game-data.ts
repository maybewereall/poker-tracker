import { useState, useEffect } from 'react';
import axios from 'axios';

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
    location: string;
}

function useGameData(gameId: string, refreshKey: number) {
  const [gameData, setGameData] = useState<IGameResponseData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/game/${gameId}`)
      .then(response => {
        setGameData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [gameId, refreshKey]);

  return { gameData, loading, error };
}

export default useGameData;