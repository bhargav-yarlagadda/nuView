

import { useTRPC } from '@/trpc/tRPC-wrapper';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'
import MessageCard from './MessageCard';
import MessageForm from './message-form';

const MessagesContainer = ({projectId}:{projectId:string}) => {
    const trpc = useTRPC()
     const { data: messages } = useSuspenseQuery(
        trpc.messages.getMessages.queryOptions({
          projectId: projectId,
        })
      );
  return (
    <div className='flex flex-col flex-1 min-h-0'>

      <div className='flex-1 overflow-y-auto min-h-0'>
            <div className='pt-2 pr-1 '>
                {
                    messages.map((message)=>{
                        return( 
                            <MessageCard 
                            key={message.id}
                            content={message.content}
                            role={message.role}
                            fragment={message.fragment}
                            createdAt= {message.createdAt}
                            isActiveFragment={false}
                            onFragmentClick={()=>{}}
                            type={message.type}
                            />
                        )
                    })
                }
            </div>
      </div>
      <div className='relative p-3 pt-1'>
                <MessageForm projectId={projectId}/>
      </div>
    </div>
  )
}

export default MessagesContainer
