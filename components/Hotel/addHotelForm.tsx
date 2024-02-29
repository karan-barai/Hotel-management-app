"use client";

import { Floors, Hotels } from "@prisma/client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { UploadButton } from "../uploadthing";
import { useToast } from "../ui/use-toast";
import Image from "next/image";
import { Button } from "../ui/button";
import { Loader2, PencilLine, XCircle } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";


interface AddHotelFormProps {
  hotel: HotelWithFloors | null;
}

export type HotelWithFloors = Hotels & {
  Floors: Floors[];
};

const formSchema = z.object({
  Hotel_id: z.string().min(3, {
    message: "Id must be greater than 3 characters",
  }),
  Hotel: z.string().min(3, {
    message: "Name must be greater than 3 characters",
  }),
  Address: z.string().min(10, {
    message: "Address must be greater than 10 characters",
  }),
  image: z.string().min(1, {
    message: "image is required",
  }),
});

const Addhotel = ({ hotel }: AddHotelFormProps) => {

const [image, setImage] = useState<string | undefined >(hotel?.image?.toString) 
const [imageIsDeleting, setImageIsDeleting] = useState(false);
const [isLoading, setIsLoading] = useState(false)

const {toast} = useToast();
const Router = useRouter();

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues:  {
    Hotel_id: '',
    Hotel: '',
    Address: '',
    image:  '' ,
  },
});

useEffect(() => {
  if(typeof image === 'string') {
    form.setValue('image', image,{
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }
},[image])

function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    console.log(values)
    if(hotel){
      // axios.patch(`/api/hotel/${hotel.Hotel_id}`,values).then((res) =>{
      //   toast({
      //     variant: 'success',
      //     description: "🎉 Hotel Updated"
      //   })
      //   Router.push(`/hotel/${res.data.id}`)
      //   setIsLoading(false);
      // }).catch((err) =>{
      //   console.log(err)
      //   toast({
      //     variant: 'destructive',
      //     description: 'Something went wrong'
      //   })
        
      //   setIsLoading(false)
      // })
    }else{
      axios.post('/api/hotel', values).then((res) =>{
        toast({
          variant: 'success',
          description: "🎉 Hotel created"
        })
        Router.push(`/hotel/${res.data.id}`)
        setIsLoading(false);
      }).catch((err) =>{
        console.log(err)
        toast({
          variant: 'destructive',
          description: 'Something went wrong'
        })
        setIsLoading(false)
      })
    }
}

const handleImageDelete = (image:string) => {
    setImageIsDeleting(true)
    const imagekey = image.substring(image.lastIndexOf('/') + 1);
    axios.post('/api/uploadthing/delete', {imagekey}).then((res) =>{
        if(res.data.success){
            setImage('');
            toast({
            variant: 'success',
            description: 'Image Removed'})
        }
    }).catch(() =>
    {
        toast({
            variant: 'destructive',
            description: 'Failed to remove image'
        })
    }).finally(() => {
        setImageIsDeleting(false);
    })
} 

  return (
    <div className ="flex min-h-screen flex-col items-center justify-between p-14">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <h3 className="text-lg font-semibold">{hotel? 'Update Hotel Details' : 'Add a new hotel'}</h3>
            <div className="flex flex-col gap-6">
            <FormField
            control={form.control}
            name="Hotel_id"
            render={({ field }) => (
              <FormItem>
                    <FormLabel>Hotel Id *</FormLabel>
                        <FormControl>
                           <Input placeholder="Add hotel Id here " {...field} />
                        </FormControl>
                        
                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
            control={form.control}
            name="Hotel"
            render={({ field }) => (
              <FormItem>
                    <FormLabel>Hotel Name *</FormLabel>
                    
                        <FormControl>
                           <Input placeholder="Add your hotel name here " {...field} />
                        </FormControl>
                        
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="Address"
            render={({ field }) => (
              <FormItem>
                    <FormLabel>Hotel Address *</FormLabel>
                    
                        <FormControl>
                           <Textarea placeholder="Add your hotel address here " {...field} />
                        </FormControl>
                        
                <FormMessage />
              </FormItem>
            )}
          />
            </div>
          <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
              <FormItem className="flex flex-col sapce-y-3" >
                <FormLabel>upload an image *</FormLabel>
               
                <FormControl>
                    {image? <>
                    <div className="relative max-w-[400px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4">
                        <Image fill src={image} alt="Hotel Image" className="object-contain"/>
                        <Button onClick={()=>handleImageDelete(image)}
                        type="button" size='icon' variant='ghost' className="absolute right-[-12px] top-0">
                            {imageIsDeleting? <Loader2/>: <XCircle/>}
                        </Button>
                    </div>
                    </>: <>
                    <div className="flex flex-col item-center max-w[4000px] p-12 border-2 border-dashed
             border-primary/50 rounded mt-4" >
                        <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                  // Do something with the response
                                  console.log("Files: ", res);
                                  setImage(res[0].url);
                                  toast({
                                    variant: 'success',
                                    description: '🎉 Upload Completed'

                                  })
                                }}
                                onUploadError={(error: Error) => {
                                  // Do something with the error.
                                  toast({
                                    variant: 'destructive',
                                    description: `ERROR! ${error.message} `

                                  })
                                }}
                        
                        />
                    </div>

                    </>}
                  
                </FormControl>
              </FormItem>
          )}
          />
          <div className="flex justify-between gap-2 flex-wrap">
            {hotel?  
            <Button className="max-w-[150px]" disabled={isLoading} >{isLoading? <><Loader2 className="mr-2 h-4 w-4" />Updating</>:<>
            <PencilLine className="mr-2 h-4 w-4"/>Update</>}
            </Button> : <Button className="max-w-[150px]" disabled={isLoading}>
            {isLoading? <><Loader2 className="mr-2 h-4 w-4" />Creating</>:<>
            <PencilLine className="mr-2 h-4 w-4"/>Create Hotel</>}
              </Button>}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Addhotel;
