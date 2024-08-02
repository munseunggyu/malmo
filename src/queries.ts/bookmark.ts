import { IBookMark } from "@/app/bookmark/_component/BookMarksList";
import { getBookmark } from "@/services/getBookmark";
import { constants } from "@/utils";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

export function useBookMarkQuery(userId: string | undefined) {
  return useQuery<IBookMark[]>({
    queryKey: ["bookmark"],
    queryFn: () => {
      return getBookmark(userId!);
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!userId
  });
}

export function useBookMarkMutation({
  userId,
  aiMessageId,
  queryClient
}: {
  userId: string;
  aiMessageId: number;
  queryClient: QueryClient;
}) {
  return useMutation({
    mutationFn: () => {
      return fetch(constants.apiUrl + `chat/chat/${aiMessageId}`, {
        method: "DELETE",
        headers: {
          "user-id": userId
        }
      });
    },
    onSuccess() {
      bookMarkSuccess({ queryClient, aiMessageId });
    }
  });
}

export function bookMarkSuccess({
  queryClient,
  aiMessageId
}: {
  queryClient: QueryClient;
  aiMessageId: number;
}) {
  const queryCache = queryClient.getQueryCache();
  const queryKeys = queryCache.getAll().map(cache => cache.queryKey);
  queryKeys.forEach(queryKey => {
    if (queryKey[0] === "bookmark") {
      const bookmarkList = queryClient.getQueryData<IBookMark[]>(["bookmark"]);
      const data = bookmarkList?.filter(
        item => item.aiMessageId !== aiMessageId
      );

      queryClient.setQueryData(["bookmark"], data);
    }
  });
}
