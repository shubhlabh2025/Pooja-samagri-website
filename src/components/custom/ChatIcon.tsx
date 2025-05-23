import React, { useState } from "react";
import { MessageSquare, X } from "lucide-react"; // Optional: lucide-react icons
import WhatsAppIcon from "../../assets/whatsapp.svg";
import Gamil from "../../assets/gmail.svg";

const ChatIcon: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openGmail = () => {
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=infoshubhlabhpoojasamagri@gmail.com`,
      "_blank",
    );
  };

  const openWhatsApp = () => {
    const isMobile = /iPhone|Android/i.test(navigator.userAgent);
    const phoneNumber = "919914454147"; // Add country code for WhatsApp
    const message = encodeURIComponent("Hello");

    const url = isMobile
      ? `https://wa.me/${phoneNumber}?text=${message}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    window.open(url, "_blank");
  };

  return (
    <div className="fixed right-6 bottom-10 z-50 flex flex-col items-end space-y-2">
      {isOpen && (
        <div className="flex flex-col items-end space-y-4 transition-opacity duration-300">
          <button
            className="bg-white-600 rounded-full p-2 text-white shadow-md hover:animate-bounce hover:duration-300"
            onClick={openGmail}
          >
            <img src={Gamil} className="h-8 w-8" />
          </button>

          <button
            className="hover:bg-[#3cea5c]-700 rounded-full bg-[#1DD042] p-2 text-white shadow-md hover:animate-bounce hover:duration-300"
            onClick={openWhatsApp}
          >
            <img src={WhatsAppIcon} className="h-8 w-8" />
          </button>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="transform rounded-full bg-red-600 p-4 text-white shadow-lg transition-transform hover:bg-red-700 active:scale-90"
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageSquare></MessageSquare>}
      </button>
    </div>
  );
};

export default ChatIcon;
