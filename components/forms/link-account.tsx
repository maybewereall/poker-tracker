"use client";

import { useEffect, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from 'axios';
import { Players } from "@prisma/client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from "@/components/ui/button";
import LoadingIcon from "@/components/ui/loading-icon";
interface ILinkAccountFormProps {
    loading: boolean;
    loggedInEmail: string;
    onSubmit: (values: z.infer<typeof formSchema>) => void;
}

export const formSchema = z.object({
    selected_player_id: z.string(),
    loggedIn_email: z.string()
})
const LinkAccountForm: React.FC<ILinkAccountFormProps> = ({ loggedInEmail, loading, onSubmit }) => {
    const [players, setPlayers] = useState<Players[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            selected_player_id: "",
            loggedIn_email: loggedInEmail,
        }
    });

    useEffect(() => {
        const getPlayers = async () => {
            try {
                const response = await axios.get(`/api/players`);
                setPlayers(response.data);
                
            } catch (err) {
                return { error: 'Cannot get players' }
            }
        }
        getPlayers();
    }, []);
    
    return (
        <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div>Logged in as: {loggedInEmail}</div>
                    <FormField
                        name="selected_player_id"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem {...field}>
                                <FormLabel>Select your account</FormLabel>
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
                                            {/* <SelectItem value="add-custom"><Plus width={14} height={14} className="inline mr-2" />Add New...</SelectItem> */}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="loggedIn_email"
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
                    <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                        <Button variant="default" disabled={loading}>{loading ? <LoadingIcon /> : "Continue"}</Button>
                    </div>
                </form>
            </Form>
    )
};

export default LinkAccountForm;