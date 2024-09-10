'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { z } from 'zod'
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-hot-toast"
import axios from 'axios'
import { Players } from '@prisma/client'


import { Modal } from "@/components/ui/modal"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import LoadingIcon from "@/components/ui/loading-icon"

const formSchema = z.object({
    selected_player_id: z.string(),
    loggedIn_email: z.string().email()
})

export default function OnboardingComponent() {
    const { user } = useUser()
    const [isMounted, setIsMounted] = useState(false)
    const [open, setOpen] = useState(true)
    const [players, setPlayers] = useState<Players[]>([])
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            selected_player_id: "",
            loggedIn_email: user?.emailAddresses[0].emailAddress || "",
        }
    });

    const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
        console.log("onSubmit function called", data);
        setLoading(true)
        console.log("submit")
        try {
            const response = await axios.patch('/api/players/onboarding', data)
            console.log("Request successful", response.data);
            toast.success("Player Onboarded")
            setOpen(false)
        } catch (error) {
            console.error('Onboarding failed:', error)
            toast.error("Something went wrong.")
        }
        setLoading(false)
    }

    useEffect(() => {
        setIsMounted(true)
        const getPlayers = async () => {
            try {
                const response = await axios.get('/api/players')
                setPlayers(response.data)
            } catch (error) {
                console.error('Failed to fetch players:', error)
                toast.error("Failed to load players")
            }
        }
        getPlayers()
    }, []);

    useEffect(() => {
        if (user?.emailAddresses[0].emailAddress) {
            form.setValue('loggedIn_email', user.emailAddresses[0].emailAddress);
        }
    }, [user, form]);

    if (!isMounted) return null;

    console.log("Form values:", form.getValues());
    console.log("Form errors:", form.formState.errors);

    return (
        <Modal
            isOpen={open}
            title="Link Account"
            description="Select your name to link your google login to this player"
            onClose={() => setOpen(false)}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div>Logged in as: {form.getValues().loggedIn_email}</div>
                    <FormField
                        name="selected_player_id"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Select your account</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select..." />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-[200px]">
                                            {players.map((item) => (
                                                <SelectItem key={item.player_id} value={String(item.player_id)}>{item.full_name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Input 
                        type="hidden" 
                        {...form.register("loggedIn_email")} 
                        value={form.watch('loggedIn_email')}
                    />
                    <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                        <Button type="submit" disabled={loading}>
                            {loading ? <LoadingIcon /> : "Continue"}
                        </Button>
                    </div>
                </form>
            </Form>
        </Modal>
    )
}