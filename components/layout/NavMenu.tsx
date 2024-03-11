"use client"

import * as React from "react"
import { BookUser, CalendarRange, ChevronsUpDownIcon, Menu, NotebookTabs, Plus } from "lucide-react"


import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export function NavMenu() {
const Router =  useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
      {/* <DropdownMenuItem className="cursor-pointer flex gap-2 items-center" onClick={() => Router.push("/Calendar")}>
          <CalendarRange  size={15} /><span>Calender</span>
        </DropdownMenuItem> */}
        <DropdownMenuItem className="cursor-pointer flex gap-2 items-center" onClick={() => Router.push("/hotel/new")}>
         <Plus size={15} /><span>Add Hotel</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex gap-2 items-center" onClick={() => Router.push("/guests")}>
        <BookUser size={15} /> <span>Guests</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex gap-2 items-center" onClick={() => Router.push("/bookings")}>
          <NotebookTabs size={15} /><span>Bookings</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
