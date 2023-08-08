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
    rake: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)))
});

interface IAddRakeFormProps {
    onSubmit: (data: { rake: number }) => Promise<void>;
    onCancel: () => void;
    loading: boolean;
}

const AddRakeForm: React.FC<IAddRakeFormProps> = ({ onSubmit, onCancel, loading }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rake: "0",
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => onSubmit({...data, rake: Number(data.rake)}))}>
                <FormField
                    name="rake"
                    control={form.control}
                    render={({field}) => (
                        <FormItem className="mb-4">
                            <FormLabel>Total Rake</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    disabled={loading}
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
    );
}

export default AddRakeForm