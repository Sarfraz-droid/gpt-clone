import { deleteChat, getChats, updateChat } from "@/utils/chats";
import { auth } from "@clerk/nextjs/server";
import { useRouter } from "next/router";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { userId } = auth();

  if (userId) {
    const data = await getChats(userId as string);
    return Response.json(data);
  }
}

export async function PATCH(req: NextRequest) {
  const { userId } = auth();

  const { chat } = await req.json();

  if (userId) {
    const data = await updateChat(chat);
    return Response.json(data);
  }
}

export async function DELETE(req: NextRequest) {
  const { userId } = auth();

  const { chatId } = await req.json();

  if (userId) {
    const data = await deleteChat(parseInt(chatId));
    return Response.json(data);
  }
}
