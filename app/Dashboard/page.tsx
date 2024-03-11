import PageTitle from '@/components/ui/page-title'
import React from 'react'
import TotalRevenue from './TotalRevenue'
import UpcomingBookings from './UpcomingBookings'
import RoomOccupancy from './RoomOccupancy'
import RoomsTypeBarchart from './RoomsTypeBarchart'
// import EventSceduler fro../Calendar/EventScedulerler'

export default function page() {
  return (
    <div className="">
       <PageTitle title="Dashboard"/>
      <TotalRevenue/>
      <UpcomingBookings/>
      <RoomOccupancy/>
      <RoomsTypeBarchart/>
    </div>
  )
}
