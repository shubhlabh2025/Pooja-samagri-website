import React from 'react';

interface LoginMenuProps {
  icon?: React.ReactNode;
  image?: string;
  text: string;
  onClick?: () => void;
}

const TextWithIcons: React.FC<LoginMenuProps> = ({ icon, image, text, onClick }) => {
  return (
    <div
      className="flex items-center text-sm cursor-pointer px-2 py-1 space-x-2 whitespace-nowrap"
      onClick={onClick}
    >
      {image ? (
        <img
          src={image}
          alt="User"
          className="w-5 h-5 rounded-full object-cover flex-shrink-0"
        />
      ) : (
        <span className="text-lg flex-shrink-0">{icon}</span>
      )}
      <span className="truncate">{text}</span>
    </div>
  );
};

export default TextWithIcons;
