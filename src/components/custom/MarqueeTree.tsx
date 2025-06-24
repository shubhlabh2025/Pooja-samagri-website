import React from "react";

interface MarqueeTextProps {
  text: string;
  speed?: number; // in seconds
  repeat?: "infinite" | number;
}

const MarqueeText: React.FC<MarqueeTextProps> = ({
  text,
  speed = 10,
  repeat = "infinite",
}) => {
  const rootStyles: React.CSSProperties = {
    "--marquee-duration": `${speed}s`,
    "--marquee-repeat": `${repeat}`,
  } as React.CSSProperties;

  return (
    <div
      className="relative w-full overflow-hidden whitespace-nowrap"
      style={rootStyles}
    >
      <div className="animate-marquee-scroll inline-block pl-[100%] will-change-transform">
        {text}
      </div>
    </div>
  );
};

export default MarqueeText;
