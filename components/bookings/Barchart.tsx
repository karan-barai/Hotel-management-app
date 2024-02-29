/** @format */
"use client";
import {
  BarChart as BarGraph,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";


type Props = {
  data : any
};


export default function BarChart({data}: Props) {
  

  return (
    <>
    <ResponsiveContainer width={"100%"} height={350} className="overflow: auto">
      <BarGraph  width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}>
        <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" scale="band"
            />
          <YAxis />
          <Tooltip labelClassName="text-black"  />
          <Legend />
          <Bar dataKey="Family" stackId="a" fill="#ffc658" />
          <Bar dataKey="Suite" stackId="a" fill="#82ca9d" />
          <Bar dataKey="Deluxe" stackId="a" fill="#8884d8" />
      </BarGraph>
    </ResponsiveContainer>
    
</>
  );
}