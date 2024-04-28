"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import ChatGPT from "../assets/Logo";
import ChatListCard from "./ChatListCard";
import ChatListDateWiseCard from "./ChatListDatewiseCard";
import { Chats, ISelectedChat } from "@/types/api";
import { redirect } from "next/navigation";
import Link from "next/link";
import ChatDropdown from "./common/Dropdown";
import { useAuth, UserButton } from "@clerk/nextjs";

export type IProps = {
  chats: Chats[];
};

export const ChatContext = createContext({
  selectedChat: {
    edit: false,
    showDropdown: false,
    chat: null,
  },
  setSelectedChat: (chat) => {},
  updateTitle: (text) => {},
  deleteChat: (chatId) => {},
} as {
  selectedChat: ISelectedChat;
  setSelectedChat: (chat: ISelectedChat) => void;
  updateTitle: (text: string) => void;
  deleteChat: (chatId: number) => void;
});

function ChatsList(props: IProps) {
  const { signOut, userId } = useAuth();

  const ref = useRef<HTMLDivElement>();
  const [isOpen, setIsOpen] = useState(true);

  const [chatData, setChatData] = useState<Chats[]>(props.chats);
  const [selectedChat, setSelectedChat] = useState<ISelectedChat>({
    edit: false,
    showDropdown: false,
    chat: null,
  });

  // console.log(selectedChat);

  const deleteChat = async (chatId: number) => {
    setSelectedChat({
      ...selectedChat,
      showDropdown: false,
    });
    await fetch(`/api/chats`, {
      method: "DELETE",
      body: JSON.stringify({
        chatId,
      }),
    });

    setChatData((_chatData: Chats[]) => {
      const chatList = _chatData.filter((item) => item.id != chatId);

      return chatList;
    });
  };

  const updateTitle = async (text: string) => {
    if (selectedChat.chat === null) return;
    const chat = {
      ...(selectedChat.chat || {}),
      title: text,
    };
    const res = await fetch(`/api/chats`, {
      method: "PATCH",
      body: JSON.stringify({
        chat,
      }),
    });

    const newData = await res.json();

    setChatData((_chatData) => {
      const data = _chatData.map((chat) => {
        if (chat.id == newData.id) {
          return newData;
        }
        return chat;
      });

      return data;
    });

    setSelectedChat({
      ...selectedChat,
      edit: false,
    });
  };

  useEffect(() => {
    window.document?.addEventListener(
      "chat_list",
      (e: any) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        // console.log(e.detail?.chat);
        if (e.detail?.chat) {
          setChatData([e.detail?.chat, ...chatData]);
        }
      },
      false
    );

    return () => window.document?.removeEventListener("chat_list", () => {});
  }, [chatData]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        updateTitle,
        deleteChat,
      }}
    >
      <div>
        {selectedChat.showDropdown && selectedChat.chat != null && (
          <ChatDropdown
            chat={selectedChat.chat}
            onDisabled={() => {
              setSelectedChat({
                ...selectedChat,
                showDropdown: false,
              });
            }}
          />
        )}
        <div
          className="flex-shrink-0 h-screen flex flex-col overflow-x-hidden bg-gray-900 w-[260px] transition-all"
          style={{
            width: isOpen ? 260 : 0,
          }}
          ref={ref as any}
        >
          <div className="flex-1  px-3 pb-3.5">
            <div className="pr-2 -mr-2 sticky pt-3.5 ">
              <Link
                href={"/c"}
                className="group flex h-10 items-center gap-2 rounded-lg bg-token-sidebar-surface-primary px-2 font-medium hover:bg-gray-800 "
              >
                <div className="gizmo-shadow-stroke relative flex h-full items-center justify-center rounded-full bg-token-main-surface-primary text-token-text-primary">
                  <ChatGPT className="h-2/3 w-2/3" />
                </div>
                <div className="grow overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-100">
                  New Chat
                </div>
                <div className="flex gap-3">
                  <span className="flex items-center" data-state="closed">
                    <button className="text-gray-100">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[18px] h-[18px]"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M16.7929 2.79289C18.0118 1.57394 19.9882 1.57394 21.2071 2.79289C22.4261 4.01184 22.4261 5.98815 21.2071 7.20711L12.7071 15.7071C12.5196 15.8946 12.2652 16 12 16H9C8.44772 16 8 15.5523 8 15V12C8 11.7348 8.10536 11.4804 8.29289 11.2929L16.7929 2.79289ZM19.7929 4.20711C19.355 3.7692 18.645 3.7692 18.2071 4.2071L10 12.4142V14H11.5858L19.7929 5.79289C20.2308 5.35499 20.2308 4.64501 19.7929 4.20711ZM6 5C5.44772 5 5 5.44771 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V14C19 13.4477 19.4477 13 20 13C20.5523 13 21 13.4477 21 14V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6C3 4.34314 4.34315 3 6 3H10C10.5523 3 11 3.44771 11 4C11 4.55228 10.5523 5 10 5H6Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </button>
                  </span>
                </div>
              </Link>

              <div className="h-[80vh] overflow-auto">
                <ChatListDateWiseCard
                  chats={chatData}
                  setSelectedChat={(chat) =>
                    setSelectedChat({
                      edit: false,
                      showDropdown: true,
                      chat,
                    })
                  }
                />
              </div>
              <div className="p-4">
                <UserButton showName />
              </div>
            </div>
          </div>
        </div>
        <button
          className={`absolute hover:scale-y-105 transition-all ${
            isOpen ? "rotate-90" : "-rotate-90"
          }`}
          style={{
            left: isOpen ? 265 : 5,
            top: "50vh",
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>
    </ChatContext.Provider>
  );
}

export default ChatsList;
