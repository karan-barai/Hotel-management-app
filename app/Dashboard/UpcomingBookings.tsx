import React from 'react'
import prisma from '@/prisma/db';
export default async function UpcomingBookings() {
    const latestBookings = await prisma.bookings.findMany({
        select:{
          Check_in: true,
          check_out: true,
      Booking_details:{
        select:{
          Room_id:true
        }
      },
      
      guests:{
        select:{
          First_name:true,
          Last_name:true,
          
        }
      },
        },
        // where:{
        //   Check_in: {
        //     gte: new Date() // Check_in date should be greater than or equal to the current date
        // }
        // },
        orderBy: {
         Check_in : 'desc' // Sort by Booking_date in descending order
        },
        take: 5
      })
      

  return (
    <div>
      <div className=" shadow-md rounded-lg overflow-hidden">
  <div className="p-4  ">
    <p className="text-md font-medium ">Upcoming Bookings</p>
  </div>
  <div className="overflow-x-auto px-4">
    <table className="min-w-full divide-">
      <thead >
        <tr>
        <th scope="col" className="px-1 py-1 text-left text-xs font-medium uppercase tracking-wider">
            Guest Name
          </th>
          <th scope="col" className="px-1 py-1 text-left text-xs font-medium uppercase tracking-wider">
            Check-in Date
          </th>
          <th scope="col" className="px-1 py-1 text-left text-xs font-medium uppercase tracking-wider">
            Check-out Date
          </th>
        </tr>
      </thead>
      <tbody className="divide-y ">
        {latestBookings?.map((booking, index) => (
          <tr key={index}>
            <td className="px-1 py-1 whitespace-nowrap">{booking.guests.First_name} {booking.guests.Last_name}</td>
            <td className="px-1 py-1 whitespace-nowrap">{booking.Check_in.toLocaleDateString()}</td>
            <td className="px-1 py-1 whitespace-nowrap">{booking.check_out.toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
    </div>
  )
}
