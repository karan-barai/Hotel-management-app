
import PageTitle from "@/components/ui/page-title";
import TotalRevenue from "./Dashboard/TotalRevenue";
import UpcomingBookings from "./Dashboard/UpcomingBookings";
import RoomsTypeBarchart from "./Dashboard/RoomsTypeBarchart";
import "@bitnoi.se/react-scheduler/dist/style.css";

import RoomOccupancy from "./Dashboard/RoomOccupancy";
import HeroImage from "@/components/ui/hero";



export default async function Home() {

  return (
    <main>
    <div className="flex flex-col gap-5 w-full">
     <HeroImage/>
   
    </div>
    </main>
  );
}

