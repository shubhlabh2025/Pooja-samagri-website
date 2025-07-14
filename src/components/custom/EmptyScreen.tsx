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
    <div className="relative flex flex-1 flex-col items-center justify-center rounded-tl-lg bg-white px-4 text-center">
      {showBackArrow && (
        <button
          onClick={() => window.history.back()}
          className="absolute top-4 left-4 text-gray-500"
        >
          ←
        </button>
      )}

      <img src={imageSrc} alt="Error" className="mb-6 h-40 w-40" />

      <h2 className="text-xl font-semibold text-orange-500">{title}</h2>
      <p className="mb-6 text-gray-500">{subtitle}</p>

      <button
        onClick={onButtonClick}
        className="0 rounded-full bg-orange-500 px-6 py-2 font-medium text-white shadow"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default EmptyScreen;
