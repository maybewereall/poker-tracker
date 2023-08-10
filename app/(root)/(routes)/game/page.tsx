import prismadb from "@/lib/prismadb";
import NewGameForm from "./components/new-game-form";

export default async function NewGamePage({ gameId }) {

    const players = await prismadb.player.findMany();
    const formattedPlayers = players.map((item) => ({
        id: item.id,
        label: item.name
    }));
    return (
        <NewGameForm players={formattedPlayers}/>
    )
}