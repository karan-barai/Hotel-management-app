import React from 'react'
import prisma from '@/prisma/db';
import { DataTable } from '@/components/ui/data-table';
import { Guest, columns } from "./columns"
import { format } from 'date-fns';

export const dynamic = 'force-dynamic'

async function Guest_details(): Promise<Guest[]>{

const data = await prisma.guests.findMany({
  
  include:{
    Bookings:{
      orderBy: {
        Check_in: 'desc', // Sort by Check_in date in descending order
      },
      take: 1, // Take only the first result
      select:{
        Room_type:true,
        Check_in:true,
        Special_request:true,
         }
    }
  }
});

return data as Guest[];
}
export default async function page() {

  const data = await Guest_details()

  return (
    <div className='container py-10 mx-auto'>
      <DataTable
        columns={columns}
        data={data.map((guest) => ({
          ...guest,
          Name: guest.First_name + ' ' + guest.Last_name,
          Room_type: guest?.Bookings[0]?.Room_type,
          Special_request: guest?.Bookings[0]?.Special_request,
          Check_in: guest?.Bookings[0]?.Check_in ? format( new Date(guest.Bookings[0].Check_in), "dd/MM/yy") : '',
        }))}
      /> 
      
      </div>
  )
}


