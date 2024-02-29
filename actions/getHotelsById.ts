import prisma from '@/prisma/db';
 export const gethotelsbyId = async (hotelId:string) => {
    try {
        const hotel = await prisma.hotels.findUnique({
            where:{
                Hotel_id:hotelId
            },
            include: {
                Floors:true
            }
        })
        if(!hotel) return null;

        return hotel;
    } catch (error:any) {
        throw new Error(error);
    }
};