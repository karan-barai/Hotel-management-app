'use client'
import { Scheduler,  SchedulerProjectData } from "@bitnoi.se/react-scheduler";
import { useCallback, useMemo, useState } from "react";

 export default function BitScheduler({ schedulerData }: any) {

  // const [range, setRange] = useState<SchedulerProjectData>({
  //   startDate: new Date(),
  //   endDate: new Date(),
  // });


  const handleTiteCtick =(data: SchedulerProjectData) =>
  alert(
    `${data.title} - ${data.subtitle}  \n  Check In:${data.startDate} \n Check out:${data.endDate} `
  );

// const handelRangeChange = useCallback((range: SchedulerProjectData) =>{
//   setRange(range);
// },[]);

  return (
    <section>
      <Scheduler
        data={schedulerData}
        isLoading={false}
        // onRangeChange={handelRangeChange}
        onTileClick={handleTiteCtick}
      
        config={{
          zoom: 1,
          filterButtonState: -1,
          includeTakenHoursOnWeekendsInDayView: false,
        }}
      />
    </section>
  );
}

