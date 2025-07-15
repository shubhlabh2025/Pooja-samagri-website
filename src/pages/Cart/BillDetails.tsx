import type { BillDetailProps } from "@/interfaces/cart";
import guartIcon from "@/assets/guardIcon.svg";
import { useAppSelector } from "@/app/hooks";
import { selectConfiguration } from "@/features/configuration/configurationSlice";

const BillDetails = ({
  itemsTotal,
  discount,
  selectedCoupon,
}: BillDetailProps) => {
  const gstCharges: number = 0;
  let promoCodeDiscount = 0;

  const configState = useAppSelector(selectConfiguration);
  const deliveryCharges: number = configState.data?.data.delivery_charge ?? 0;

  if (selectedCoupon) {
    if (selectedCoupon.discount_type === "percentage") {
      promoCodeDiscount =
        ((itemsTotal - discount) * selectedCoupon.discount_value) / 100;
      if (selectedCoupon.max_discount_value) {
        promoCodeDiscount = Math.min(
          promoCodeDiscount,
          selectedCoupon.max_discount_value,
        );
      }
      if (selectedCoupon.min_discount_value) {
        promoCodeDiscount = Math.max(
          promoCodeDiscount,
          selectedCoupon.min_discount_value,
        );
      }
    } else if (selectedCoupon.discount_type === "fixed") {
      promoCodeDiscount = selectedCoupon.discount_value;
    }

    if (
      selectedCoupon.max_discount_value &&
      promoCodeDiscount > selectedCoupon.max_discount_value
    ) {
      promoCodeDiscount = selectedCoupon.max_discount_value;
    }
  }

  if (promoCodeDiscount > itemsTotal - discount) {
    promoCodeDiscount = itemsTotal - discount;
  }

  const totalAmount =
    itemsTotal - discount - promoCodeDiscount + deliveryCharges + gstCharges;

  return (
    <div className="flex flex-col gap-3">
      <p className="ml-1 text-[16px] font-semibold -tracking-[0.4px] whitespace-nowrap">
        Bill Details
      </p>
      <div className="shadow-cart-card mb-1 flex w-full flex-col gap-2 rounded-lg bg-white p-4">
        <div className="flex items-center justify-between">
          <p className="line-clamp-1 text-sm leading-4.5 font-extralight -tracking-[0.35px] text-[#02060c99]">
            Item Total
          </p>
          <p className="text-sm leading-4.5 font-normal -tracking-[0.35px] text-[#02060cbf]">
            ₹
            {new Intl.NumberFormat("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(itemsTotal)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="line-clamp-1 text-sm leading-4.5 font-extralight -tracking-[0.35px] text-[#02060c99]">
            Discount
          </p>
          <p className="text-sm leading-4.5 font-normal -tracking-[0.35px] whitespace-nowrap text-[#1ba672]">
            - ₹
            {new Intl.NumberFormat("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(discount)}
          </p>
        </div>

        {selectedCoupon && (
          <div className="flex items-center justify-between">
            <p className="line-clamp-1 text-sm leading-4.5 font-extralight -tracking-[0.35px] text-[#02060c99]">
              Promo Code Discount
            </p>
            <p className="text-sm leading-4.5 font-normal -tracking-[0.35px] whitespace-nowrap text-[#1ba672]">
              - ₹
              {new Intl.NumberFormat("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(promoCodeDiscount)}
            </p>
          </div>
        )}

        <div className="my-2 border-t border-dashed border-[#02060c26]" />

        <div className="flex items-center justify-between">
          <p className="line-clamp-1 text-sm leading-4.5 font-extralight -tracking-[0.35px] text-[#02060c99]">
            Delivery Partner Fee
          </p>
          {deliveryCharges === 0 ? (
            <p className="text-sm leading-4.5 font-normal -tracking-[0.35px] text-[#1ba672]">
              FREE
            </p>
          ) : (
            <p className="line-clamp-1 text-sm leading-4.5 font-normal -tracking-[0.35px] whitespace-nowrap text-[#02060cbf]">
              ₹
              {new Intl.NumberFormat("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(deliveryCharges)}
            </p>
          )}
        </div>

        <div className="my-2 border-t border-dashed border-[#02060c26]" />

        {/* <div className="flex items-center justify-between">
          <p className="line-clamp-1 text-sm leading-4.5 font-extralight -tracking-[0.35px] whitespace-nowrap text-[#02060c99]">
            GST and Charges
          </p>
          {gstCharges === 0 ? (
            <p className="text-sm leading-4.5 font-normal -tracking-[0.35px] text-[#1ba672]">
              FREE
            </p>
          ) : (
            <p className="text-sm leading-4.5 font-normal -tracking-[0.35px] text-[#02060cbf]">
              ₹
              {new Intl.NumberFormat("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(gstCharges)}
            </p>
          )}
        </div> */}

        {/* <div className="my-2 border-t border-dashed border-[#02060c26]" /> */}

        <div className="flex items-center justify-between">
          <p className="text-sm leading-4.5 font-semibold -tracking-[0.35px] text-[#02060ceb]">
            To Pay
          </p>
          <p className="text-sm leading-4.5 font-semibold -tracking-[0.35px] text-[#02060ceb]">
            ₹
            {new Intl.NumberFormat("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(totalAmount)}
          </p>
        </div>
        <div className="-mx-4 -mb-4 flex justify-center gap-2 rounded-b-lg bg-[#1ba672bf] px-2 py-1.5">
          <div className="flex aspect-square w-[20px] items-center justify-center p-[1px]">
            <img loading="lazy" src={guartIcon} alt="Guard Icon" className="" />
          </div>
          <p className="line-clamp-1 text-sm leading-4.5 font-normal -tracking-[0.35px] text-[#ffffffeb]">
            Trusted, authentic, safe, easy returns
          </p>
        </div>
      </div>
    </div>
  );
};

export default BillDetails;
