import { EyeOff, EyeIcon } from 'lucide-react';
import { ReloadIcon } from "@radix-ui/react-icons"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import CenterDiv from "@/components/layout/CenterDiv";
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm, FormProvider } from "react-hook-form"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { ErrorResult } from '@/api/apiTypes';

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
})

export default function LoginHero({
    title = "Title",
    description = "Description",
    onSubmit = () => { },
    isFetching = false,
    error = null,
}: {
    title?: string;
    description?: string;
    onSubmit?: (data: any) => void;
    isFetching?: boolean;
    error: ErrorResult;
}) {
    const [showPassword, setShowPassword] = useState(false)
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                form.handleSubmit(onSubmit)();
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, []);


    useEffect(() => {
        if (error) {
            Object.keys(error).forEach((key) => {
                form.setError(key, {
                    type: "server",
                    message: error[key],
                })
            });
        }
    }, [error])

    return (
        <CenterDiv className='h-screen'>
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <FormProvider {...form}>
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>username</FormLabel>
                                    <FormControl>
                                        <Input type="username" placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input type={showPassword ? 'text' : 'password'} placeholder="Password" {...field} />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
                                                {showPassword ? (
                                                    <EyeOff className="h-6 w-6" onClick={togglePasswordVisibility} />
                                                ) : (
                                                    <EyeIcon className="h-6 w-6" onClick={togglePasswordVisibility} />
                                                )}
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {error?.root && <span className="text-red-500">{error?.root}</span>}
                        <Button type="submit" className="w-full mt-4" form="login-form" onClick={form.handleSubmit(onSubmit)} disabled={isFetching}>
                            {isFetching && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                            Login
                        </Button>
                    </FormProvider>
                </CardContent>
                <CardFooter>
                </CardFooter>
            </Card>
        </CenterDiv>
    );
}
