import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useState } from "react";
import { X } from "lucide-react";
import type { CompleteAddressProps } from "@/interfaces/completeAddressProps";



const AddressDetailBottomSheet = ({
  onSave,
}: {
  onSave: (data: CompleteAddressProps) => void;
}) => {
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [landmark, setLandmark] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = () => {
    onSave({
      addressLine1,
      addressLine2,
      landmark,
      phone_number: phoneNumber,
      name,
    });
  };

  return (
    <DrawerContent className="flex flex-col bg-white px-4 pt-4 pb-24">
      <DrawerHeader className="mb-4 p-0">
        <DrawerTitle className="text-lg font-semibold text-[#02060C]">
          <div className="flex items-center justify-between">
            <span>Choose a delivery address</span>
            <DrawerClose asChild>
              <X
                size={24}
                className="rounded-lg bg-[#02060c26] p-[4px] text-white"
              />
            </DrawerClose>
          </div>
        </DrawerTitle>
      </DrawerHeader>

      <div className="flex flex-col gap-4">
        <input
          value={addressLine1}
          onChange={(e) => setAddressLine1(e.target.value)}
          placeholder="HOUSE / FLAT / FLOOR NO."
          className="border-b border-gray-300 bg-transparent p-2 text-sm outline-none"
        />
        <input
          value={addressLine2}
          onChange={(e) => setAddressLine2(e.target.value)}
          placeholder="APARTMENT / ROAD / AREA (OPTIONAL)"
          className="border-b border-gray-300 bg-transparent p-2 text-sm outline-none"
        />
        <input
          value={landmark}
          onChange={(e) => setLandmark(e.target.value)}
          placeholder="LANDMARK, ADDITIONAL INFO, ETC. (OPTIONAL)"
          className="border-b border-gray-300 bg-transparent p-2 text-sm outline-none"
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Receiver's Name"
          className="border-b border-gray-300 bg-transparent p-2 text-sm outline-none"
        />
        <input
          value={phoneNumber}
          type="number"
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Receiver's Number"
          className="border-b border-gray-300 bg-transparent p-2 text-sm outline-none"
        />
      </div>

      <DrawerFooter className="fixed bottom-4 left-0 w-full px-4">
        <DrawerClose asChild>
          <button
            onClick={handleSubmit}
            className="w-full rounded-lg bg-[#f4a28c] py-3 text-sm font-bold tracking-wide text-white"
          >
            SAVE AND PROCEED
          </button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
};

export default AddressDetailBottomSheet;
