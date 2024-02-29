'use server'
export const getGuestByName = async (guestName:string) => {
    try {
        const guestId = await prisma?.guests.findMany({
            where:{
                First_name:guestName
            },
            select:{
                Guest_id:true,
            }
        })
        
        return guestId;
    } catch (error:any) {
        throw new Error(error);
    }
};