
import { NextResponse } from "next/server";
import prisma from "@/prisma/db";
export async function GET() {
    try {
        const guestIds = await prisma.guests.findMany({
            select: {
                Guest_id: true,
                First_name: true,
                Last_name: true,
            },
            orderBy: {
                Guest_id: "desc"
            }
        });

        const formattedGuestIds = guestIds.map(guest => ({
            Guest_id: guest.Guest_id,
            Name: `${guest.First_name} ${guest.Last_name}`
        }));
        return NextResponse.json(formattedGuestIds);
    } catch (error) {
        console.log('Error at /app/api/guest/guestIds ', error);
        return new NextResponse('Internal Server error', { status: 500 });
    }
}
