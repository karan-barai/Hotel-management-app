import { CardContent } from '@/components/ui/Card';
import ChartResponsive from '@/components/ui/ChartResponsive'
import React from 'react'

export default async function RoomOccupancy() {
  
        const bookings = await prisma?.bookings.findMany({
            select: {
                Check_in: true,
                check_out: true,
                Rooms_booked: true,
                Total_amount: true,
            },
        });
    
        const dailyDataMap = new Map();

        bookings?.forEach(booking => {
            const checkInDate = new Date(booking.Check_in);
            const checkOutDate = new Date(booking.check_out);
            const totalAmount = Number(booking.Total_amount); // Convert to number
        
            const currentDate = new Date(checkInDate);
        
            while (currentDate < checkOutDate) {
                const day = currentDate.getDate().toString().padStart(2, '0');
                const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
                const dateString = `${day}/${month}`;
                
                const existingData = dailyDataMap.get(dateString);
                const occupancy = booking.Rooms_booked + (existingData ? existingData.occupancy : 0);
                const total = totalAmount + (existingData ? existingData.totalAmount : 0);
                dailyDataMap.set(dateString, { occupancy, totalAmount: total });
                currentDate.setDate(currentDate.getDate() + 1);
            }
        });
        
        const dailyDataArray = Array.from(dailyDataMap.entries()).map(([date, data]) => ({
            date,
            Occupancy: data.occupancy,
            TotalRevenue: data.totalAmount
        }));
       
        


  return (
    <div>
      <CardContent>
      <p className=" -4 font-semib01d">Room Occupancy</p>
      <ChartResponsive data={dailyDataArray}/>
      </CardContent>
     
    </div>
  )
}
