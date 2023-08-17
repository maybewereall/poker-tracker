"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Players } from "@prisma/client";

interface NewGameFormProps {
    players: {
        player_id: string;
        full_name: string;
    }[];
}

const FormSchema = z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
})

type NewGameFormValues = z.infer<typeof FormSchema>;


export const NewGameForm: React.FC<NewGameFormProps> = ({ players }) => {
    const onSubmit = () => {
        console.log
    }
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          items: [],
        },
    })
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="items"
                    render={() => (
                        <FormItem>
                            <div className="mb-4">
                                <FormLabel className="text-base">Add Players</FormLabel>
                                <FormDescription>
                                    Add players to the game
                                </FormDescription>
                            </div>
                            <div className="grid grid-cols-10 space-x-1 max-h-[150px]">
                            {players.map((item) => (
                                <FormField
                                    key={item.player_id}
                                    control={form.control}
                                    name="items"
                                    render={({ field }) => {
                                        return (
                                            <FormItem
                                                key={item.player_id}
                                                className="flex flex-row items-start space-x-3 space-y-0"
                                            >
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(item.player_id)}
                                                        onCheckedChange={(checked) => {
                                                            return checked
                                                                ? field.onChange([...field.value, item.player_id])
                                                                : field.onChange(
                                                                    field.value?.filter(
                                                                        (value) => value !== item.player_id
                                                                    )
                                                                )
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {item.full_name}
                                                </FormLabel>
                                            </FormItem>
                                        )
                                    }}
                                />
                            ))}
                            </div>
                            {/* <FormMessage /> */}
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}

export default NewGameForm;