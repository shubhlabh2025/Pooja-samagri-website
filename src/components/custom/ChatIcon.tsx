import React from "react";
import WhatsAppIcon from "../../assets/whatsapp_icon.svg";

const ChatIcon: React.FC = () => {
  const openWhatsApp = () => {
    const isMobile = /iPhone|Android/i.test(navigator.userAgent);
    const phoneNumber = "919000057702"; // Include country code
    const message = encodeURIComponent("Hello");

    const url = isMobile
      ? `https://wa.me/${phoneNumber}?text=${message}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    window.open(url, "_blank");
  };

  return (
    <div className="fixed right-6 bottom-20">
      <button
        className="rounded-full bg-[#1DD042] p-3 shadow-md hover:shadow-lg"
        onClick={openWhatsApp}
      >
        <img
          loading="lazy"
          src={WhatsAppIcon}
          alt="WhatsApp"
          className="h-8 w-8"
        />
      </button>
    </div>
  );
};

export default ChatIcon;
