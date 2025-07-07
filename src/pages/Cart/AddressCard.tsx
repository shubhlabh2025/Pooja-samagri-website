import type { AddressCardProps } from "@/interfaces/cart";

const AddressCard = ({
  selectedAddress,
  handleAdressDrawerOpen,
}: AddressCardProps) => {
  return (
    <div className="shadow-cart-card mb-1 flex w-full flex-col gap-4 rounded-lg bg-white p-3">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[16px] leading-[21px] font-medium tracking-[-0.4px]">
            Delivery Address
          </p>
          <button
            className="cursor-pointer text-sm font-semibold text-[#d96d2a]"
            onClick={handleAdressDrawerOpen}
          >
            CHANGE
          </button>
        </div>
        <div className="border-b border-dashed border-[#02060c26]"></div>
      </div>
      {selectedAddress ? (
        <div className="flex flex-col gap-3">
          <p className="text-[14px] leading-[18px] font-semibold text-[#02060C]">
            {selectedAddress.name || "Default Address"}
          </p>
          <p className="text-[12px] leading-[16px] font-normal text-[#02060C73]">
            {selectedAddress.address_line1}, {selectedAddress.address_line2}
          </p>
          <p className="text-[12px] leading-[16px] font-normal text-[#02060C73]">
            {selectedAddress.city}, {selectedAddress.state} -{" "}
            {selectedAddress.pincode}
          </p>
          <p className="text-[12px] leading-[16px] font-normal text-[#02060C73]">
            {selectedAddress.phone_number}
          </p>
        </div>
      ) : (
        <p className="text-[14px] leading-[18px] font-normal text-[#02060C73]">
          No address selected. Please select an address to proceed.
        </p>
      )}
    </div>
  );
};

export default AddressCard;
