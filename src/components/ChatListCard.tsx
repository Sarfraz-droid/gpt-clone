import { Chats } from "@/types/api";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useContext, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useMeasure } from "@uidotdev/usehooks";
import { ChatContext } from "./ChatsList";
import ChatCardTitleInput from "./ChatCardTitleInput";

type IProps = {
  chat: Chats;
  onSetSelectedChat: (chat: Chats) => void;
};

function ChatListCard({ chat, onSetSelectedChat }: IProps) {
  const { selectedChat } = useContext(ChatContext);
  const params = useParams();
  const [isHover, setIsHover] = useState(false);
  const isSelected = useMemo(
    () => chat.id.toString() == params?.id || isHover,
    [chat, params, isHover]
  );
  const [optionsClicked, setOptionsClicked] = useState(false);
  const ref = useRef<HTMLDivElement>();

  const dimensions = ref.current?.getBoundingClientRect();

  const isEditing = selectedChat.chat?.id == chat.id && selectedChat.edit;

  return (
    <div
      className={`group relative rounded-lg active:opacity-90 ${
        isSelected && "bg-gray-800"
      }`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      ref={ref as any}
      id={`chat__${chat.id}`}
    >
      <Link href={`/c/${chat.id}`} className="flex items-center gap-2 p-2">
        {isEditing ? (
          <div className="relative grow overflow-hidden whitespace-nowrap text-sm font-medium text-gray-100">
            <ChatCardTitleInput />
          </div>
        ) : (
          <div className="relative grow overflow-hidden whitespace-nowrap text-sm font-medium text-gray-100">
            {chat.title}

            {isSelected ? (
              <div className="absolute bottom-0 right-0 top-0 bg-gradient-to-l to-transparent from-gray-800 w-20 from-60%"></div>
            ) : (
              <div className="                        absolute bottom-0 right-0 top-0 bg-gradient-to-l to-transparent from-gray-900 group-hover:from-gray-800  w-8 from-0% group-hover:w-20 group-hover:from-60%"></div>
            )}
          </div>
        )}
      </Link>
      <div
        className="absolute bottom-0 right-0 top-0 items-center gap-1.5 pr-2 flex"
        style={{
          opacity: isSelected && !isEditing ? 1 : 0,
        }}
      >
        <div>
          <button
            className="flex items-center justify-center text-token-text-primary transition "
            type="button"
            id="radix-:r9n:"
            aria-haspopup="menu"
            aria-expanded="false"
            data-state="closed"
            onClick={() => {
              onSetSelectedChat(chat);
            }}
          >
            <span className="" data-state="closed">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="icon-md"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
          </button>
        </div>
        <span className="" data-state="closed">
          <button className="flex items-center justify-center text-gray-100">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="icon-md"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.62188 3.07918C3.87597 2.571 4.39537 2.25 4.96353 2.25H13.0365C13.6046 2.25 14.124 2.571 14.3781 3.07918L15.75 5.82295V13.5C15.75 14.7426 14.7426 15.75 13.5 15.75H4.5C3.25736 15.75 2.25 14.7426 2.25 13.5V5.82295L3.62188 3.07918ZM13.0365 3.75H4.96353L4.21353 5.25H13.7865L13.0365 3.75ZM14.25 6.75H3.75V13.5C3.75 13.9142 4.08579 14.25 4.5 14.25H13.5C13.9142 14.25 14.25 13.9142 14.25 13.5V6.75ZM6.75 9C6.75 8.58579 7.08579 8.25 7.5 8.25H10.5C10.9142 8.25 11.25 8.58579 11.25 9C11.25 9.41421 10.9142 9.75 10.5 9.75H7.5C7.08579 9.75 6.75 9.41421 6.75 9Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </span>
      </div>
    </div>
  );
}

export default ChatListCard;
