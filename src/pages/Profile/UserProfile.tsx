import React, { useState, type JSX } from "react";
import { User, MapPin, ShoppingBag, Info, Shield, Phone } from "lucide-react";

import { AboutUsText } from "../../utils/constants";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { RenderHtmlText } from "./RenderHtmlText";
import { RenderUserInputs } from "./RenderUserInputs";
import RenderNavBar from "./RenderNabar";
import { useGetUserAddressListQuery } from "@/features/address/AddresssAPI";

type Tab = "profile" | "address" | "orders" | "about" | "policies" | "support";

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
  const [email, setEmail] = useState("username@domain.com");

  const { data: addressData = { data: [] } } = useGetUserAddressListQuery();
  const [isOtpVisible, setIsOtpVisible] = useState(false);

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const otpSchema = z.object({
    otpCode: z
      .string()
      .trim()
      .length(6, { message: "OTP must be exactly 6 digits" })
      .regex(/^\d{6}$/, { message: "OTP must contain only digits" }),
  });

  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otpCode: "",
    },
  });

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

  const renderEmailInput = () => (
    <div className="w-full max-w-md">
      <label className="mb-1 block text-sm font-medium">Email address</label>

      {!isOtpVisible ? (
        <div className="relative">
          <input
            type="email"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-red-500 px-3 py-2 pr-28 text-sm outline-none"
          />

          <button
            onClick={() => setIsOtpVisible(true)}
            className="absolute top-1/2 right-2 -translate-y-1/2 rounded bg-[#ff5200] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#e64800]"
          >
            Verify
          </button>
        </div>
      ) : (
        <p className="rounded-md border bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700">
          {email}
        </p>
      )}

      {isOtpVisible && <div className="mt-6">{renderOtpForm()}</div>}
    </div>
  );

  const renderOtpForm = () => (
    <FormProvider {...otpForm}>
      <div className="w-full max-w-md">
        <FormField
          control={otpForm.control}
          name="otpCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  className="w-full justify-center gap-1"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                >
                  <InputOTPGroup className="mt-4 flex justify-between gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className="h-12 w-10 rounded border-b border-gray-500 text-center text-xl shadow-none focus:border-blue-500 focus:ring-0"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={otpForm.watch("otpCode")?.length !== 6}
          className="mt-5 w-full rounded-md bg-[#fb641b] py-2 font-semibold text-white transition-colors duration-200 hover:bg-[#e65a12]"
        >
          Verify
        </Button>
      </div>
    </FormProvider>
  );

  const renderAddressList = () => (
    <div className="space-y-4">
      {addressData.data.map((addr) => (
        <div key={addr.id} className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium">
              {addr.address_line1}, {addr.city}, {addr.state} - {addr.pincode}
            </p>
            <button
              onClick={() => handleExpand(addr.id)}
              className="text-sm text-blue-500 hover:underline"
            >
              {expandedId === addr.id ? "Collapse" : "Edit"}
            </button>
          </div>
          {expandedId === addr.id && (
            <div className="mt-2 grid grid-cols-3 gap-3">
              <input
                type="text"
                className="col-span-1 rounded border p-2 text-sm"
                defaultValue={addr.city}
              />
              <input
                type="text"
                className="col-span-1 rounded border p-2 text-sm"
                defaultValue={addr.state}
              />
              <input
                type="text"
                className="col-span-1 rounded border p-2 text-sm"
                defaultValue={addr.pincode}
              />
              <input
                type="text"
                className="col-span-3 rounded border p-2 text-sm"
                defaultValue={`${addr.address_line1 ?? ""} ${addr.address_line2 ?? ""}`}
                placeholder="Street"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );

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
                {renderEmailInput()}
                <RenderUserInputs
                  onSaveCallback={() => console.log("Saving user info")}
                />
              </>
            )}

            {activeTab === "address" && (
              <>
                <h2 className="mb-6 text-xl font-semibold">Address List</h2>
                {renderAddressList()}
              </>
            )}

            {activeTab === "orders" && (
              <>
                <h2 className="mb-6 text-xl font-semibold">My Orders</h2>
                {renderAddressList()}
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
