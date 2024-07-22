import { http, HttpResponse } from "msw";

const apiUrl = "http://localhost:9090/";
export const handlers = [
  http.get(apiUrl + "user", ({ request }) => {
    const url = new URL(request.url);
    const id = parseInt(url.searchParams.get("id") as string) || 0;

    return HttpResponse.json({
      deleted: true,
      deletedAt: "2024-07-22T10:08:11.370Z",
      createdAt: "2024-07-22T10:08:11.370Z",
      updatedAt: "2024-07-22T10:08:11.370Z",
      userId: id,
      email: "hello@naver.com"
    });
  })
];
