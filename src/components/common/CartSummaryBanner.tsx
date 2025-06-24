import { useState } from "react";
import { ChevronUp, X } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router";
import ReviewOrder from "@/pages/Cart/ReviewOrder";
import { useGetCartItemsQuery } from "@/features/cart/cartAPI";

const CartSummaryBanner = () => {
  const {
    data: cartData = { data: [] },
    isError,
    isLoading,
  } = useGetCartItemsQuery();

  const [isExpanded, setIsExpanded] = useState(false);

  if (isError) {
    return <div>Error loading cart data</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (cartData.data.length === 0) {
    return <div></div>;
  }

  return (
    <div className="sticky bottom-0 z-50">
      <div className="h-[70px]" />
      <div
        className={`fixed inset-0 z-20 h-[100vh] w-full bg-[#282c3f]/60 transition-opacity duration-300 ease-out ${
          isExpanded ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsExpanded(false)}
      />
      <div className="shadow-top-lg fixed right-0 bottom-0 left-0 z-30 flex w-full flex-col rounded-tl-2xl rounded-tr-2xl bg-white">
        <div
          className={`rounded-tl-2xl rounded-tr-2xl bg-[#f0f0f5] transition-all duration-300 ease-in-out ${
            isExpanded ? "max-h-[60vh] opacity-100" : "max-h-0 opacity-0"
          } flex flex-col overflow-hidden`}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between bg-[#f0f0f5] px-4 pt-4 pb-3 text-[16px] leading-[21px] font-semibold -tracking-[0.4px] text-[#02060cbf]">
            <div>Review Items</div>
            <X
              onClick={() => setIsExpanded(false)}
              size={24}
              color="white"
              className="rounded-[12px] bg-[#02060c26] p-[4px]"
            />
          </div>

          {/* Scrollable content */}
          <div className="hide-scrollbar flex-1 overflow-y-auto px-4 pb-4">
            <ReviewOrder cartData={cartData.data} />
          </div>
        </div>
        <div className="flex w-full justify-between gap-1 px-4 pt-3 pb-5">
          <div
            className="flex cursor-pointer gap-2"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            <div className="flex">
              {cartData.data.length >= 1 && (
                <div className="flex items-center">
                  {cartData.data
                    .slice(
                      0,
                      cartData.data.length === 2
                        ? 1
                        : cartData.data.length >= 3
                          ? 2
                          : 0,
                    )
                    .map((item, index) => (
                      <div
                        key={item.product_variant_id}
                        className={`h-9.5 min-h-9.5 w-9.5 min-w-9.5 rounded-[8px] border border-[#02060c26] bg-white transition-[margin-left] duration-300 ease-in-out ${
                          index === 1 ? "-ml-7.5" : ""
                        }`}
                      >
                        {/* Placeholder content if needed */}
                      </div>
                    ))}

                  {/* Always render the last item */}
                  <img
                    src={
                      cartData.data[cartData.data.length - 1].variant.image[0]
                    }
                    alt="Last Cart Item"
                    className={`h-9.5 min-h-9.5 w-9.5 min-w-9.5 rounded-[8px] border border-[#02060c26] bg-white ${
                      cartData.data.length > 1 ? "-ml-7.5" : ""
                    }`}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex h-fit gap-1">
                <p className="text-sm leading-4.5 font-semibold -tracking-[0.35px] text-[#02060cbf]">
                  {cartData.data.length} Items
                </p>
                <ChevronUp
                  height={18}
                  width={19}
                  strokeWidth={2.5}
                  color="#ff5200"
                  className={`transition-transform duration-300 ease-in-out ${isExpanded ? "rotate-180" : "rotate-0"}`}
                />
              </div>
              <p className="line-clamp-1 overflow-hidden text-[12px] leading-4 font-semibold -tracking-[0.3px] text-ellipsis text-[#1ba672]">
                ₹
                {cartData.data
                  .reduce((acc, item) => {
                    const moneySaved =
                      (item.variant.mrp - item.variant.price) * item.quantity;
                    return acc + moneySaved;
                  }, 0)
                  .toLocaleString("en-IN")}{" "}
                saved, more coming up!
              </p>
            </div>
          </div>
          <Link to="/cart">
            <Button className="h-[38px] rounded-[12px] border-none bg-[#1aa672] px-[13px] py-[9px] text-[16px] leading-[21px] font-semibold -tracking-[0.4px] text-white transition duration-100 ease-in hover:scale-[0.95] hover:bg-[#1aa672]">
              <p className="w-full text-center text-[16px] leading-[21px] font-semibold -tracking-[0.4px] text-white">
                Go to Cart
              </p>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartSummaryBanner;
