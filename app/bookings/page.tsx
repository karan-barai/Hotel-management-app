import React from 'react'
import { columns } from './columns';
import prisma from '@/prisma/db';
import { BookingDataTable } from '@/components/ui/booking-data-table';
import { format } from 'date-fns';

// async function BookingDetails(): Promise<unknown> {
//     const data = await prisma?.bookings.findMany({
//         orderBy: {
//             Booking_date: 'desc', // Sort by Check_in date in descending order
//           },
//         include: {
//             guests: {
//             }
//         }
//     }
    
//     );
//     return data ; 
    
// }

export default async function page() {  
    
    const data = await prisma.bookings.findMany({
        
        include: {
            guests: {
            }
        },
        orderBy: {
            Booking_id: 'desc', // Sort by Check_in date in descending order
          },
    }
    
    );
    
    return (
        <div>
            <BookingDataTable 
                columns={columns} 
                data={(data as unknown as Array<any>).map((booking) => ({
                    ...booking,
                    Name:booking.guests?.First_name + ' ' + booking.guests?.Last_name,
                    Check_in: booking.Check_in ? format(new Date(booking.Check_in),"dd/MM/yy") : '',
                    Check_out: booking.check_out ? format(new Date(booking.check_out),"dd/MM/yy") : '',
                    Booking_date: booking.Booking_date ? format(new Date(booking.Booking_date),"dd/MM/yy") : '',
                    Date_of_advance: booking.Date_of_advance ? format(new Date(booking.Date_of_advance),"dd/MM/yy") : '',
                    Due_date: booking.Due_date ? format(new Date(booking.Due_date),"dd/MM/yy") : '',
                    Total_amount: booking.Total_amount?.toString() ?? '',
                    Advance_received: booking.Advance_received?.toString() ?? '',
                    Balance_due: booking.Balance_due?.toString() ?? '',
                }))}

            />
        </div>
    )
}
