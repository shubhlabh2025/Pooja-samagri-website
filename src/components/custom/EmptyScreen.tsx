import React from "react";

type EmptyScreenProps = {
  imageSrc: string;
  title: string;
  subtitle: string;
  buttonText: string;
  onButtonClick: () => void;
  showBackArrow?: boolean;
};

const EmptyScreen: React.FC<EmptyScreenProps> = ({
  imageSrc,
  title,
  subtitle,
  buttonText,
  onButtonClick,
  showBackArrow = true,
}) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center items-center px-4 bg-white text-center relative">
      {showBackArrow && (
        <button
          onClick={() => window.history.back()}
          className="absolute top-4 left-4 text-gray-500"
        >
          ←
        </button>
      )}

      <img src={imageSrc} alt="Error" className="w-40 h-40 mb-6" />

      <h2 className="text-xl font-semibold text-orange-500">{title}</h2>
      <p className="text-gray-500 mb-6">{subtitle}</p>

      <button
        onClick={onButtonClick}
        className="bg-orange-500 text-white px-6 py-2 rounded-full font-medium shadow"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default EmptyScreen;
