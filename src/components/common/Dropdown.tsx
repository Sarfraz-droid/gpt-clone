import { Chats } from "@/types/api";
import React, { useContext, useEffect, useMemo, useRef } from "react";
import { ChatContext } from "../ChatsList";

type IProps = {
  chat: Chats;
  onDisabled: () => void;
};

function ChatDropdown(props: IProps) {
  const ref = useRef<any>();

  const { setSelectedChat, selectedChat, deleteChat } = useContext(ChatContext);

  const dims = useMemo(() => {
    const el = document.getElementById(`chat__${props.chat.id}`);

    return el?.getBoundingClientRect();
  }, [props.chat]);

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        props.onDisabled();
      }
    });

    return () => {
      document.removeEventListener("mousedown", () => {});
    };
  }, []);

  return (
    <div
      ref={ref as any}
      onBlur={() => {
        props.onDisabled();
      }}
      style={{
        top: (dims?.top || 0) + 40,
        left: 160,
      }}
      className="absolute z-30 w-[170px] bg-gray-800 p-2 rounded-md border border-white/20"
    >
      <button
        className="flex w-full gap-2 p-2 hover:bg-gray-400/20 transition-all rounded-md"
        onClick={() => {
          setSelectedChat({
            ...selectedChat,
            edit: true,
            showDropdown: false,
          });

          document
            .getElementById(`active_chat_${selectedChat.chat?.id}`)
            ?.focus();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 self-center"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>

        <div className="font-medium text-sm self-center">Rename</div>
      </button>
      <button
        className="flex w-full gap-2 p-2 hover:bg-gray-400/20 transition-all rounded-md text-red-500"
        onClick={() => {
          if (selectedChat.chat) deleteChat(selectedChat.chat.id);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 self-center"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
        <div className="text-sm self-center font-medium">Delete</div>
      </button>
    </div>
  );
}

export default ChatDropdown;
