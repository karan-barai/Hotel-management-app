import BarChart from '@/components/bookings/Barchart'
import { CardContent } from '@/components/ui/Card'
import React from 'react'
import prisma from '@/prisma/db';
export default async function RoomsTypeBarchart() {

    const roomTypes = await prisma.room_types.findMany();
    const bookingData = await prisma.bookings.findMany({
      select:{
        Booking_date:true,
        Rooms_booked:true,
        Room_type:true
      },
       
      
    })
    
    const hashMap = new Map();
  
    // bookingData?.forEach((booking)=>{
    //   let bookingChartObj:any = {name:booking.Booking_date ? new Date(booking.Booking_date).toLocaleDateString() : ''}
  
    //   roomTypes?.forEach(roomType=>{
    //     bookingChartObj[roomType.Room_type] = 0;
    //   })
  
    //   if(hashMap.has(booking.Booking_date ? new Date(booking.Booking_date).toLocaleDateString() : '')){
    //     bookingChartObj = hashMap.get(booking.Booking_date ? new Date(booking.Booking_date).toLocaleDateString() : '')
    //   }
    //   bookingChartObj[booking.Room_type] += booking.Rooms_booked;
    //   hashMap.set(booking.Booking_date ? new Date(booking.Booking_date).toLocaleDateString() : '',bookingChartObj)
    // })
    // const hashMap = new Map();
  
    
    bookingData?.forEach((booking) => {
      // Get the date from the booking object
      const bookingDate = booking.Booking_date ? new Date(booking.Booking_date) : null;
  
      // Create the name property with "dd/MM" format
      const name = bookingDate ? `${String(bookingDate.getDate()).padStart(2, '0')}/${String(bookingDate.getMonth() + 1).padStart(2, '0')}` : '';
  
      let bookingChartObj: any = { name: name };
  
      // Initialize room types
      roomTypes?.forEach(roomType => {
          bookingChartObj[roomType.Room_type] = 0;
      });
  
      // If the hashMap already has this booking date, retrieve the existing object
      if (hashMap.has(name)) {
          bookingChartObj = hashMap.get(name);
      }
  
      // Update the room booking count for the given room type
      bookingChartObj[booking.Room_type] += booking.Rooms_booked;
  
      // Store the updated bookingChartObj in the hashMap with the booking date as the key
      hashMap.set(name, bookingChartObj);
  });

  return (
    <div>
      <section className="grid grid-cols-l gap-4 transition-all lg:grid-cols-1">
        <CardContent>
        <p className=" -4 font-semib01d">Booking Overview</p>
        <BarChart data={hashMap.values()}/>
        </CardContent>
      </section>
    </div>
  )
}
