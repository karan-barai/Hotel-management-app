import { NextResponse } from "next/server";
import prisma from '@/prisma/db';
export async function POST(req:Request) {
    try {
const body = await req.json();
let { Guest_id,Booking_id } =  body

const guest = await prisma.guests.findMany({
  where: {
    Guest_id:Guest_id
  },
  select:{
    Address:true,
    City:true,
    country:true,
    Email:true,
    Phone:true,
    state:true,
    Emergency_contact:true,
    Emergency_contact_person:true,
    First_name:true,
    Last_name:true
  }
})

const room = await prisma.booking_details.findMany({
    where: {
        Booking_id:Booking_id
    },
    select:{
            Room_id:true,
    } 
})
return NextResponse.json(guest);

    } catch (error) {
        console.log('Error at /app/api/bookingPopober POST ',error);
        new NextResponse('Internel Server error',{status: 500})
    }
 
}