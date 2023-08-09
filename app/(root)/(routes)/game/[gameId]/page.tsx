"use client";

import { useParams } from "next/navigation";

export default function GamePage() {
    const params = useParams();
    return (
        <div>GamePage: {params.gameId}</div>
    )
}