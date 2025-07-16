'use client'
import { useTRPC } from '@/trpc/tRPC-wrapper'
import { useSuspenseQuery } from '@tanstack/react-query'
import React from 'react'

const Client = () => {
    const trpc = useTRPC()
const {data} = useSuspenseQuery(trpc.hello.queryOptions({text:"bhargav"})) 
  return (
    <div>
      data is :{
        data.greeting
      }
    </div>
  )
}

export default Client
