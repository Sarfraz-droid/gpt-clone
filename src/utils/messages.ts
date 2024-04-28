import prisma from "@/db";
import { Messages } from "@/types/api";

export const getMessages = async (chatId: string, userId: string) => {
  const data = await prisma.message.findMany({
    where: {
      user_id: userId,
      chatId: parseInt(chatId),
    },
    orderBy: [
      {
        id: "asc",
      },
    ],
  });

  return data;
};

export const transformMessages = (messages: Messages[]) => {
  const m = [];

  for (let i = 0; i < messages.length; i++) {
    m.push({
      role: "user",
      content: messages[i].userMessage,
    });

    m.push({
      role: "assistant",
      content: messages[i].gptResponse,
    });
  }

  return m;
};
