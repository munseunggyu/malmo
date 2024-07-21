import { http, HttpResponse } from "msw";

const apiUrl = "http://localhost:9090/";
export const handlers = [
  http.get(apiUrl + "chat/rooms", () => {
    return HttpResponse.json([
      { tagId: 1, title: "제로초", count: 1264 },
      { tagId: 2, title: "원초", count: 1264 },
      { tagId: 3, title: "투초", count: 1264 },
      { tagId: 4, title: "쓰리초", count: 1264 },
      { tagId: 5, title: "포초", count: 1264 },
      { tagId: 6, title: "파이브초", count: 1264 },
      { tagId: 7, title: "식스초", count: 1264 },
      { tagId: 8, title: "세븐초", count: 1264 },
      { tagId: 9, title: "나인초", count: 1264 }
    ]);
  })
];
