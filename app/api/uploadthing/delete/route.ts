import { auth } from "@clerk/nextjs";
import next from "next";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi

export async function POST(req: Request){
    const {userId} = auth()
    
    if(!userId) return new NextResponse('Unauthorized',{status: 401})
    
    const {imagekey} = await req.json()
    try {
        const res = await utapi.deleteFiles(imagekey)
        return NextResponse.json(res)
    } catch (error) {
        console.log('error at uploadthing/delete: ',error);
        return NextResponse.json('Internal server error',{status: 500})
    }
}