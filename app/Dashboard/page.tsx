import PageTitle from '@/components/ui/page-title'
import React from 'react'
import TotalRevenue from './TotalRevenue'
import UpcomingBookings from './UpcomingBookings'
import RoomOccupancy from './RoomOccupancy'
import RoomsTypeBarchart from './RoomsTypeBarchart'

export default function page() {
  return (
    <div className="flex flex-col gap-5">
       <PageTitle title="Dashboard"/>
      <TotalRevenue/>
      <UpcomingBookings/>
      <RoomOccupancy/>
      <RoomsTypeBarchart/>
    </div>
  )
}
