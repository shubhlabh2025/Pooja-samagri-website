import { ChevronRight, Trash2 } from "lucide-react";
import priceTagSvg from "@/assets/priceTag.svg";
import type { CouponsProps } from "@/interfaces/coupons";
import percentageIcon from "@/assets/percentoff.svg";
import flatIcon from "@/assets/flatoff.svg";
import { useState } from "react";
// import type { Coupon } from "@/features/coupon/couponAPI.type";

const Coupons = ({
  couponsData,
  itemsTotal,
  discount,
  selectedCoupon,
  handleCouponChange,
}: CouponsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const totalAmount = itemsTotal - discount;

  const filterCoupons = couponsData.filter(
    (coupon) => !selectedCoupon || coupon.id != selectedCoupon.id,
  );

  return (
    <div className="shadow-cart-card mb-1 flex w-full flex-col gap-4 rounded-lg bg-white p-4">
      <p className="text-[12px] leading-4 font-semibold tracking-[1.5px] text-[#02060c73]">
        SAVING CORNER
      </p>
      <div className="flex flex-col">
        <div
          className="flex cursor-pointer justify-between"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex gap-3">
            <div className="flex aspect-square w-[20px] items-center justify-center rounded-sm bg-amber-400 p-[3px]">
              <img loading="lazy" src={priceTagSvg} alt="Icon" />
            </div>
            <p className="text-sm leading-4.5 font-normal -tracking-[0.35px] text-[#02060cbf]">
              Apply Coupon
            </p>
          </div>
          <ChevronRight
            size={20}
            className={`cursor-pointer text-[#02060c73] transition-transform duration-300 ease-in-out ${isExpanded ? "rotate-90" : ""}`}
          />
        </div>
        {selectedCoupon && (
          <div
            key={selectedCoupon.id}
            className="animate-coupon-appear mt-4 flex items-center justify-between rounded-lg border bg-[#f0f0f5] px-3 py-2 transition-all duration-200 ease-in-out"
          >
            <p className="text-sm font-normal text-[#02060c73]">
              Coupon Code:{" "}
              <span className="font-semibold">{selectedCoupon.offer_code}</span>
            </p>
            <div className="flex items-center gap-3">
              <p className="text-sm font-semibold text-[#02060c73]">
                {selectedCoupon.discount_type === "percentage"
                  ? `${selectedCoupon.discount_value}% off`
                  : `₹${new Intl.NumberFormat("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(selectedCoupon.discount_value)} off`}
              </p>
              <button
                className="flex cursor-pointer items-center text-sm leading-4.5 font-semibold tracking-[-0.35px] text-[#FF5200]"
                onClick={() => handleCouponChange(null)}
              >
                <Trash2 size={16} className="inline-block" />
              </button>
            </div>
          </div>
        )}
        <div
          className={`overflow-y-auto transition-all duration-300 ease-in-out ${
            isExpanded
              ? "mt-4 max-h-80 scale-100 p-3 opacity-100"
              : "max-h-0 scale-95 opacity-0"
          } flex flex-col gap-3 rounded-lg bg-[#f0f0f5]`}
        >
          {filterCoupons.length === 0 && (
            <div className="flex flex-col items-center justify-center">
              <p className="text-sm leading-4.5 font-normal tracking-[-0.35px] text-[#02060c73]">
                No{selectedCoupon ? " more " : " "}coupons available.
              </p>
            </div>
          )}
          {filterCoupons.map((coupon) => (
            <div
              key={coupon.id}
              className="flex flex-col gap-4 rounded-lg bg-white p-4"
            >
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      loading="lazy"
                      src={
                        coupon.discount_type == "percentage"
                          ? percentageIcon
                          : flatIcon
                      }
                      alt="Coupon"
                      className={`aspect-square w-[23px] rounded-[8px] bg-[#FF5200] p-[3px]`}
                    />
                    <p className="text-lg leading-5.5 font-normal tracking-[-0.45px] text-[#02060cbf]">
                      {coupon.offer_code}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                      disabled={totalAmount < coupon.min_order_value}
                      className={`cursor-pointer text-sm leading-4.5 font-semibold tracking-[-0.35px] ${totalAmount >= coupon.min_order_value ? "text-[#FF5200]" : "text-[#e2e2e7]"} `}
                      onClick={() => handleCouponChange(coupon)}
                    >
                      APPLY
                    </button>
                  </div>
                </div>
                {totalAmount < coupon.min_order_value && (
                  <p className="line-clamp-2 text-sm leading-4.5 font-normal tracking-[-0.35px] text-[#fa3c5a]">
                    Add items worth ₹{coupon.min_order_value} or more to avail
                    this offer.
                  </p>
                )}
              </div>
              <div className="border-t border-dashed border-[rgba(2,6,12,0.15)]"></div>
              <p className="text-sm leading-4.5 font-normal tracking-[0.35px] text-[#02060ceb]">
                {coupon.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Coupons;
