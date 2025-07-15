import AddToCartCounter from "@/components/custom/button/AddToCartCounter";
import type { CartItem } from "@/features/cart/cartAPI.type";
import type { ReviewOrderProps } from "@/interfaces/cart";
import CurrentlyUnavailable from "./CurrentlyUnavailable";
import { useRemoveCartItemMutation } from "@/features/cart/cartAPI";
import { useNavigate } from "react-router";

const ReviewOrder = ({ cartData }: ReviewOrderProps) => {
  const navigate = useNavigate();
  const [
    removeCartItem,
    // { isLoading: removeCartItemLoading, isError: removeCartItemError },
  ] = useRemoveCartItemMutation();

  const handleRemoveItem = async (productVariantId: string) => {
    await removeCartItem(productVariantId);
  };
  const soldOutItems = cartData.filter(
    (item: CartItem) => item.variant.out_of_stock,
  );
  const availableItems = cartData.filter(
    (item: CartItem) => !item.variant.out_of_stock,
  );
  return (
    <div className="flex flex-col gap-3">
      {availableItems.length > 0 && (
        <div className="shadow-cart-card mb-1 flex w-full flex-col gap-4 rounded-lg bg-white p-3">
          {availableItems.map((item: CartItem) => (
            <div
              key={item.product_variant_id}
              className="flex cursor-pointer items-center justify-between gap-3"
            >
              <div
                className="flex min-w-0 gap-3"
                onClick={() => navigate(`/products/${item.variant.product_id}`)}
              >
                <img
                  loading="lazy"
                  src={item.variant.images[0]}
                  alt="Product"
                  className="aspect-square w-[50px] rounded-lg"
                />
                <div className="flex min-w-0 flex-col">
                  <p className="line-clamp-2 max-w-fit text-[13px] leading-[17px] font-medium -tracking-[0.33px] break-words text-ellipsis text-[#02060cbf]">
                    {item.variant.name}
                  </p>
                  <p className="line-clamp-1 max-w-fit text-[12px] leading-[16px] font-normal text-ellipsis whitespace-nowrap text-[#02060c73]">
                    {item.variant.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <AddToCartCounter productVariant={item.variant} />
                <div className="flex min-w-16 flex-col items-end">
                  <p className="text-[10px] leading-[13px] font-semibold -tracking-[0.25px] text-[#02060c73] line-through">
                    ₹
                    {new Intl.NumberFormat("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(item.quantity * item.variant.mrp)}
                  </p>

                  <p className="text-[14px] leading-[18px] font-normal -tracking-[0.25px] text-[#02060cbd]">
                    ₹
                    {new Intl.NumberFormat("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(item.quantity * item.variant.price)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {soldOutItems.length > 0 && (
        <CurrentlyUnavailable
          cartData={soldOutItems}
          handleRemoveItem={handleRemoveItem}
        />
      )}
    </div>
  );
};

export default ReviewOrder;
