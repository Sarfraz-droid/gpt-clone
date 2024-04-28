import React, { useState } from "react";

type IProps = {
  onSubmit: (text: string) => void;
};

function ChatInput(props: IProps) {
  const [text, setText] = useState("");

  const onSubmit = () => {
    props.onSubmit(text);
    setText("");
  };

  return (
    <div className="max-w-3xl w-full p-2 px-4 flex justify-between border border-gray-200/20 rounded-xl">
      <textarea
        className="flex-1 bg-transparent resize-none outline-none self-center placeholder:text-gray-400 placeholder:font-medium text-sm"
        placeholder="Message ChatGPT..."
        rows={1}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.keyCode == 13) {
            if (!e.shiftKey) {
              e.preventDefault();
              onSubmit();
            } else {
              setText(text + "\n");
            }
          }
        }}
        value={text}
      />
      <button
        className={`${text.length == 0 ? "bg-gray-400" : "bg-white"} ${
          text.length == 0 && "opacity-10"
        } rounded-md p-1 `}
        disabled={text.length == 0}
        onClick={onSubmit}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-gray-800"
        >
          <path
            d="M7 11L12 6L17 11M12 18V7"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </button>
    </div>
  );
}

export default ChatInput;
