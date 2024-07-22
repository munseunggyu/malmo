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
  }),
  http.get(apiUrl + "chat/rooms", ({ request }) => {
    const id = request.headers.get("user-id");
    if (!id) {
      return HttpResponse.json(
        { message: "user not found" },
        {
          status: 401
        }
      );
    }

    return HttpResponse.json({
      rooms: [
        {
          id: id,
          roomName: "room name",
          category: "room category"
        }
      ]
    });
  }),
  http.get(apiUrl + "chat/messages/:roomId", ({ request, params }) => {
    const { roomId } = params;
    if (parseInt(roomId as string) < 10) {
      return HttpResponse.json(
        { message: "no such post" },
        {
          status: 404
        }
      );
    }

    return HttpResponse.json({
      rooms: [
        {
          userMessage: "hello world",
          aiMessages: "room category",
          createdAt: "2024-07-22T11:01:34.691Z"
        }
      ]
    });
  })
];
