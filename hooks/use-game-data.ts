import { useState, useEffect } from 'react';
import axios from 'axios';

export interface IGameResponseData {
    gameParticipants: IGameParticipantData[]
    game_date: string
    game_id: number
    location: string;
}

export interface IGameParticipantData {
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
}

function useGameData(gameId: string, refreshKey: number) {
  const [gameData, setGameData] = useState<IGameResponseData>();
  const [allCashedOut, setAllCashedOut] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/api/game/${gameId}`)
      .then(response => {
        setGameData(response.data);
        setAllCashedOut(response.data.gameParticipants.every((player: IGameParticipantData) => player.cash_out_amount >= 0));
      })
      .catch(error => {
        setError(error);
      });
  }, [gameId, refreshKey]);

  return { gameData, allCashedOut, error };
}

export default useGameData;