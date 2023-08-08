"use client";
import React from 'react';
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";

import { usePlayerModal } from "@/hooks/use-player-modal";

export default function PlayerPage() {
  const playerModal = usePlayerModal();
  return (
    <Container>
        <Button onClick={() => playerModal.onOpen()}><Plus size={16}/>Add new</Button>
    </Container>
  )
}
