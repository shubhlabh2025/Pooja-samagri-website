import { MapPin } from "lucide-react";

export interface AdressChangeProps {
  onAdressChange: () => void;
  address: string;
  onLocationConfirm: () => void;
}

const DetailAddressComponent = ({
  onAdressChange,
  address,
  onLocationConfirm,
}: AdressChangeProps) => {
  return (
    <div className="border-t border-gray-200 bg-white p-4 shadow-md">
      <p className="mb-[16px] text-xs tracking-wider text-gray-500 uppercase">
        Select Delivery Location
      </p>

      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-2">
          <MapPin className="mt-1 h-5 w-5 text-black" />
          <div>
            <p className="text-[18px] font-semibold text-black">
              {" "}
              {address?.split(",")[0] || ""}
            </p>
            <p className="text-[14px] leading-tight text-gray-600">{address}</p>
          </div>
        </div>
        <button
          className="rounded-md border border-orange-100 px-3 py-1 text-sm font-semibold text-orange-500 hover:bg-orange-50"
          onClick={onAdressChange}
        >
          Change
        </button>
      </div>

      <button
        className="mt-4 w-full rounded-md bg-orange-500 py-3 text-sm font-semibold text-white uppercase hover:bg-orange-600"
        onClick={onLocationConfirm}
      >
        Confirm Location
      </button>
    </div>
  );
};

export default DetailAddressComponent;
