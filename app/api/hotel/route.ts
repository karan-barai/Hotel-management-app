import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
const body = await req.json();
const {userId} =  auth();

if(!userId) return new NextResponse('Unauthorized',{status: 401});

const hotel = await prisma?.hotels.create({
    data:{
        ...body,
    },
});
return NextResponse.json(hotel)

    } catch (error) {
        console.log('Error at /app/api/hotel POST ',error);
        new NextResponse('Internel Server error',{status: 500})
    }
}