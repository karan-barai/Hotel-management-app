
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
const body = await req.json();

const guest = await prisma?.guests.create({
    data:{
        ...body,
    },
});
return NextResponse.json(guest)

    } catch (error) {
        console.log('Error at /app/api/guest POST ',error);
        new NextResponse('Internel Server error',{status: 500})
    }
}