export default LoginPage;
import { useApi } from "@/_api/client2";
import { useState } from "react";
import { ErrorResult } from "@/_api/apiTypes";
import { Toaster } from "@/components/ui/sonner"
import { LoginInfo } from "@/_api/api";
import { navigate } from 'vike/client/router'
import { processErrorRespose } from "@/_api/apiUtils";
import ThemeSelector from "@/ui/atoms/ThemeSelector";
import { toast } from "sonner"
import LoginHero from "@/components/hero/login";
import { LoginNavbar } from "@/ui/landing/HomePage";

function LoginPage() {
    const api = useApi();
    const [error, setError] = useState<ErrorResult>(null)
    const [isFetching, setIsFetching] = useState(false)

    const onSubmit = async (data: any) => {
        setIsFetching(true)
        const loginData: LoginInfo = {
            ...data
        }
        try {
            await api.loginCreate(loginData)
            toast.success("Logged in as " + data.username)
            setTimeout(() => {
                setIsFetching(false)
            }, 200)
            navigate("/chat")
        } catch (e) {
            console.log("ERROR: ", e)
            const processedError = await processErrorRespose(e)
            setError(processedError)
            toast.error("Error: " + JSON.stringify(processedError))
            setIsFetching(false)
        }
    };

    return <div className="h-screen w-screen flex flex-col">
        <LoginNavbar />
        <Toaster />
        <LoginHero
            title="Msgmate.io Open Chat Interface"
            description="Please login to continue"
            isFetching={isFetching}
            onSubmit={onSubmit}
            error={error}
        />
    </div>
}