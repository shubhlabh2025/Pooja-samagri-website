import React, { useState, type JSX } from "react";
import { User, MapPin, Info, Shield, Phone, Power } from "lucide-react";

import { AboutUsText, PoliciesText, SupportText } from "../../utils/constants";

import { RenderHtmlText } from "./RenderHtmlText";
import { RenderUserInputs } from "./RenderUserInputs";
import RenderNavBar from "./RenderNabar";
import UserAddress from "./UserAddress";
import { useLogoutMutation } from "@/features/auth/authAPI";
import ConfirmationDialog from "@/components/dialog/ConfirmationDialog";
import { useLocation, useNavigate } from "react-router";

type Tab = "profile" | "address" | "about" | "policies" | "support";

// Add interface for address component
export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

const tabIcons: Record<Tab, JSX.Element> = {
  profile: <User size={20} />,
  address: <MapPin size={20} />,
  about: <Info size={20} />,
  policies: <Shield size={20} />,
  support: <Phone size={20} />,
};

const UserProfilePage: React.FC = () => {
  const location = useLocation();
  const state = location.state as { tab?: Tab } | undefined;
  const [activeTab, setActiveTab] = useState<Tab>(state?.tab ?? "profile");
  const [logout, { isLoading }] = useLogoutMutation();
  const [showLogoutDialog, setshowLogoutDialog] = useState(false);
  const navigate = useNavigate();

  // Add state for search page visibility and current editing address

  // If search page is open, render it

  const renderSidebar = () => (
    <aside className="fixed top-[60px] left-0 mt-4 ml-2 flex w-[10%] flex-col items-center justify-start gap-6 rounded-xl border-r bg-blue-100 py-6 shadow-sm md:static md:h-[calc(100vh-80px)] md:w-36">
      {Object.entries(tabIcons).map(([tab, icon]) => {
        const isActive = activeTab === tab;

        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as Tab)}
            className={`flex w-full items-center justify-center px-4 py-2 md:justify-start ${isActive ? "font-bold text-[#ff5200]" : "text-gray-700 hover:text-black"} flex-col rounded-full md:flex-row md:rounded-lg`}
          >
            <span
              className={`${isActive ? "text-[#ff5200]" : "text-gray-600"}`}
            >
              {icon}
            </span>
            <span
              className={`ml-2 hidden capitalize md:inline ${isActive ? "text-[#ff5200]" : "text-gray-700"}`}
            >
              {tab}
            </span>
          </button>
        );
      })}
    </aside>
  );

  const handleLogout = () => {
    setshowLogoutDialog(true);
  };
  const handleAddAddress = () => {
    navigate("/address");
  };
  return (
    <div className="flex flex-col bg-gray-50">
      <RenderNavBar />
      <div className="flex h-full">
        {renderSidebar()}

        <main className="ml-[10%] h-[calc(100vh-60px)] max-h-full w-full overflow-y-auto p-6 md:ml-0 md:pl-10">
          <div className="hide-scrollbar mx-auto max-h-full overflow-y-auto rounded-lg bg-white p-6 shadow">
            {activeTab === "profile" && (
              <>
                <ConfirmationDialog
                  open={showLogoutDialog}
                  onOpenChange={setshowLogoutDialog}
                  headingText="Logout?"
                  bodyText="Re you sure you want to logout?"
                  confirmationButtonText={
                    isLoading ? "Logging out..." : "Logout"
                  }
                  cancelButtonText="Cancel"
                  onConfirm={async () => {
                    await logout();
                    navigate("/", { replace: true });
                  }}
                  isConfirming={isLoading}
                />
                <div className="flex flex-row justify-between">
                  <h1 className="mb-1 text-xl font-semibold">
                    User Information
                  </h1>
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleLogout}
                      className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-[#e64800]"
                    >
                      <div className="flex flex-row items-center">
                        <Power className="text-white" size={18} />
                        <span className="ml-2 hidden sm:inline">Logout</span>
                      </div>
                    </button>
                  </div>
                </div>
                <p className="mb-6 text-sm text-gray-600">
                  Enter the required information below to register. You can
                  change it anytime you want.
                </p>
                <RenderUserInputs />
              </>
            )}

            {activeTab === "address" && (
              <>
                <div className="flex flex-row justify-between">
                  <h1 className="mb-1 text-xl font-semibold">
                    Address Management
                  </h1>
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleAddAddress}
                      className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-[#e64800]"
                    >
                      <div className="flex flex-row items-center">
                        Add Address
                      </div>
                    </button>
                  </div>
                </div>

                <h3 className="mb-4 text-lg font-medium">Saved Addresses</h3>
                {<UserAddress />}
              </>
            )}

            {activeTab === "about" && (
              <>
                <h2 className="mb-6 text-xl font-semibold">About Us</h2>
                {RenderHtmlText(AboutUsText)}
              </>
            )}
            {activeTab === "policies" && (
              <>
                <h2 className="mb-6 text-xl font-semibold">Terms & Policies</h2>
                {RenderHtmlText(PoliciesText)}
              </>
            )}
            {activeTab === "support" && (
              <>
                <h2 className="mb-6 text-xl font-semibold">Customer Support</h2>
                {RenderHtmlText(SupportText)}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserProfilePage;
