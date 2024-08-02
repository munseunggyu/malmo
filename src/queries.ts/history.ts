import { IHistory } from "@/app/history/_component/HistoryList";
import { getHistory } from "@/services/getHistory";
import { constants } from "@/utils";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

export function useHistorykQuery(userId: string) {
  return useQuery<IHistory[]>({
    queryKey: ["history"],
    queryFn: () => getHistory(userId),
    staleTime: 1000 * 60 * 5,
    enabled: !!userId
  });
}

export function useHistoryMutation({
  userId,
  historyId,
  queryClient
}: {
  userId: string;
  historyId: number;
  queryClient: QueryClient;
}) {
  return useMutation({
    mutationFn: () => {
      return fetch(constants.apiUrl + `chat/rooms/${historyId}`, {
        method: "DELETE",
        headers: {
          "user-id": userId
        }
      });
    },
    onSuccess() {
      historySuccess({ queryClient, historyId });
    }
  });
}

export function historySuccess({
  queryClient,
  historyId
}: {
  queryClient: QueryClient;
  historyId: number;
}) {
  const queryCache = queryClient.getQueryCache();
  const queryKeys = queryCache.getAll().map(cache => cache.queryKey);
  queryKeys.forEach(queryKey => {
    if (queryKey[0] === "history") {
      const historyList = queryClient.getQueryData<IHistory[]>(["history"]);
      const data = historyList?.filter(item => item.id !== historyId);

      queryClient.setQueryData(["history"], data);
    }
  });
}
