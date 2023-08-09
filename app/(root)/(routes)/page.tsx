"use client";

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true)
    try {
      const response = await axios.post("/api/game");
      router.push(`/game/${response.data.id}`);
      setLoading(false)
    } catch (error) {
      toast.error('something went wrong');
      setLoading(false)
    }
  }
  return (
      <Button onClick={handleClick} disabled={loading}>Start New Game</Button>
  )
}
