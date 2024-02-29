import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
    title: string,
    calssname?: string,
}

export default function PageTitle({title,calssname}: Props) {
  return (
    <h1 className={cn('text-2xl font-semibold',calssname)}>
        {title}
    </h1>
  )
}