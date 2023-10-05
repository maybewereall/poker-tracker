"use client";
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Modal } from "@/components/ui/modal";
import { Games, Players } from "@prisma/client";
import NewGameForm from "@/components/forms/create-game";
import { formSchema } from "@/components/forms/create-game";
import ActiveGame from "./components/active-game";

export default function Home() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [playerList, setPlayerList] = useState<Players[]>();
	const [activeGame, setActiveGame] = useState<Games>();
	const [open, setOpen] = useState(false);

	const createGame = async (values: z.infer<typeof formSchema>) => {
		const selectedPlayerData = playerList?.filter((player) => values.players.includes((player.player_id).toString()));
		try {
			setLoading(true);
			const response = await axios.post('/api/game', {
				date: values.date,
				initial_buyin: Number(values.initial_buyin),
				players: selectedPlayerData?.map((player) => ({
					player_id: player.player_id,
				})),
			});
			toast.success("Game created. Redirecting...");
			router.push(`/game/${response.data.game_id}`);
			setLoading(false);

		} catch (error) {
			toast.error("Something went wrong.")
			setLoading(false);
		}
	}

	useEffect(() => {
		const loadData = async () => {
			setLoading(true);
			try {
				const [playersResponse, activeGameResponse] = await Promise.all([
					axios.get(`/api/players`),
					axios.get(`/api/game/active`)
				]);
				setPlayerList(playersResponse.data);
				setActiveGame(activeGameResponse.data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		loadData();
	}, []);

	return (
		<>
			<Modal
				isOpen={open}
				onClose={() => { setOpen(false) }}
				title="Start New Game"
				description=""
			>
				{playerList && <NewGameForm onSubmit={createGame} onCancel={() => setOpen(false)} players={playerList} loading={loading} />}
			</Modal>
			<div className="flex flex-col w-full h-full justify-center items-center space-y-16">
				{activeGame ? <ActiveGame game={activeGame} /> : "" }
				<Button onClick={() => setOpen(true)} disabled={loading}>{loading ? "Loading..." : "Start New Game"}</Button>
			</div>
		</>
	)
}
