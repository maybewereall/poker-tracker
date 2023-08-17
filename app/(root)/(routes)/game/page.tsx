import prismadb from "@/lib/prismadb";
// import NewGameForm from "./[gameId]/components/new-game-form";

export default async function NewGamePage() {

    const players = await prismadb.players.findMany();
    const formattedPlayers = players.map((item) => ({
        player_id: (item.player_id).toString(),
        full_name: item.full_name
    }));
    return (
        <div></div>
        // <NewGameForm players={formattedPlayers}/>
    )
}

// List of games