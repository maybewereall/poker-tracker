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
import { BuyIn } from "@prisma/client";

interface IEditBuyInFormProps {
    onSubmit: (data: {
        amount: string,
        id: number
    }) => void;
    onCancel: () => void;
    loading: boolean;
}

const formSchema = z.object({
    amount: z.string(),
    id: z.number()
});

const EditBuyInForm: React.FC<IEditBuyInFormProps> = ({
    onSubmit,
    onCancel,
    loading,
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          amount: "300",
        },
    });
    return(
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    name="amount"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Edit Buy In</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={loading}
                                    type="text"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="id"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    disabled={loading}
                                    type="hidden"
                                    placeholder="Top up amount"
                                    {...field}
                                />
                            </FormControl>
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

export default EditBuyInForm;