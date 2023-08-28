"use client";

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
interface ICashOutModalProps {
    onSubmit: (data: {
        amount: string,
    }) => void;
    onCancel: () => void;
    loading: boolean;
    participantId: number;
}
const formSchema = z.object({
    amount: z.string().refine((val) => !Number.isNaN(parseInt(val, 10))),
});
const CashOutForm: React.FC<ICashOutModalProps> = ({
    onSubmit,
    onCancel,
    loading,
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: "0",
        },
    });
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    name="amount"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Final chip count</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={loading}
                                    type="number"
                                    placeholder="Final chip count"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-between mt-4">
                    <Button variant="outline" type="button" onClick={onCancel}>Cancel</Button>
                    <Button variant="destructive" type="submit">Confirm</Button>
                </div>
            </form>
        </Form>
    )
}

export default CashOutForm;