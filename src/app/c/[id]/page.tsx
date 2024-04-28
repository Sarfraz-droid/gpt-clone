import ChatPageContainer from "@/container/ChatPageContainer";
import { getMessages } from "@/utils/messages";
import { auth } from "@clerk/nextjs/server";
import React from "react";

type IProps = {
  params: {
    id: string;
  };
};

async function Page(props: IProps) {
  const { userId } = auth();

  if (!userId) {
    return;
  }
  const messages = await getMessages(props.params.id, userId);

  // console.log(messages);

  return <ChatPageContainer messages={messages} chatId={props.params.id} />;
}

export default Page;
