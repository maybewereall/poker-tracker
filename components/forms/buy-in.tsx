"use client";

import { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";

interface IBuyInFormProps {
    onSubmit: (data: {
        participant_id: number,
        amount: string,
        timestamp: string
    }) => void;
    onCancel: () => void;
    loading: boolean;
    participantId: number;
}


const formSchema = z.object({
    amount: z.string().refine((val) => !Number.isNaN(parseInt(val, 10))),
    participant_id: z.number(),
    timestamp: z.string()
});

const BuyInForm: React.FC<IBuyInFormProps> = ({
    onSubmit,
    onCancel,
    loading,
    participantId
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          amount: "300",
          participant_id: participantId,
          timestamp: new Date().toString()
        },
    });
    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    name="amount"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Top up</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={loading}
                                    type="text"
                                    placeholder="Top up amount"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="participant_id"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Top up</FormLabel>
                            <FormControl>
                                <Input
                                    type="hidden"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="timestamp"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    type="hidden"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-between mt-4">
                    <Button variant="outline" type="button" disabled={loading} onClick={onCancel}>Cancel</Button>
                    <Button variant="default" type="submit" disabled={loading}>Confirm</Button>
                </div>
            </form>
        </Form>
    )
}

export default BuyInForm;