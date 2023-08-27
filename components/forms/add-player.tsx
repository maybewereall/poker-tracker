"use client";

import * as z from "zod"
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
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
import { Players } from "@prisma/client";

interface IAddPlayerFormProps {
    onSubmit: (data: { playerId: string }) => void;
    onCancel: () => void;
    loading: boolean;
    participants: number[];
}

const formSchema = z.object({
    playerId: z.string().refine((val) => !Number.isNaN(parseInt(val))),
});

const AddPlayerForm: React.FC<IAddPlayerFormProps> = ({ onSubmit, onCancel, loading, participants }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [players, setPlayers] = useState<Players[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    });

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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                                        {participants &&
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
                    <Button type="button" disabled={loading} variant={"outline"} onClick={onCancel}>Cancel</Button>
                    <Button type="submit" disabled={loading}>Add</Button>
                </div>
            </form>
        </Form>
    )
}

export default AddPlayerForm;