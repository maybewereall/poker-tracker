"use client";

import * as z from "zod"
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Players } from "@prisma/client";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
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
import LoadingIcon from "@/components/ui/loading-icon";



interface INewGameFormProps {
    onSubmit: (values: z.infer<typeof formSchema>) => void;
    onCancel: () => void;
    loading: boolean;
    players: Players[];
}

export const formSchema = z.object({
    initial_buyin: z.string().refine((val) => !Number.isNaN(parseInt(val, 10))),
    date: z.date(),
    players: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one player.",
    }),
})


const NewGameForm: React.FC<INewGameFormProps> = ({
    onSubmit,
    onCancel,
    loading,
    players
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            initial_buyin: "300",
            date: new Date,
            players: []
        },
    });



    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col mb-2">
                            <FormLabel>Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                            disabled={loading}
                                        >
                                            {field.value ? (
                                                format(field.value, "do LLL yyyy")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
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
                                <Select value={field.value} onValueChange={field.onChange} disabled={loading}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue className="mt-0" placeholder="300" />
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
                                {players.map((item) => (
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
                                                            disabled={loading}
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
                        </FormItem>
                    )}
                />
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                    <Button variant="outline" onClick={onCancel} disabled={loading}>Cancel</Button>
                    <Button variant="default" disabled={loading}>{loading ? <LoadingIcon /> : "Continue"}</Button>
                </div>
            </form>
        </Form>
    )
}

export default NewGameForm;