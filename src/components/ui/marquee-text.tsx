import React from 'react';
import '../css/MarqueeText.css';

interface MarqueeTextProps {
  text: string;
  speed?: number; // in seconds, lower means faster
  repeat?: 'infinite' | number;
}

const MarqueeText: React.FC<MarqueeTextProps> = ({
  text,
  speed = 10,
  repeat = 'infinite',
}) => {
  return (
    <div className="marquee-container">
      <div
        className="marquee-content"
        style={{
          animationDuration: `${speed}s`,
          animationIterationCount: repeat,
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default MarqueeText;
