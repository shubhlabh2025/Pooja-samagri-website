import { Facebook } from "lucide-react";
import WhatsAppIcon from "@/assets/whatsapp_icon.svg";
import GmailIcon from "@/assets/gmail.svg";
import type { FC } from "react";

interface ShareDrawerProps {
  onClose: () => void;
  onShare: (platform: "facebook" | "whatsapp" | "gmail") => void;
}

export const ShareDrawer: FC<ShareDrawerProps> = ({ onClose, onShare }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[320px] rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Share via</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ×
          </button>
        </div>

        <div className="flex justify-around">
          <button
            onClick={() => onShare("facebook")}
            className="flex flex-col items-center space-y-2 transition hover:scale-105"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-300">
              <Facebook className="text-blue-600" size={24} />
            </div>
            <span className="text-sm">Facebook</span>
          </button>

          <button
            className="flex flex-col items-center space-y-2 transition hover:scale-105"
            onClick={() => {
              onShare("whatsapp");
            }}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-300">
              <img
                loading="lazy"
                src={WhatsAppIcon}
                alt="WhatsApp"
                className="h-8 w-8"
              />
            </div>
            <span className="text-sm">WhatsApp</span>
          </button>

          <button
            onClick={() => onShare("gmail")}
            className="flex flex-col items-center space-y-2 transition hover:scale-105"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-300">
              <img
                loading="lazy"
                src={GmailIcon}
                alt="Gmail"
                className="h-8 w-8"
              />{" "}
            </div>
            <span className="text-sm">Gmail</span>
          </button>
        </div>
      </div>
    </div>
  );
};
