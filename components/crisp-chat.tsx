"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat =()=>{
        useEffect(()=>{
            Crisp.configure("15481b3a-847b-4630-a95e-ce7fbe0f9a77");
        },[]);
        return null;
    }