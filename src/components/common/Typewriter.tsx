import { useInterval } from "@/hooks/useInterval";
import React, { useState } from "react";
import Typewriter from "typewriter-effect";

type IProps = {
  text: string;
  onTypewriterComplete?: () => void;
};

function TypewriterText(props: IProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useInterval(
    () => {
      // console.log("scrolling typwriter");
      const el = document.getElementById("chat_menu");
      if (el) el.scrollTop = el?.scrollHeight;
    },
    isPlaying ? 100 : null
  );

  // console.log({ isPlaying });

  return (
    <div>
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .callFunction(() => setIsPlaying(true))
            .typeString(props.text)
            .callFunction(() => {
              setIsPlaying(false);
              props?.onTypewriterComplete?.();
            })
            .changeDelay(0.01)
            .start();
        }}
        options={{
          delay: 0.01,
          cursorClassName: "hidden",
          wrapperClassName: "leading-6 Typewriter__wrapper",
        }}
      />
    </div>
  );
}

export default TypewriterText;
