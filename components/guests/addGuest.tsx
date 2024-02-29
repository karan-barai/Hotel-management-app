'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";




const formSchema = z.object({
  Guest_id: z.string(),  
  First_name: z.string().min(3, {
      message: 'Firstname must be greater than 3 characters',
  }),               
  Last_name: z.string().min(3, {
    message: 'Lastname must be greater than 3 characters',
}),                      
  Email: z.string().email(),                          
  Phone: z.string().min(10, {
    message: 'Phone number must be greater than 10 characters',
}),                         
  Address: z.string().min(10, {
    message: 'Address must be greater than 10 characters',
}),                       
  Type_of_id: z.enum(["Voter Id","Passport","Aadhar Card","Driving License"]),              
  Id_details: z.string().min(5, {
    message: 'Details must be greater than 5 characters',
}),                    
  City: z.string().min(3, {
    message: 'city must be greater than 3 characters',
}),                        
  state: z.string().min(3, {
    message: 'state must be greater than 3 characters',
}),                          
  country: z.string().min(3, {
    message: 'Country must be greater than 3 characters',
}),                        
  Emergency_contact_person: z.string().min(3, {
    message: 'Name must be greater than 3 characters',
}),       
  Emergency_contact: z.string().min(10, {
    message: 'Number must be greater than 10 characters',
}),              
  GSTIN: z.string(),                          
  GST_name: z.string(),                       
  });

  

  const Addguest = ({latestGuestId:lgi}:{latestGuestId:string}) => {
   
    const [latestGuestId, setLatestGuestId] = useState(""); // State to store the latest guest ID
    const [formBody,setFormBody] = useState( {
          Guest_id:   lgi,                    
          First_name :'',               
          Last_name  :'',               
          Email      :'',               
          Phone      :'',               
          Address    :'',                       
          Id_details  :'',              
          City        :'',              
          state       :'',              
          country      :'',             
          Emergency_contact_person :'', 
          Emergency_contact       :'',  
          GSTIN                :'',     
          GST_name           :'',       
      
    })
  
    

    useEffect(()=>{
      
      setFormBody(prev=>({...prev,Guest_id:latestGuestId}))
      

  },[latestGuestId])
  
    // Run this effect only once when the component mounts

      
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:  formBody,
  }); 
  const [isLoading, setIsLoading] = useState(false);
  const {toast} = useToast();
  const Router = useRouter();
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
   axios.post('/api/guest', values).then((res) =>{
    
    toast({
      variant: 'success',
      description: "🎉 Guest created"
    })
    Router.push(`/guests`) 
  }).catch((error) => {
    console.error("Error creating guest:", error);
    toast({
      variant: 'destructive',
      description: "Failed to create guest"
    });
  })
  .finally(() => {
    setIsLoading(false);
  });
}


  return (
    <main>
      <Form {...form}>
      <h3  className="text-lg font-semibold">Add a new guest</h3>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className=" space-y-4">
          <FormField
          control={form.control}
          shouldUnregister={false} 
          name="Guest_id"
          render={({ field }) => (
              <FormItem>
                    <FormLabel>Guest ID</FormLabel>
                   
                        <FormControl>
                         <Input
                         disabled placeholder={lgi} {...field} />
                        </FormControl>
                        
                <FormMessage />
              </FormItem>
            )}/>

        <FormField
          control={form.control}
          name="First_name"
          render={({ field }) => (
              <FormItem>
                    <FormLabel>First Name *</FormLabel>
                    
                        <FormControl>
                           <Input placeholder="Enter first name here " {...field} />
                        </FormControl>
                        
                <FormMessage />
              </FormItem>
            )}/>
             <FormField
          control={form.control}
          name="Last_name"
          render={({ field }) => (
              <FormItem>
                    <FormLabel>Last Name *</FormLabel>
                    
                        <FormControl>
                           <Input placeholder="Enter Last name here " {...field} />
                        </FormControl>
                        
                <FormMessage />
              </FormItem>
            )}/>

             <FormField
          control={form.control}
          name="Email"
          render={({ field }) => (
              <FormItem>
                    <FormLabel>Email *</FormLabel>
                  
                        <FormControl>
                           <Input placeholder="Enter guest email here " {...field} />
                        </FormControl>
                        
                <FormMessage />
              </FormItem>
            )}/>
           
             <FormField
          control={form.control}
          name="Phone"
          render={({ field }) => (
              <FormItem>
                    <FormLabel>Phone *</FormLabel>
                   
                        <FormControl>
                           <Input placeholder = "Enter phone number here" {...field} />
                        </FormControl>
                        
                <FormMessage />
              </FormItem>
            )}/>

        <FormField
          control={form.control}
          name="Address"
          render={({ field }) => (
              <FormItem>
                    <FormLabel>Address *</FormLabel>
                    
                        <FormControl>
                          <Textarea placeholder="Enter address here " {...field}/>
                        </FormControl>
                        
                <FormMessage />
              </FormItem>
            )}/>
        
        
           
        </div>
        <div className="space-y-4">
          
        <FormField
          control={form.control}
          name="Id_details"
          render={({ field }) => (
              <FormItem>
                    <FormLabel>ID Detail *</FormLabel>
                   
                        <FormControl>
                           <Input placeholder="Enter ID detail here " {...field} />
                        </FormControl>
                        
                <FormMessage />
              </FormItem>
            )}/>

        <FormField
          control={form.control}
          name="City"
          render={({ field }) => (
              <FormItem>
                    <FormLabel>City *</FormLabel>
  
                        <FormControl>
                           <Input placeholder="Enter city here " {...field} />
                        </FormControl>
                        
                <FormMessage />
              </FormItem>
            )}/>

          <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
              <FormItem>
                    <FormLabel>State *</FormLabel>
                    
                        <FormControl>
                           <Input placeholder="Enter state here " {...field} />
                        </FormControl>
                        
                <FormMessage />
              </FormItem>
            )}/>    
          <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
              <FormItem>
                    <FormLabel>Country *</FormLabel>
                        <FormControl>
                           <Input placeholder="Enter country here " {...field} />
                        </FormControl>
                        
                <FormMessage />
              </FormItem>
            )}/>

          <FormField
          control={form.control}
          name="Emergency_contact_person"
          render={({ field }) => (
              <FormItem>
                    <FormLabel> Emergency person *</FormLabel>
                    
                        <FormControl>
                           <Input placeholder="Enter name here " {...field} />
                        </FormControl>       
                <FormMessage />
              </FormItem>
            )}/>

        <FormField
          control={form.control}
          name="Emergency_contact"
          render={({ field }) => (
              <FormItem>
                    <FormLabel> Emergency person contact number *</FormLabel>
                   
                        <FormControl>
                           <Input placeholder="Enter number here " {...field} />
                        </FormControl>       
                <FormMessage />
              </FormItem>
            )}/>

      
        <div className="px-24">
        <Button
          type="submit"
          className="w-full mx-auto text-sm">
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
          </div >
        
        </div>
       
        </form>
      </Form>
    </main>
  );

};
 
export default Addguest;



