

// api/bookings/checkRoomAvailability.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export async function  POST(req: NextRequest) {
    const body = await req.json()
    const { Check_in, Check_out } = body;
    // console.log({hello:"hrllo"})
    console.log({Check_in,Check_out})
    try {
        const allBookingIds = await prisma?.bookings.findMany({
          where: {
            AND: [
              { Check_in: { lte: Check_out } }, // Check-in is less than or equal to check-out
              { check_out: { gte: Check_in } },  // Check-out is greater than or equal to check-in
            ],
          },
          select: { Booking_id: true }, // Only select the booking ID
      });
      console.log({allBookingIds})
        const ids:string[] = [];
      
        allBookingIds?.forEach(bid=> ids.push(bid.Booking_id))
      
        const availableRooms = await prisma?.booking_details.findMany({
          where:{
            NOT:{
      
              Booking_id:{
                in:ids
              }
            }
          },select:{
            Room_id:true
          }
        })
      
        
        return NextResponse.json({availableRooms})
          }catch (error) {
      console.error('Error checking room availability:', error);
      new NextResponse('Internel Server error',{status: 500})

    }
}




