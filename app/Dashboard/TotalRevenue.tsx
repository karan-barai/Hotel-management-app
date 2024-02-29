import React from 'react'
import prisma from '@/prisma/db';
import { IndianRupee, Users } from 'lucide-react';
import Card, { CardProps } from '@/components/ui/Card';

const cardData: CardProps[] = [
    {
      label: "Total Revenue",
      amount: "",
      icon: IndianRupee,
      Class:"bg-green-500"
    },
    {
      label: "Total Bookings",
      amount: "",
      icon: Users,
      Class:"bg-orange-500",
    },
  ];

  
export default async function TotalRevenue() {
  const totalRevenue = await prisma.bookings.aggregate({
    _sum: {
      Total_amount: true
    },
  })
  const totalBookings = await prisma.bookings.count();
  const totalGuests = await prisma.guests.count();
  const updatedCardData = cardData.map(card => {
    if (card.label === "Total Revenue" && totalRevenue && totalRevenue._sum && totalRevenue._sum.Total_amount) {
      return {
        ...card,
        amount: `${totalRevenue._sum.Total_amount}`
      };
    }
    //  else if (card.label === "Total Guests" && totalGuests !== null) {
    //   return {
    //     ...card,
    //     amount: totalGuests?.toString()
    //   };
    // }
    else if(card.label === "Total Bookings" && totalGuests !== null) {
      return {
        ...card,
        amount: totalBookings?.toString()
      };
    }
    return card;
  });
  
  return (
    <div>
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-3 ">
        {updatedCardData.map((d, i) => (
          <Card
            key={i}
            amount={d.amount}
            icon={d.icon}
            label={d.label}
            Class={d.Class}
          />
        ))}
        
        
      </section>
    </div>
  )
}
