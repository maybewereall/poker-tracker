"use client";

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { NewGameModal } from "@/components/modals/new-game-modal";
import { Players } from "@prisma/client";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [playerList, setPlayerList] = useState<Players[]>();
  const [open, setOpen] = useState(false);

  const handleClick = async () => {
    setLoading(true)
    try {
      const response = await axios.post("/api/game");
      router.push(`/game/${response.data.game_id}`);
      setLoading(false)
    } catch (error) {
      toast.error('something went wrong');
      setLoading(false)
    }
  }
  useEffect(() => {
    async function fetchPlayers() {
        try {
            const response = await fetch(`/api/players`);
            const data = await response.json();
            setPlayerList(data);
        } catch (error) {
            console.log(error);        
        }
    }
    fetchPlayers();
    // console.log({players})
}, []);

  return (
      <>
      <NewGameModal
          isOpen={open}
          onClose={() => {setOpen(false)}}
          onConfirm={() => null}
          players={playerList}
      />
      <Button onClick={() => setOpen(true)} disabled={loading}>Start New Game</Button>
      </>
  )
}
