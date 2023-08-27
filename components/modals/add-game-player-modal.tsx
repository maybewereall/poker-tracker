"use client";

import { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Players } from "@prisma/client";

import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { Plus } from "lucide-react";

interface IAddGamePlayerProps {
  isOpen: boolean;
  onClose: () => void;
  participants?: number[];
  gameId: string;
}

const formSchema = z.object({
  playerId: z.string().refine((val) => !Number.isNaN(parseInt(val))),
});

const AddGamePlayerModal: React.FunctionComponent<IAddGamePlayerProps> = ({
  isOpen,
  onClose,
  participants = [],
  gameId
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [players, setPlayers] = useState<Players[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const handleModalSubmit = async (data: { playerId: string }) => {
    try {
        const response = await axios.post(`/api/game/${gameId}/add-player`, data);
        onClose();
    } catch (error: any) {
        console.log(error);
    }
}
  useEffect(() => {
    setIsMounted(true);
    const getPlayers = async () => {
      const response = await axios.get(`/api/players`);
      setPlayers(response.data);
    }
    getPlayers();
  }, []);

  if (!isMounted) return null;

  return (
    <Modal
      title="Add Player"
      description="Add player to game"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
		<form onSubmit={form.handleSubmit(handleModalSubmit)}>
		<FormField
		  name="playerId"
		  control={form.control}
		  render={({ field }) => (
			<FormItem {...field}>
			  <FormLabel>Select player</FormLabel>
			  <FormControl>
				<Select value={field.value} onValueChange={field.onChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            { participants &&
              players.filter((player) => {
                return participants.indexOf(player.player_id) < 0
              }).map((item) => {
              return (
                <SelectItem key={item.player_id} value={String(item.player_id)}>{item.full_name}</SelectItem>
              )
             })
            }
            <SelectItem value="add-custom"><Plus width={14} height={14} className="inline mr-2" />Add New...</SelectItem>
          </SelectContent>
        </Select>
			  </FormControl>
			  <FormMessage />
			</FormItem>
		  )}
		/>
		<div className="flex justify-between mt-4">
			<Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
			<Button variant="default" type="submit">Confirm</Button>
		</div>
	  </form>
	  </Form>
    </Modal>
  );
};

export default AddGamePlayerModal;
