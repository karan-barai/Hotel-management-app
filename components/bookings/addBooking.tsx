'use client'
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

import { DatePickerWithPresets } from "./Datepicker";

const formSchema = z.object({
  Check_in: z.string(),
  Check_out: z.string()
});

const AddBooking = () => {
  const [isLoading, setIsLoading] = useState(false);
  // Inside AddBooking component
const [availableRooms, setAvailableRooms] = useState<{ Room_id: string | null }[]>([]);
const [startDate,setStartDate] = useState<any>();
const [endDate,setEndDate] = useState<any>();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>();
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
     
      const response = await axios.post('/api/roomsAvailable', { Check_in: startDate, Check_out: endDate });
      setAvailableRooms(response.data.availableRooms); // Update availableRooms state with the response data
      toast({
        variant: "success",
        description: "🎉 Rooms available!"
      });
    } catch (error) {
      console.error("Error checking room availability:", error);
      toast({
        variant: "destructive",
        description: "Failed to check room availability"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <main>
      <Form {...form}>
        <h3 className="text-lg font-semibold">Add a new Booking</h3>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                shouldUnregister={false}
                name="Check_in"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Check In *</FormLabel>
                        <DatePickerWithPresets setStartDate={setStartDate} {...field}/>
                        <FormMessage />
                    </FormItem>
                )}
              />
              <FormField
                control={form.control}
                shouldUnregister={false}
                name="Check_out"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Check Out *</FormLabel>
                    <DatePickerWithPresets {...field} setStartDate={setEndDate}/>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="px-4">
            <Button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
      {availableRooms.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold">Available Rooms:</h4>
          <ul>
            {availableRooms.map(room => (
              <li key={room.Room_id}>{room.Room_id}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
};

export default AddBooking;
