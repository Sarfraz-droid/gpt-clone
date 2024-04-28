import prisma from "@/db";
import { transformMessages } from "@/utils/messages";
import { auth } from "@clerk/nextjs/server";
import dayjs from "dayjs";
import { NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export async function POST(request: NextRequest) {
  const { text, chatId, messages } = await request.json();
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const tMessages = messages ? transformMessages(messages) : [];

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      ...(tMessages as any[]),
      {
        role: "user",
        content: text,
      },
    ],
  });
  // console.log(text);
  // console.log(response.choices);
  const gptResponse =
    response.choices[response.choices.length - 1].message.content || "";

  let msgChatId = parseInt(chatId);

  let chatDetails = undefined;
  if (!chatId) {
    chatDetails = await prisma.chat.create({
      data: {
        createdAt: dayjs().toDate(),
        title: text,
        user_id: userId,
      },
    });

    msgChatId = chatDetails.id;
  }

  // console.log({
  //   user_id: userId,
  //   userMessage: text,
  //   chatId: msgChatId,
  //   gptResponse: gptResponse,
  // });

  const message = await prisma.message.create({
    data: {
      user_id: userId,
      userMessage: text,
      chatId: msgChatId,
      gptResponse: gptResponse,
    },
  });

  return Response.json({ message, chat: chatDetails });
}
