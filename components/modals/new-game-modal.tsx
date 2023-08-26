"use client";

import * as z from "zod"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Players } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormDescription
} from "@/components/ui/form";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select"
import { toast } from "react-hot-toast";

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox";

interface INewGameModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    players: Players[] | undefined
}

const formSchema = z.object({
    initial_buyin: z.string(),
    date: z.date(),
    players: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one player.",
    }),
})
export const NewGameModal: React.FC<INewGameModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    players
}) => {
    const [isMounted, setIsMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState<Date | undefined>(new Date);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            initial_buyin: "300",
            date: new Date,
            players: []
        },
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const selectedPlayerData = players?.filter((player) => values.players.includes((player.player_id).toString()));
        try {
            setLoading(true);
            const response = await axios.post('/api/game', {
                date: values.date,
                initial_buyin: values.initial_buyin,
                players: selectedPlayerData?.map((player) => ({
                    player_id: player.player_id,
                    full_name: player.full_name,
                    email: player.email,
                })),
            });
            toast.success("Game created. Redirecting...");
            router.push(`/game/${response.data.game_id}`)

        } catch (error) {
            toast.error("Something went wrong.")
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            title="Create Game"
            description=""
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className=" py-2 pb-4">
                <Form {...form}>

                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            name="date"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block h-[17px]">Date</FormLabel>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !date && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {date ? format(date, "do LLL yy") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={setDate}
                                                    initialFocus
                                                    {...field}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="initial_buyin"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem {...field}>
                                    <FormLabel>Initial Buy In</FormLabel>
                                    <FormControl >
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue  className="mt-0" placeholder="300" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="200">200</SelectItem>
                                                <SelectItem value="300">300</SelectItem>
                                                <SelectItem value="400">400</SelectItem>
                                                <SelectItem value="500">500</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="players"
                            render={() => (
                                <FormItem>
                                    <div className="text-center my-4">
                                        <FormLabel className="text-base">Add Players</FormLabel>
                                    </div>
                                    <div className="grid grid-cols-3 md:grid-cols-4 gap-y-3">
                                        {players?.map((item) => (
                                            <FormField
                                                key={item.player_id}
                                                control={form.control}
                                                name="players"
                                                
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem
                                                            key={item.player_id}
                                                            className="flex flex-row items-end space-x-3 space-y-0"
                                                            
                                                        >
                                                            <FormControl className="mb-1">
                                                                <Checkbox
                                                                    checked={field.value?.includes((item.player_id).toString())}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked
                                                                            ? field.onChange([...field.value, (item.player_id).toString()])
                                                                            : field.onChange(
                                                                                field.value?.filter(
                                                                                    (value) => value !== (item.player_id).toString()
                                                                                )
                                                                            )
                                                                    }}
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="font-normal  text-xl">
                                                                {item.full_name}
                                                            </FormLabel>
                                                        </FormItem>
                                                    )
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                            <Button disabled={loading} variant="outline" onClick={onClose}>Cancel</Button>
                            <Button disabled={loading} variant="default" onClick={onConfirm}>Continue</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Modal>
    )
}
