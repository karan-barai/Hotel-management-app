"use client"

import { ColumnDef } from "@tanstack/react-table"
import {ArrowUpDown, MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Guest = {
Guest_id: string;
First_name: string;
Last_name: string;
Email: string | null; // Allow null values for the Email property
Phone: string;
Address: string;
Type_of_id: string;
Id_details: string;
City: string;
state: string;
country: string;
Emergency_contact_person: string;
Emergency_contact: string;
GSTIN: string | null;
GST_name: string | null;
Bookings:[];
}

export const columns: ColumnDef<Guest>[] = [
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
    accessorKey: "City",
    header: "City",
  },
  {
    accessorKey: "Room_type",
    header: "Room Type",
  },
  {
    accessorKey: "Special_request",
    header: "Special Request",
  },
  {
    accessorKey: "Check_in",
    header: "Last Visited On",
  },
  {
    accessorKey: "Guest_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Guest ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },{
    accessorKey: "Type_of_id",
    header: "Type Of ID",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const Guest = row.original
 
      return (
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(Guest.Address)}
            >
              Copy Address
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
