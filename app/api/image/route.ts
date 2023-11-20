import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
    auth:process.env.REPLICATE_API_TOKEN!
});


export async function POST(
    req:Request
){
    try{
        const {userId}=auth();
        const body = await req.json();
        const { prompt,amount=1,resolution="512" }=body;
        const amountAsInt = parseInt(amount, 10);
        if(!userId){
            return new NextResponse("Unauthorized",{status:401});

        }
        if(!prompt)
        {
            return new NextResponse("Prompt are required", {status:400});
        }
         if(!amount)
        {
            return new NextResponse("Amount are required", {status:400});
        }
         if(!resolution)
        {
            return new NextResponse("Resolution are required", {status:400});
        }

        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();
        if(!freeTrial && !isPro){
            return new NextResponse("Free trial has expired.", {status:403});
        }
        if(!freeTrial){
            return new NextResponse("Free trial has expired.", {status:403});
        }
        await increaseApiLimit();

         const response = await replicate.run(
            "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
            {
                input: {
              
                prompt: prompt,
                num_outputs: amountAsInt,
              
                }
            }
            );
        if(!isPro){
            await increaseApiLimit();
        }


        return NextResponse.json(response);


    }catch(error){
        console.log("[IMAGE_ERROR]",error);
        return new NextResponse("Internal error",{status:500});
    }
}