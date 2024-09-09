'use client'

import * as React from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { completeOnboarding } from './_actions'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@radix-ui/react-select'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Players } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'

const formSchema = z.object({
    playerId: z.string().refine((val) => !Number.isNaN(parseInt(val))),
});

export default function OnboardingComponent() {
    const [error, setError] = React.useState('')
    const { user } = useUser()
    const router = useRouter()
    const [isMounted, setIsMounted] = useState(false);
    const [players, setPlayers] = useState<Players[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const formData = new FormData();
        formData.append('playerId', data.playerId);
        const res = await completeOnboarding(formData);
        if (res?.message) {
            // Reloads the user's data from Clerk's API
            await user?.reload()
            router.push('/')
        }
        if (res?.error) {
            setError(res?.error)
        }
    }

    // useEffect(() => {
    //     setIsMounted(true);
    //     const getPlayers = async () => {
    //         try {
    //             const response = await axios.get(`/api/players`);
    //             setPlayers(response.data);
                
    //         } catch (err) {
    //             return { error: 'Cannot get players' }
    //         }
    //     }
    //     getPlayers();
    //     console.log(players);
    // }, []);

    if (!isMounted) return null;
    return (
        <div>
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
                                        <SelectContent className="max-h-[200px]">
                                            {
                                                players.map((item) => {
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
                </form>
            </Form>
        </div>
    )
}