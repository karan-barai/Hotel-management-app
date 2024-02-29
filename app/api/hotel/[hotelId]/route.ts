import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from '@/prisma/db';
export async function PATCH(req:Request, 
    {params}:{params: {hotelId:string}}
    ) {
    try {

        if(!params.hotelId) {
            return new NextResponse('Hotel Id is required', {status: 400})
        };

        const body = await req.json();
        const {userId} =  auth();

if(!userId) return new NextResponse('Unauthorized',{status: 401});

        const Hotel = await prisma.hotels.update({
            where : {
                Hotel_id: params.hotelId,
            },
            data:{
                ...body,
            }
       
        })
        return NextResponse.json(Hotel);
    } catch (error) {
        console.log('Error at /api/hotel PATCH:',error);
        return new NextResponse('Internal server error ',{status :500})
    }
}

export async function DELETE(req:Request, 
    {params}:{params: {hotelId:string}}
    ) {
    try {

        if(!params.hotelId) {
            return new NextResponse('Hotel Id is required', {status: 400})
        };

        const {userId} =  auth();

if(!userId) return new NextResponse('Unauthorized',{status: 401});

        const Hotel = await prisma.hotels.delete({
            where : {
                Hotel_id: params.hotelId,
            }
            
        })
        return NextResponse.json(Hotel);
    } catch (error) {
        console.log('Error at /api/hotel DELETE: ',error);
        return new NextResponse('Internal server error ',{status :500})
    }
}