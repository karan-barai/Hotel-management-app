import React from 'react'
import { columns } from './columns';

import { BookingDataTable } from '@/components/ui/booking-data-table';

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
    
    const data = await prisma?.bookings.findMany({
        
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
                    Check_in: booking.Check_in ? new Date(booking.Check_in).toLocaleDateString() : '',
                    Check_out: booking.check_out ? new Date(booking.check_out).toLocaleDateString() : '',
                    Booking_date: booking.Booking_date ? new Date(booking.Booking_date).toLocaleDateString() : '',
                    Date_of_advance: booking.Date_of_advance ? new Date(booking.Date_of_advance).toLocaleDateString() : '',
                    Due_date: booking.Due_date ? new Date(booking.Due_date).toLocaleDateString() : '',
                    Total_amount: booking.Total_amount?.toString() ?? '',
                    Advance_received: booking.Advance_received?.toString() ?? '',
                    Balance_due: booking.Balance_due?.toString() ?? '',
                }))}

            />
        </div>
    )
}
