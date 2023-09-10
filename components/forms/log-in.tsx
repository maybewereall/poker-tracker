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
import Link from "next/link";


interface ILoginFormProps {
    onSubmit: (data: { email: string; password: string; }) => void;
    loading: boolean;
}

const formSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

const LoginForm: React.FC<ILoginFormProps> = ({
    loading,
    onSubmit
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });
    

    return (
        <Form {...form}  >
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[450px] border-muted-foreground border p-6 rounded-lg">
                Login with your registered email
                <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
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
                        <FormItem>
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
                <div className="text-center mt-3">
                    <Button className="w-full">Login</Button>
                </div>
                <hr className="w-full my-4" />
                <div>Or continue with google</div>
                <div><p className="text-center">Or <Link href="/auth/sign-up" className="text-blue-800">Register</Link></p></div>
            </form>
        </Form>
    )
}

export default LoginForm;