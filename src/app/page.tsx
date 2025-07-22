"use client"

import { Input } from '@/components/ui/input';
import { useTRPC } from '@/trpc/tRPC-wrapper'
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'

const page = () => {
  const [value,setValue] = useState("")
  const [result ,setResult ]= useState("")
  const trpc = useTRPC();
  const invoke  = useMutation(trpc.invoke.mutationOptions({}))
  return (
    <div className='w-screen h-screen flex flex-col justify-center  items-center bg-black'>
      <Input className='max-w-40 my-12 bg-white' value={value} onChange={(e)=>setValue(e.target.value)}/>
      <button className='p-4 bg-sky-100 text-black rounded-full' onClick={()=>{
        invoke.mutate({value:value})
      }}>Invoke Backgroun Job</button>
    </div>
  )
}

export default page
