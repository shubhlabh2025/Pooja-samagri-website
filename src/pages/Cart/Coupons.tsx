import { ChevronRight } from "lucide-react";
import priceTagSvg from "@/assets/priceTag.svg";

const Coupons = () => {
  return (
    <div className="shadow-cart-card mb-1 flex w-full flex-col gap-4 rounded-lg bg-white p-4">
      <p className="text-[12px] leading-4 font-semibold tracking-[1.5px] text-[#02060c73]">
        SAVING CORNER
      </p>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <div className="flex aspect-square w-[20px] items-center justify-center rounded-sm bg-amber-400 p-[3px]">
            <img src={priceTagSvg} alt="Icon" />
          </div>
          <p className="text-sm leading-4.5 font-normal -tracking-[0.35px] text-[#02060cbf]">
            Apply Coupon
          </p>
        </div>
        <ChevronRight size={20} className="text-[#02060c73] cursor-pointer" />
      </div>
    </div>
  );
};

export default Coupons;
