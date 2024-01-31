import axios from 'axios';
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useEffect } from 'react';
import { usePlayerModal } from '@/hooks/use-player-modal';
import { useLoading } from '@/hooks/use-loading';
import { Modal } from "@/components/ui/modal";
import { Button } from '@/components/ui/button';
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem
} from "@/components/ui/select"

import { Players } from '@prisma/client';

interface PlayerSelectionModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const formSchema = z.object({
    player: z.string().min(1)
})

const PlayerSelectionModal: React.FC<PlayerSelectionModalProps> = ({
	isOpen,
	onClose
}) => {
	const { loading, setLoading } = useLoading();

	const [players, setPlayers] = useState<Players[]>([]);
	const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            player: ""
        },
    });
	
	const onSubmit = ({player}: {player: string}) => {
		axios.post('/api/players/claim', { player })
			.then(response => {
				// Store the player information in the user's session
				// Close the modal
				onClose();
			})
			.catch(error => console.error(error));
	};

	useEffect(() => {
		if (isOpen) {
			setLoading(true);
			axios.get('/api/players/unclaimed')
				.then(response => setPlayers(response.data))
				.catch(error => console.error(error));
			setLoading(false);
		}
	}, [isOpen]);

	return (
		<Modal title="Select your Player" description="Select your player from the dropdown below to link your login details" isOpen={isOpen} onClose={() => null}>
			{/* {players.map(player => (
				<div key={player.player_id} onClick={() => handlePlayerSelect(player.player_id)}>
					{player.full_name}
				</div>
			))} */}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					name="player"
					control={form.control}
					render={({ field }) => (
						<FormItem {...field}>
							<FormControl >
								<Select value={field.value} onValueChange={field.onChange} disabled={loading}>
									<SelectTrigger className="w-full">
										<SelectValue className="mt-0" placeholder="300" />
									</SelectTrigger>
									<SelectContent className="max-h-[200px]">
									{players.map(player => (
										<SelectItem value={(player.player_id).toString()}>{player.full_name}</SelectItem>
									))}
									</SelectContent>
								</Select>
							</FormControl>
						</FormItem>
					)}
				/>
				<div className="flex justify-end mt-4">
                    <Button type="submit" disabled={form.formState.isValid}>Link</Button>
                </div>
			</form>
		</Form>
    </Modal >
  );
}

export default PlayerSelectionModal