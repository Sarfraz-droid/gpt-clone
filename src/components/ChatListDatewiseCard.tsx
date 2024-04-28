import React, { useEffect, useMemo, useState } from "react";
import ChatListCard from "./ChatListCard";
import { Chats } from "@/types/api";
import { transformChats } from "@/utils/chats";
import ChatDropdown from "./common/Dropdown";

export type IProps = {
  chats: Chats[];
  setSelectedChat: (chat: Chats) => void;
};

function ChatListDateWiseCard(props: IProps) {
  const transformedResults = useMemo(() => {
    return transformChats(props.chats);
  }, [props.chats]);

  return (
    <div
      className="relative mt-5 empty:mt-0 empty:hidden"
      style={{
        height: "auto",
        opacity: 1,
      }}
    >
      {transformedResults.map((result, key) => (
        <React.Fragment key={key}>
          <div
            style={{
              opacity: 1,
            }}
          >
            <p className="h-9 pb-2 pt-3 px-2 text-ellipsis overflow-hidden break-all text-gray-400 text-xs font-semibold">
              {result.text}
            </p>
          </div>
          <ol>
            {result.children.map((chat, i) => (
              <li
                className="relative z-[15]"
                style={{
                  opacity: 1,
                  height: "auto",
                }}
                key={i}
              >
                <ChatListCard
                  chat={chat}
                  onSetSelectedChat={(chat) => props.setSelectedChat(chat)}
                />
              </li>
            ))}
          </ol>
        </React.Fragment>
      ))}
    </div>
  );
}

export default ChatListDateWiseCard;
