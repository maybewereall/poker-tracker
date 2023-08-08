"use client";

import { Button } from "@/components/ui/button"
import Container from "@/components/ui/container"

import { usePlayerModal } from "@/hooks/use-player-modal";

export default function Home() {
  const playerModal = usePlayerModal();
  return (
    <Container>
      <Button >Start Game</Button>
    </Container>
  )
}
