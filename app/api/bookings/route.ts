import { NextResponse } from "next/server";
import prisma from '@/prisma/db';
function convInt(value: any){
    var valueString = value;
var valueInteger = parseInt(valueString, 10); // The second argument specifies the base (radix), which is 10 for base 10 numbers

return valueInteger;
}

// function addOneIfUser(value:any){
//    var date = new Date();
//    console.log({date}) 
//     if(value == date){
//         return value;        
//     }else{
//         // Add 1 day
//         date.setDate(date.getDate() + 1);

//         // Format the date to the same format
//         return date.toISOString();
//     }
// }
function getNextDateOrSame(dateString: any) {
    // Parse the given date string
    var givenDate = new Date(dateString);
    
    // Get the current date
    var currentDate = new Date();
    
    // Set time to midnight for both dates
    givenDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    // If the given date is equal to the current date, return the given date
    if (givenDate.getTime() === currentDate.getTime()) {
        return dateString;
    } else {
        // Add one day to the given date
        givenDate.setDate(givenDate.getDate() + 1);
        return givenDate.toISOString();
    }
}


// Test with a given date



function addOneDay(value: any){
    console.log({value})
    var date = new Date(value);

// Add 1 day
date.setDate(date.getDate() + 1);

// Format the date to the same format
return date.toISOString();

}

function convDate(dateString:any) {
    var parts = dateString.split('/');
    var day = parts[0];
    var month = parts[1];
    var year = parts[2];

    var date = new Date(year, month - 1, day );
    return date.toISOString();
};

export async function POST(req:Request) {
    try {
const body = await req.json();
let {Booking_date, Adults, Children, Extra_person,Rooms_booked,Check_in,check_out, Date_of_advance,Due_date } =  body

 Booking_date = convDate(Booking_date)
 Booking_date = addOneDay(Booking_date);
Check_in= getNextDateOrSame(Check_in),

check_out= getNextDateOrSame(check_out),

Date_of_advance= getNextDateOrSame(Date_of_advance),

Due_date= getNextDateOrSame(Due_date)


const guest = await prisma.bookings.create({
    data:{
        ...body,
        Booking_date: Booking_date,
        Adults:convInt(Adults),
        Children:convInt(Children),
        Extra_person:convInt(Extra_person),
        Rooms_booked:convInt(Rooms_booked),
        Check_in:Check_in,
        check_out:check_out,
        Date_of_advance:Date_of_advance,
        Due_date:Due_date,
    },
});
return NextResponse.json(guest)

    } catch (error) {
        console.log('Error at /app/api/guest POST ',error);
        new NextResponse('Internel Server error',{status: 500})
    }
}