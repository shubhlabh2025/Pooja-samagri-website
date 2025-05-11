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
    <div className="marquee-container" style={rootStyles}>
      <div className="marquee-content">{text}</div>

      {/* Embedded CSS */}
      <style>{`
        .marquee-container {
          overflow: hidden;
          white-space: nowrap;
          position: relative;
          width: 100%;
        }

        .marquee-content {
          display: inline-block;
          padding-left: 100%;
          animation: marquee-scroll var(--marquee-duration) linear var(--marquee-repeat);
          will-change: transform;
        }

        @keyframes marquee-scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default MarqueeText;
