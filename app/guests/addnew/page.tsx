
import Addguest from '@/components/guests/addGuest'
import React from 'react'

export default async function Newguest() {
  const latestGuest = await prisma?.guests.findFirst({
    orderBy: { Guest_id: "desc" }, // Assuming Guest_id is sortable
  });
  let latestGuestId = "GI0001"; // Default value if no guests exist
  if (latestGuest) {
    const latestId = parseInt(latestGuest.Guest_id.slice(2)); // Extract numeric part and convert to integer
    latestGuestId = `GI000${latestId + 1}`; // Increment and prepend "GI"
  }
  return (
    <div>
      {/* <GetGuestbyId/> */}
      <Addguest latestGuestId={latestGuestId}/>
    </div>
  )
}
