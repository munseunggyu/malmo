import { authOptions } from "@/auth";
import { getHistory } from "@/services/getHistory";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";
import { getServerSession } from "next-auth";
import React from "react";
import HistoryList from "./_component/HistoryList";

export default async function HistoryPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return <>Loading</>;
  }
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["history"],
    queryFn: () => getHistory(user.id)
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div>
      <h1 className='py-[24px] px-[68px] text-[20px] font-[600] border-b border-b-bg-3'>
        히스토리
      </h1>

      <HydrationBoundary state={dehydratedState}>
        <HistoryList />
      </HydrationBoundary>
    </div>
  );
}
