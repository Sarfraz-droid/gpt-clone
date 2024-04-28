import ChatsList from "@/components/ChatsList";
import { getChats } from "@/utils/chats";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import React, { useState } from "react";

async function ChatPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  if (userId == null) redirect("/");

  const res = await getChats(userId);

  // console.log(res);

  return (
    <React.Fragment>
      <div className="h-screen w-screen overflow-hidden flex">
        <div className="h-screen">
          <ChatsList chats={res} />
        </div>
        <div className="w-full h-screen bg-gray-800 flex flex-col">
          {children}
        </div>
      </div>
    </React.Fragment>
  );
}

export default ChatPageLayout;
