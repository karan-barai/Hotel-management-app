import AddBooking from '@/components/bookings/addBooking';
import AddBookingDetails from '@/components/bookings/addBookingDetails';
import React from 'react'
import prisma from '@/prisma/db';
export default async function page() {
  
    
      // Find the booking with the highest booking_id
      const latestBooking = await prisma.bookings.findFirst({
        orderBy: { Booking_id: 'desc' },
        select: { Booking_id: true },
      });

      // Extract the booking ID and remove the prefix (optional)
      let bookingId = latestBooking?.Booking_id || 'HB00000';
      bookingId = bookingId.replace('HB', '');

      // Convert the ID to a number and increment by 1
      const newId = parseInt(bookingId, 10) + 1;

      // Format the new ID with the prefix and leading zeros
      const formattedId = `HB${newId.toString().padStart(5, '0')}`;
      
      // Create a new booking with the incremented ID (replace with your actual creation logic)
      // await tx.booking.create({ data: { booking_id: formattedId } });
     
    
      
        
            // const guestId = await prisma?.guests.findMany({
            //   where:{
            //     First_name:guestName
            //   },
            //   select:{
            //     Guest_id:true,
            //   }
            // })
           

            return (
              <div> 
                <AddBookingDetails latestBookingId={formattedId}  /> 
              </div>
            )
}
