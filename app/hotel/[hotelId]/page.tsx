import { gethotelsbyId } from "@/actions/getHotelsById";
import Addhotel from "@/components/Hotel/addHotelForm";
import { auth } from "@clerk/nextjs";

interface HotelPageProps{
    params: {
        hotelId:string
    }
}


const Hotels = async({params}:HotelPageProps) => {
    const hotel = await gethotelsbyId(params.hotelId)
    const {userId} = auth()

    if(!userId)  return <div>Not authenticate...</div>

    if(hotel && hotel.Hotel_id == userId) return <div>Acess denied</div>

    return ( <div>
        <Addhotel hotel={hotel}/>
    </div> );
}
 
export default Hotels;