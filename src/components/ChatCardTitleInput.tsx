import React, { useContext, useState } from "react";
import { ChatContext } from "./ChatsList";

function ChatCardTitleInput() {
  const { selectedChat, updateTitle } = useContext(ChatContext);

  const [title, setTitle] = useState(selectedChat.chat?.title || "");

  return (
    <input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="bg-gray-100/5 rouned-md outline-none"
      id={`active_chat_${selectedChat.chat?.id}`}
      onBlur={() => {
        updateTitle(title);
      }}
      onKeyDown={(e) => {
        if (e.keyCode == 13) {
          updateTitle(title);
        }
      }}
      autoFocus
    />
  );
}

export default ChatCardTitleInput;
