import AddToCartCounter from "@/components/custom/button/AddToCartCounter";
import type { CartItem } from "@/features/cart/cartAPI.type";
import type { ReviewOrderProps } from "@/interfaces/cart";
import CurrentlyUnavailable from "./CurrentlyUnavailable";
import { useRemoveCartItemMutation } from "@/features/cart/cartAPI";

const ReviewOrder = ({ cartData }: ReviewOrderProps) => {
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
              className="flex items-center justify-between gap-3"
            >
              <div className="flex gap-3">
                <img
                  src={item.variant.images[0]}
                  alt="Product"
                  className="aspect-square w-[50px] rounded-lg"
                />
                <div className="w-full min-w-20">
                  <p className="line-clamp-2 text-[13px] leading-[17px] font-medium -tracking-[0.33px] text-[#02060cbf]">
                    {item.variant.name}
                  </p>
                  <p className="text-[12px] leading-[16px] font-normal whitespace-nowrap text-[#02060c73]">
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
