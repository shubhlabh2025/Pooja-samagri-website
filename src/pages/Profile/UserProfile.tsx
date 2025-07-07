import React, { useState, type JSX } from "react";
import { User, MapPin, ShoppingBag, Info, Shield, Phone } from "lucide-react";

import { AboutUsText } from "../../utils/constants";

import { RenderHtmlText } from "./RenderHtmlText";
import { RenderUserInputs } from "./RenderUserInputs";
import RenderNavBar from "./RenderNabar";
import UserAddress from "./UserAddress";

type Tab = "profile" | "address" | "orders" | "about" | "policies" | "support";

// Add interface for address component
export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

const tabIcons: Record<Tab, JSX.Element> = {
  profile: <User size={20} />,
  address: <MapPin size={20} />,
  orders: <ShoppingBag size={20} />,
  about: <Info size={20} />,
  policies: <Shield size={20} />,
  support: <Phone size={20} />,
};

const UserProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

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
  // const renderAddressList = () => {
  //   return (
  //     <div className="space-y-4">
  //       {addressData.data.map((addr) => {

  //         const extractedAddress = extractAddressFields(
  //           addressSearchData.data.address_components,
  //         );

  //         return (
  //           <div
  //             key={addr.id}
  //             className="rounded-lg border bg-white p-4 shadow-sm"
  //           >
  //             <div className="mb-2 flex items-center justify-between">
  //               <p className="text-sm font-medium">
  //                 {extractedAddress.city}, {extractedAddress.state} -{" "}
  //                 {extractedAddress.pincode}
  //               </p>
  //               <button
  //                 onClick={() => handleExpand(addr.id)}
  //                 className="text-sm text-blue-500 hover:underline"
  //               >
  //                 {expandedId === addr.id ? "Collapse" : "Edit"}
  //               </button>
  //             </div>

  //             {expandedId === addr.id && (
  //               <div className="mt-2 grid grid-cols-3 gap-3">
  //                 {/* Address search field */}
  //                 <div className="relative col-span-3">
  //                   <input
  //                     type="text"
  //                     className="w-full cursor-pointer rounded border bg-gray-50 p-2 pr-16 text-sm hover:bg-gray-100"
  //                     value={
  //                       addressSearchData?.data?.formatted_address ||
  //                       "Click to search address"
  //                     }
  //                     placeholder="Click to search and select address"
  //                     readOnly
  //                   />
  //                   <button
  //                     type="button"
  //                     className="absolute top-1/2 right-2 -translate-y-1/2 rounded bg-orange-500 px-3 py-1 text-xs text-white hover:bg-orange-600"
  //                     onClick={() => handleFormattedAddressClick(addr.id)}
  //                   >
  //                     Edit
  //                   </button>
  //                 </div>

  //                 {/* Editable fields */}
  //                 <input
  //                   type="text"
  //                   className="col-span-3 rounded border p-2 text-sm"
  //                   value={
  //                     addressFormData[addr.id]?.addressLine1 ??
  //                     addr.address_line1 ??
  //                     ""
  //                   }
  //                   onChange={(e) =>
  //                     handleFieldChange(addr.id, "addressLine1", e.target.value)
  //                   }
  //                   placeholder="Address Line 1"
  //                 />
  //                 <input
  //                   type="text"
  //                   className="col-span-3 rounded border p-2 text-sm"
  //                   value={
  //                     addressFormData[addr.id]?.addressLine2 ??
  //                     addr.address_line2 ??
  //                     ""
  //                   }
  //                   onChange={(e) =>
  //                     handleFieldChange(addr.id, "addressLine2", e.target.value)
  //                   }
  //                   placeholder="Address Line 2"
  //                 />
  //                 <input
  //                   type="text"
  //                   className="col-span-1 rounded border p-2 text-sm"
  //                   value={extractedAddress.city}
  //                   onChange={(e) =>
  //                     handleFieldChange(addr.id, "city", e.target.value)
  //                   }
  //                   placeholder="City"
  //                   readOnly
  //                 />
  //                 <input
  //                   type="text"
  //                   className="col-span-1 rounded border p-2 text-sm"
  //                   value={extractedAddress.state}
  //                   onChange={(e) =>
  //                     handleFieldChange(addr.id, "state", e.target.value)
  //                   }
  //                   placeholder="State"
  //                   readOnly
  //                 />
  //                 <input
  //                   type="text"
  //                   className="col-span-1 rounded border p-2 text-sm"
  //                   value={extractedAddress.pincode}
  //                   onChange={(e) =>
  //                     handleFieldChange(addr.id, "pincode", e.target.value)
  //                   }
  //                   placeholder="Pincode"
  //                 />

  //                 {/* Action buttons */}
  //                 <div className="col-span-3 mt-2 flex gap-2">
  //                   <button
  //                     className="rounded bg-orange-500 px-4 py-2 text-sm text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
  //                     onClick={() => handleSaveAddress(addr.id)}
  //                     disabled={isUpdating}
  //                   >
  //                     {isUpdating ? "Saving..." : "Save Changes"}
  //                   </button>
  //                   <button
  //                     className="rounded bg-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-400"
  //                     onClick={() => {
  //                       setAddressFormData((prev) => {
  //                         const newData = { ...prev };
  //                         delete newData[addr.id];
  //                         return newData;
  //                       });
  //                       setExpandedId(null);
  //                     }}
  //                     disabled={isUpdating}
  //                   >
  //                     Cancel
  //                   </button>
  //                 </div>
  //               </div>
  //             )}
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // };

  return (
    <div className="flex flex-col bg-gray-50">
      <RenderNavBar />
      <div className="flex h-full">
        {renderSidebar()}

        <main className="ml-[10%] h-[calc(100vh-60px)] max-h-full w-full overflow-y-auto p-6 md:ml-0 md:pl-10">
          <div className="hide-scrollbar mx-auto max-h-full overflow-y-auto rounded-lg bg-white p-6 shadow">
            {activeTab === "profile" && (
              <>
                <h1 className="mb-1 text-xl font-semibold">User Information</h1>
                <p className="mb-6 text-sm text-gray-600">
                  Enter the required information below to register. You can
                  change it anytime you want.
                </p>
                <RenderUserInputs />
              </>
            )}

            {activeTab === "address" && (
              <>
                <h2 className="mb-6 text-xl font-semibold">
                  Address Management
                </h2>
                <h3 className="mb-4 text-lg font-medium">Saved Addresses</h3>
                {<UserAddress />}
              </>
            )}

            {activeTab === "orders" && (
              <>
                <h2 className="mb-6 text-xl font-semibold">My Orders</h2>
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
                <h2 className="mb-6 text-xl font-semibold">Policies</h2>
                {RenderHtmlText(AboutUsText)}
              </>
            )}
            {activeTab === "support" && (
              <>
                <h2 className="mb-6 text-xl font-semibold">Customer Support</h2>
                {RenderHtmlText(AboutUsText)}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserProfilePage;
