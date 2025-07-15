import type { CartItem } from "@/features/cart/cartAPI.type";
import type { CurrentlyUnavailableProps } from "@/interfaces/cart";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router";

const CurrentlyUnavailable = ({
  cartData,
  handleRemoveItem,
}: CurrentlyUnavailableProps) => {
  const navigate = useNavigate();

  return (
    <div className="shadow-cart-card mb-1 flex w-full flex-col gap-3 rounded-lg bg-white p-3">
      <div className="flex flex-col gap-3">
        <p className="text-[16px] leading-[21px] font-semibold tracking-[-0.4px] text-[#FA3C5A]">
          Currently unavailable
        </p>
        <div className="border-b border-dashed border-[#02060c26]"></div>
      </div>
      <div className="flex flex-col gap-4">
        {cartData.map((item: CartItem) => (
          <div
            key={item.product_variant_id}
            className="flex items-center justify-between gap-3"
          >
            <div
              className="flex gap-3"
              onClick={() => navigate(`../products/${item.variant.product_id}`)}
            >
              <img
                loading="lazy"
                src={item.variant.images[0]}
                alt="Product"
                className="aspect-square w-[50px] rounded-lg opacity-70"
              />
              <div className="w-full min-w-20">
                <p className="line-clamp-2 text-[13px] leading-[17px] font-medium -tracking-[0.33px] text-[#02060cbf] opacity-70">
                  {item.variant.name}
                </p>
                <p className="text-[12px] leading-[16px] font-normal whitespace-nowrap text-[#02060c73] opacity-70">
                  {item.variant.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="border-[#02060c26 ] shadow-sold-out-button rounded-[8px] border px-2.5 py-1.5 text-[12px] leading-[16px] tracking-[-0.3px] text-[#02060c73]">
                Sold out
              </p>
              <div className="flex flex-col items-end">
                <Trash2
                  className="cursor-pointer text-[#02060c73] transition-colors hover:text-red-500"
                  size={16}
                  onClick={() => handleRemoveItem(item.product_variant_id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentlyUnavailable;
