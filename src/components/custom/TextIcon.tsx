import React from "react";

interface LoginMenuProps {
  icon?: React.ReactNode;
  image?: string;
  text: string;
  onClick?: () => void;
}

const TextWithIcons: React.FC<LoginMenuProps> = ({
  icon,
  image,
  text,
  onClick,
}) => {
  return (
    <div
      className="flex cursor-pointer items-center space-x-2 px-2 py-1 text-sm whitespace-nowrap"
      onClick={onClick}
    >
      {image ? (
        <img
          src={image}
          alt="User"
          className="h-5 w-5 flex-shrink-0 rounded-full object-cover"
        />
      ) : (
        <span className="flex-shrink-0 text-lg">{icon}</span>
      )}
      <span className="truncate">{text}</span>
    </div>
  );
};

export default TextWithIcons;
