import { constants } from "@/utils";

export const fetchNewMeeting = async ({
  category,
  message,
  userId
}: {
  category: string;
  message: string;
  userId: string;
}) => {
  try {
    const response = await fetch(constants.apiUrl + "chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-id": userId
      },
      body: JSON.stringify({
        category,
        message
      })
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
