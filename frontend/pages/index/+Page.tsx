import React from "react";
import LoginHero from "@/components/hero/login";
import { toast } from "sonner"
import { useApi } from "../api/client";
import { ErrorResult } from "@/api/apiTypes";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner"
import { LoginInfo } from "@/api/api";
import ThemeSelector from "@/ui/atoms/ThemeSelector";


export { Page };

function Page() {
  const api = useApi();
  const [error, setError] = useState<ErrorResult>(null)
  const [isFetching, setIsFetching] = useState(false)

  const onSubmit = async (data: any) => {
    setIsFetching(true)
    const loginData: LoginInfo = {
      ...data
    }
    try {
      const res = await api.loginCreate(loginData)
      toast.success("Logged in as " + data.email)
      setTimeout(() => {
        setIsFetching(false)
      }, 600)
    } catch (e) {
      console.log("ERROR: ", e)
      /**const processedError = await processErrorRespose(e)
      setError(processedError)
      toast.error("Error: " + JSON.stringify(processedError))
      setIsFetching(false)**/
    }
  };

  return <div>
    <Toaster />
    <div className="absolute top-0 right-0 p-4">
      <ThemeSelector />
    </div>
    <LoginHero
      title="Welcome to Little World Matching Pannel V3!"
      description="Please login to continue"
      isFetching={isFetching}
      onSubmit={onSubmit}
      error={error}
    />
  </div>
    ;
}
