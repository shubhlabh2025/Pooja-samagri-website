import {
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import type { TriggerPaymentBottomSheetProps } from "@/interfaces/button";
import { ChevronRight, Wallet, X } from "lucide-react";

const PaymentBottomSheet = ({
  onSelectPaymentMethod,
}: TriggerPaymentBottomSheetProps) => {
  return (
    <DrawerContent className="flex flex-col px-3 pt-4 pb-8">
      <DrawerHeader className="mb-3 p-0">
        <DrawerTitle className="text-lg font-semibold text-[#02060C]">
          <div className="flex flex-row justify-between">
            <span> Choose a Payment Method</span>
            <DrawerClose asChild>
              <X
                size={24}
                color="white"
                className="rounded-[12px] bg-[#02060c26] p-[4px]"
              />
            </DrawerClose>
          </div>
        </DrawerTitle>
      </DrawerHeader>

      <div className="flex flex-col gap-3 overflow-auto">
        <div
          onClick={() => {
            onSelectPaymentMethod("cod");
          }}
          className="flex items-center justify-between rounded-xl border border-[#E9E9EB] bg-white px-3 py-3 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <Wallet className="h-5 w-5 text-orange-600" />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-[#02060C]">
                Cash on Delivery
              </p>
              <p className="max-w-[220px] truncate text-sm leading-tight text-gray-600">
                Pay to after the delivery
              </p>
            </div>
          </div>
          <ChevronRight className="text-gray-400" />
        </div>

        <div
          onClick={() => {
            onSelectPaymentMethod("online");
          }}
          className="flex items-center justify-between rounded-xl border border-[#E9E9EB] bg-white px-3 py-3 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <Wallet className="h-5 w-5 text-orange-600" />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-[#02060C]">Pay Online</p>
              <p className="max-w-[220px] truncate text-sm leading-tight text-gray-600">
                Pay using,UPI, Credit Card, Debit Card, Wallets etc
              </p>
            </div>
          </div>
          <ChevronRight className="text-gray-400" />
        </div>
      </div>
    </DrawerContent>
  );
};

export default PaymentBottomSheet;
