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
      className="relative w-full overflow-hidden bg-orange-50 whitespace-nowrap"
      style={rootStyles}
    >
      <div className="pl-[100%] animate-marquee-scroll inline-block will-change-transform">
        {text}
      </div>
    </div>
  );
};

export default MarqueeText;
