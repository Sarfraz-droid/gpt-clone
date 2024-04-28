"use client";

import Logo from "@/assets/Logo";
import ChatInput from "@/components/Chat/ChatInput";
import ChatText from "@/components/Chat/ChatText";
import { Messages } from "@/types/api";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

type IProps = {
  messages?: Messages[];
  chatId?: string;
};

function ChatPageContainer(props: IProps) {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [currentChatId, setCurrentChatId] = useState(props.chatId);
  const ref = useRef<HTMLDivElement | undefined>();
  const router = useRouter();

  const [showCurrent, setShowCurrent] = useState({
    isFetching: false,
    text: "",
  });

  const onPromptSubmit = async (text: string) => {
    setShowCurrent({
      isFetching: true,
      text,
    });
    const res = await fetch("/api/prompt", {
      body: JSON.stringify({
        text,
        chatId: props.chatId,
        messages: props.messages,
      }),
      method: "POST",
    });

    const data = await res.json();

    setShowCurrent({
      isFetching: false,
      text: "",
    });

    setMessages([...messages, data.message]);
    if (ref.current) ref.current.scrollTop = ref.current?.scrollHeight;

    if (data.chat) {
      setCurrentChatId(data.chat.id);

      const evt = new CustomEvent("chat_list", {
        detail: {
          chat: data.chat,
        },
        bubbles: false,
        cancelable: true,
      });
      // console.log("Dispatching Event");

      window.document.dispatchEvent(evt);
    }
  };

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current?.scrollHeight;
  }, [messages, showCurrent, props.messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <div className="flex gap-1 text-lg">
          <span className="font-medium">ChatGPT</span>
          <span className="font-medium gray-400">3.5</span>
        </div>
      </div>
      <div className="flex-1 flex justify-center ">
        <div
          className="w-full max-w-3xl h-[78vh] overflow-auto"
          ref={ref as any}
          id="chat_menu"
        >
          {props.messages?.map((message, index) => (
            <React.Fragment key={index}>
              <ChatText
                from="You"
                text={message.userMessage || ""}
                icon={() => <UserButton />}
              />
              <ChatText
                from="ChatGPT"
                icon={() => <Logo className="w-2/3" />}
                text={message.gptResponse || ""}
              />
            </React.Fragment>
          ))}
          {messages?.map((message, index) => (
            <React.Fragment key={index}>
              <ChatText
                from="You"
                text={message.userMessage || ""}
                icon={() => <UserButton />}
              />
              <ChatText
                from="ChatGPT"
                icon={() => <Logo className="h-7 w-7" />}
                text={message.gptResponse || ""}
                showTypeWriter={true}
                onTypeWriterComplete={() => {
                  if (!props.chatId) router.push(`/c/${currentChatId}`);
                }}
              />
            </React.Fragment>
          ))}

          {showCurrent.isFetching && (
            <ChatText
              from="You"
              icon={() => <UserButton />}
              text={showCurrent.text}
            />
          )}
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        <ChatInput onSubmit={onPromptSubmit} />
      </div>
      <div className="flex justify-center items-center text-sm pb-2 pt-2 opacity-70">
        <span>Hey I can make mistakes. : {")"}</span>
      </div>
    </div>
  );
}

export default ChatPageContainer;
