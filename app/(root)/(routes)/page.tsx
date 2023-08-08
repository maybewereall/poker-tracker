"use client";
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Modal } from "@/components/ui/modal";
import { Players } from "@prisma/client";
import NewGameForm from "@/components/forms/create-game";
import { formSchema } from "@/components/forms/create-game";

export default function Home() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [playerList, setPlayerList] = useState<Players[]>();
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
		async function fetchPlayers() {
			try {
				setLoading(true);
				const response = await axios.get(`/api/players`);
				setPlayerList(response.data);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		}
		fetchPlayers();
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
			<div className="flex w-full h-full justify-center items-center">
				<Button onClick={() => setOpen(true)} disabled={loading}>{loading ? "Loading..." : "Start New Game"}</Button>
			</div>
		</>
	)
}
