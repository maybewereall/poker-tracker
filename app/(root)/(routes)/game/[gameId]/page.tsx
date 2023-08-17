"use client";

import { useEffect } from "react";
import NewGameForm from "../../components/new-game-form";

import { useParams } from "next/navigation";

export default function GamePage() {
    
    useEffect(() => {
        async function fetchPlayers() {
            try {
                const response = await fetch(`/api/players`);
                const data = await response.json();
                console.log({data})
            } catch (error) {
                console.log(error);        
            }
        }
        fetchPlayers();
        // console.log({players})
    }, []);
    // const formattedPlayers = players.map((item) => ({
    //     player_id: (item.player_id).toString(),
    //     full_name: item.full_name
    // }));
    return (
        <div></div>
        // <NewGameForm players={formattedPlayers}/>
    )
}