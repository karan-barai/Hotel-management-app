"use client"

import { ColumnDef } from "@tanstack/react-table"
import {ArrowUpDown, SquareUser } from "lucide-react"

import { Button } from "@/components/ui/button"

import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useEffect, useState } from "react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type bookingDetails = {
    Booking_id: string,
    Booking_date: string,
    Name:string,
    Guest_id: string,
    Check_in: string,
    Check_out: string,
    Room_type: string,
    Booking_status: string,
    Rooms_booked: number,
    Adults: number | null,
    Children: number | null,
    Extra_person:number | null,
    Total_amount:number,
    Advance_received:number | null,
    Date_of_advance: string,
    Balance_due: number | null,
    Due_date: number,
    Payment_status: string,
    Sources: string,
    Special_request: string,
    Address?: string;
      City?: string;
      country: string;
      Email: string;
      Phone: string;
      state: string;
      Emergency_contact: string;
      Emergency_contact_person: string;
      First_name: string;
      Last_name:string;
    guests: {
  }[];
    
}
async function onSubmit(Guest_id:string,Booking_id:string) {
    
  
 const response =  await axios.post('/api/bookingPopover', { Guest_id, Booking_id })
 return response.data;
}



export const columns: ColumnDef<bookingDetails>[] = [
  {
    id: "details",
    cell: ({ row }) => {
      const bookingDetails = row.original;
      const [guestData, setGuestData] = useState<bookingDetails[]>([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      const fetchGuestData = async () => {
        setLoading(true);
        try {
          const response = await onSubmit(bookingDetails.Guest_id, bookingDetails.Booking_id);
          setGuestData(response);
        } finally {
          setLoading(false);
        }
      };

      return (
        <>
          <Popover>
            <PopoverTrigger asChild>
              <Button onClick={fetchGuestData} variant="outline"><SquareUser/></Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                {/* ... other content ... */}
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Guest Details</h4>
                  {loading ? (
                    <div>Loading...</div>
                  ) : error ? (
                    <div>Error: {error}</div>
                  ) : (
                    <div>
                      {guestData.length > 0 && (
                        <div>
                          {/* Display guest details here */}
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="name">Guest Name:</Label>
                            <p id="name">{guestData[0]?.First_name} {guestData[0].Last_name}</p>
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="address">Address:</Label>
                            <p id="address">{guestData[0].Address}</p>
                            </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="address">City:</Label>
                            <p id="address">{guestData[0].City}</p>
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="address">State:</Label>
                            <p id="address">{guestData[0].state}</p>
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="address">Country:</Label>
                            <p id="address">{guestData[0].country}</p>
                            </div>
                          
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="address">Email:</Label>
                            <p id="address">{guestData[0].Email}</p>
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="address">Phone:</Label>
                            <p id="address">{guestData[0].Phone}</p>
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="address">Emergency contact person:</Label>
                            <p id="address">{guestData[0].Emergency_contact_person}</p>
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="address">Emergency contact:</Label>
                            <p id="address">{guestData[0].Emergency_contact}</p>
                          </div>
                        </div>
                      )}
                      {guestData.length === 0 && (
                        <div>No guest details available</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </>
      );
    },
  }, // Add a closing curly brace here
  {
    accessorKey: "Booking_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Booking Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },

  {
    accessorKey: "Booking_date",
    header: ({ column }) => {
      return (
        <Button className="flex items-start justify-start"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Booking Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "Name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    
  },
  {
    accessorKey: "Room_type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Room Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "Check_in",
    header: ({ column }) => {
        return (
          <Button className="flex items-start justify-start"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Check In
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "Check_out",
    header: ({ column }) => {
        return (
          <Button className="flex items-start justify-start"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Check Out
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "Booking_status",
    header: ({ column }) => {
        return (
          <Button className="flex items-start justify-start"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Boooking Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "Rooms_booked",
    header: "Rooms Booked",
  },
  {
    accessorKey: "Total_amount",
    header: "Total Amount",
  },{
    accessorKey: "Advance_received",
    header: "Advance received",
  },
  {
    accessorKey: "Balance_due",
    header: ({ column }) => {
        return (
          <Button className=""
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Balance Due
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
//   {
//     id: "actions",
//     cell: ({ row }) => {
//       const Guest = row.original

//       return (
        
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem
//             //   onClick={() => navigator.clipboard.writeText(Guest.Address)}
//             >
//               Copy Address
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             {/* <DropdownMenuItem className="gap-2"
//               onClick={() => 
//                 // window.location.href = `tel:${Guest.Emergency_contact}`
//               }
//             > Emergency Contact: {Guest.Emergency_contact_person}  
//             </DropdownMenuItem> */}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       )
//     },
//   },
]
