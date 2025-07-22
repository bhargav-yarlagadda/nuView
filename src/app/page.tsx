"use client"

import { useTRPC } from '@/trpc/tRPC-wrapper'
import { useMutation } from '@tanstack/react-query';
import React from 'react'

const page = () => {
  const trpc = useTRPC();
  const invoke  = useMutation(trpc.invoke.mutationOptions({}))
  return (
    <div className='w-screen h-screen flex justify-center  items-center bg-black'>
      <button className='p-4 bg-sky-100 text-black rounded-full' onClick={()=>{
        invoke.mutate({text:"John"})
      }}>Invoke Backgroun Job</button>
    </div>
  )
}

export default page
