
"use server"
"use server";
import { getQueryClient, trpc } from "@/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import Client from "./client";

const page = async () => {
  const queryClient = getQueryClient();

  // Prefetching query on server
  // this only iniitiates the call only for the populating the suspensed Client 
  await queryClient.prefetchQuery(trpc.hello.queryOptions({ text: "bhargav" }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading ...</p>}>
        <Client />
      </Suspense>
    </HydrationBoundary>
  );
};

export default page;



// 'use client'

// import { useTRPC } from "@/trpc/tRPC-wrapper";
// import { useQuery } from "@tanstack/react-query";
// import React from "react";

// const page = () => {
//   const trpc = useTRPC();
//   const { data } = useQuery(trpc.hello.queryOptions({text:"bhargav"}));
//   return <div> greetings : {data?.greeting}</div>;
// };

// export default page;