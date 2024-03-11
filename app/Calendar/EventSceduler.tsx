import { CardContent } from '@/components/ui/Card'
import BitScheduler from '@/components/ui/schedular';
import {  SchedulerProjectData } from '@bitnoi.se/react-scheduler';
import React from 'react'
import prisma from '@/prisma/db';
 

// const mockedSchedulerData: SchedulerData = [
//   {
//     id: "070ac5b5-8369-4cd2-8ba2-0a209130cc60", //Room id from Rooms Table
//     label: {
//       icon: "https://picsum.photos/24",
//       title: "Room 1",                          // Room id same as above
//       subtitle: "Frontend Developer"            // Room type from room Table
//     },
//     data: [
//       {
//         id: "8b71a8a5-33dd-4fc8-9caa-b4a584ba3762", 
//         startDate: new Date("2024-03-10T15:31:24.272Z"), // check in 
//         endDate: new Date("2024-03-11T10:28:22.649Z"), // check out
//         occupancy: 3600,
//         title: "Project A", // guest name
//         subtitle: "Subtitle A", //booking id
//         description: "array indexing Salad West Account", //special request
//         bgColor: "rgb(254,165,177)"
//       },
         
//     ]
//   }
// ];

export default async function EventSceduler() {



  
  const rooms = await prisma.rooms.findMany({
    select: {
      Room_id: true,
      Room_type: true
    }
  });
  const bookings = await prisma.booking_details.findMany({
    select: {
      Booking_details_id: true,
      Booking_id: true,
      Room_id: true,
      Bookings: {
        select: {
          Booking_id: true,
          Guest_id: true,
          Check_in: true,
          check_out: true,
          guests:{
            select:{
              First_name: true,
              Last_name: true,
              Email: true,
              Phone: true,
              Address: true,
            }
          }
        }
      }
    }
  });
  const roomsData = rooms.map((room, index) => {
    const roomBookings = bookings
      .filter(booking => booking.Room_id === room.Room_id)
      .map((booking, idx) => {
        const fullName = `${booking.Bookings.guests.First_name} ${booking.Bookings.guests.Last_name}`;
        return {
          id: `${room.Room_id}_${idx + 1}`,
          startDate: booking.Bookings.Check_in.toISOString(),
          endDate: booking.Bookings.check_out.toISOString(),
          occupancy: 3600,
          title: fullName,
          subtitle: booking.Booking_id,
          description: "",
          bgColor: getRoomBgColor(room.Room_type) // Function to get bgColor based on room type
        };
      });
      
    return {
      id: room.Room_id,
      label: {
        icon: "https://picsum.photos/24",
        title: room.Room_id,
        subtitle: room.Room_type
      },
      data: roomBookings
    };
  });
  
  // Function to determine background color based on room type
  function getRoomBgColor(roomType: string) {
    switch (roomType) {
      case 'Deluxe':
        return 'rgb(254,165,177)';
      case 'Family':
        return 'rgb(177,254,165)';
        case 'Suite':
          return 'rgb(165,177,254)';
      // Add more cases for other room types if needed
      default:
        return 'rgb(254,165,177)'; // Default color
    }
  }
  
  
  
 
  return (
    <div>
        <section className="relative w-full h-[600px]">
        <CardContent>
        <p className=" -4 font-semib01d">Booking Overview</p>
       <BitScheduler schedulerData={roomsData} />
        </CardContent>
      </section>
    </div>
  )
}
