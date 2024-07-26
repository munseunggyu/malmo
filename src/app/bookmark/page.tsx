import { authOptions } from "@/auth";
import { getBookmark } from "@/services/getBookmark";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";
import { getServerSession } from "next-auth";
import React from "react";
import BookMarksList from "./_component/BookMarksList";

export default async function BookmarkPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return <>Loading</>;
  }
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["bookmark"],
    queryFn: () => getBookmark(user.id)
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <div>
      <h1 className='py-[24px] px-[68px] text-[20px] font-[600] border-b border-b-bg-3'>
        저장 공간
      </h1>
      <HydrationBoundary state={dehydratedState}>
        <BookMarksList />
      </HydrationBoundary>
    </div>
  );
}
