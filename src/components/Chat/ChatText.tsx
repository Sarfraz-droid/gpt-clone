import { SignedIn, UserButton, UserProfile } from "@clerk/nextjs";
import { faker } from "@faker-js/faker";
import React from "react";
import TypewriterText from "../common/Typewriter";

type IProps = {
  icon: () => JSX.Element;
  from: string;
  text: string;
  showTypeWriter?: boolean;
  onTypeWriterComplete?: () => void;
};

function ChatText(props: IProps) {
  return (
    <div className="px-5 flex mt-8">
      <div className="w-8">{props.icon()}</div>
      <div className="text-sm pt-1 w-full pl-2">
        <div className="font-semibold">{props.from}</div>
        {props.showTypeWriter ? (
          <TypewriterText
            text={props.text}
            onTypewriterComplete={props.onTypeWriterComplete}
          />
        ) : (
          <div className=" leading-6">{props.text}</div>
        )}
      </div>
    </div>
  );
}

export default ChatText;
