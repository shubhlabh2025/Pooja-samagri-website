import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ChevronRight, MapPin, X } from "lucide-react";
import type { TriggerAddressBottomSheetProps } from "@/interfaces/button";
import { useNavigate } from "react-router";

const AddressBottomSheet = ({
  addresses = [],
}: TriggerAddressBottomSheetProps) => {

  const navigate = useNavigate();
  return (
    <DrawerContent className="flex flex-col px-3 pt-4 pb-20">
      <DrawerHeader className="mb-3 p-0">
        <DrawerTitle className="text-lg font-semibold text-[#02060C]">
          <div className="flex flex-row justify-between">
            <span> Choose a delivery address</span>
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
        {addresses.map((address) => (
          <div
            key={address.id}
            className="flex items-center justify-between rounded-xl border border-[#E9E9EB] bg-white px-3 py-3 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <MapPin className="h-5 w-5 text-orange-600" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-[#02060C]">
                  {address.name}
                </p>
                <p className="max-w-[220px] truncate text-sm leading-tight text-gray-600">
                  {address.address_line1}
                </p>
              </div>
            </div>
            <ChevronRight className="text-gray-400" />
          </div>
        ))}
      </div>

      <DrawerFooter className="fixed bottom-4 left-0 mt-auto w-full p-0 px-3">
          <button className="w-full rounded-xl bg-[#ff5200] py-3 text-sm font-semibold text-white transition-transform hover:scale-[0.98]"
          onClick={()=>{
            navigate("/address")
          }}
          >
            Add Address
          </button>
      </DrawerFooter>
    </DrawerContent>
  );
};

export default AddressBottomSheet;
