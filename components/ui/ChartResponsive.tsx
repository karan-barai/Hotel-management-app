'use client'
import React, { PureComponent } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';



type Props = {
    data : any
  };
  

export default function ChartResponsive({data}: Props){
    return(
        <div className=''>
        <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer>
          <ComposedChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3"  />
            <XAxis  dataKey="date" scale="band" />
            <YAxis dataKey={"Occupancy"} />
            <Tooltip labelClassName='text-black' />
            <Legend />
            <Bar dataKey="Occupancy" fill="#413ea0" />
            <Line dataKey="Revenue" stroke="#ff7300" />

          </ComposedChart>
        </ResponsiveContainer>
      </div>
        </div>
    );
};