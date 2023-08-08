"use client";

import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";

import { usePlayerModal } from "@/hooks/use-player-modal";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from "@/components/ui/form";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";
 
const formSchema = z.object({
    name: z.string().min(1),
})
export const PlayerModal = () => {
    const playerModal = usePlayerModal();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/stores', values);
            window.location.assign(`/${response.data.id}`);
        } catch (error) {
            toast.error("Something went wrong.")
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            title="Add Player"
            description="Add a new player to the club"
            isOpen={playerModal.isOpen}
            onClose={playerModal.onClose}
        >
            <div className="space-y-4 py-2 pb-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            name="name"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Full Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="pt-6 space-x-2 flex items-center justify-between w-full">
                            <Button type="button" disabled={loading} variant={"outline"} onClick={playerModal.onClose}>Cancel</Button>
                            <Button type="submit" disabled={loading}>Add</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Modal>
    )
}
