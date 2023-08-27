"use client";

import * as z from "zod"
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
    FormMessage
} from "@/components/ui/form";

const formSchema = z.object({
    full_name: z.string().min(1),
    email: z.string().min(5).email()
});

interface INewPlayerFormProps {
    onSubmit: () => void;
    onCancel: () => void;
    loading: boolean;
}

const NewPlayerForm: React.FC<INewPlayerFormProps> = ({ onSubmit, onCancel, loading }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            full_name: "",
            email: ""
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    name="full_name"
                    control={form.control}
                    render={({field}) => (
                        <FormItem className="mb-4">
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
                <FormField
                    name="email"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={loading}
                                    type="email"
                                    placeholder="Email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="pt-6 space-x-2 flex items-center justify-between w-full">
                    <Button type="button" disabled={loading} variant={"outline"} onClick={onCancel}>Cancel</Button>
                    <Button type="submit" disabled={loading}>Add</Button>
                </div>
            </form>
        </Form>
    )
}

export default NewPlayerForm;