"use client";
import axios from "axios";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import toast from "react-hot-toast";

interface SubscriptionButtonProps {
    isPro:boolean
}
export const SubscriptionButton = ({
    isPro=false
}:SubscriptionButtonProps)=>{
    const [loading,setLoading]= useState(false);

    const onClick= async() => {
        try {
            const response = await axios.get("/api/stripe");

            window.location.href= response.data.url;
        } catch (error) {
             toast.error("Something went wrong");
        }finally{
            setLoading(false);
        }
    }
    return(
        <Button variant={isPro ? "default" : "premium"} onClick={onClick}>
            {isPro ? "Manage Subscription" : "Upgrade" }
            {!isPro && <Zap className="w-4 h-4 ml-2 fill-white"/>}
        </Button>
    )
}