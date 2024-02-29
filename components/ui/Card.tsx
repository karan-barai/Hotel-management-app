import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import React from 'react'
import { classNames } from 'uploadthing/client';


export type CardProps ={
label: string;
icon :LucideIcon;
amount?: any;
discription?: string;
Class?: string;
}


export default function Card(props:CardProps) {
  return (
    <CardContent className={props.Class}>
    <section className="flex justify-between gap-2">
      {/* label */}
      <p className="text-sm text-white">{props.label}</p>
      {/* icon */}
      <props.icon className="h-4 w-4 text-white" />
    </section>
    <section className="flex flex-col gap-1">
      <h2 className="text-2xl font-semibold text-white">{props.amount}</h2>
      <p className="text-xs text-gray-500">{props?.discription}</p>
    </section>
  </CardContent>
  )
}

export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
      <div
        {...props}
        className={cn("flex w-full flex-col gap-3 rounded-xl border p-5 shadow",props.className)}
      />
    );
  }