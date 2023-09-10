import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
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


interface IRegisterFormProps {
    onSubmit: (data: { email: string; password: string; }) => void;
    loading: boolean;
}

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Minimum length is 8" }),
    confirmPassword: z.string().min(8, { message: "Minimum length is 8" })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });;

const RegisterForm: React.FC<IRegisterFormProps> = ({
    loading,
    onSubmit
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        },
    });
    

    return (
        <Form {...form}  >
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[450px] border-muted-foreground border p-6 rounded-lg">
                <div className="text-center text-xl font-bold mb-4">Register an account</div>
                <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="mb-5">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={loading}
                                    type="email"
                                    placeholder="email@google.com"
                                    {...field}
                                    
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="mb-3">
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={loading}
                                    type="password"
                                    placeholder="Enter password"
                                    {...field}
                                    
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="confirmPassword"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    disabled={loading}
                                    type="password"
                                    placeholder="Confirm password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="text-center mt-3">
                    <Button className="w-full">Login</Button>
                </div>
                <hr className="w-full my-4" />
                <div>Or continue with google</div>
            </form>
        </Form>
    )
}

export default RegisterForm;