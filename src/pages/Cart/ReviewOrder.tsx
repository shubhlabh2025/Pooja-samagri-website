import AddToCartCounter from "@/components/custom/button/AddToCartCounter";
import type { CartItem } from "@/features/cart/cartAPI.type";
import type { ReviewOrderProps } from "@/interfaces/cart";

const ReviewOrder = ({
  cartData,
}: ReviewOrderProps) => {
  return (
    <div className="shadow-cart-card mb-1 flex w-full flex-col gap-4 rounded-lg bg-white p-4">
      {cartData.map((item: CartItem) => (
        <div
          key={item.product_variant_id}
          className="flex items-center justify-between gap-3"
        >
          <div className="flex gap-3">
            <img
              src={item.variant.image[0]}
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
            {/* <div className="flex h-fit items-center rounded-lg border border-[#02060c26] p-0">
              <Button
                variant="outline"
                className="h-fit cursor-pointer rounded-l-lg rounded-r-none border-none px-2 py-1.5 leading-[1.125rem] font-semibold tracking-[-0.35px] text-[#1ba672] shadow-none transition-colors duration-150 group-hover:bg-inherit hover:bg-[#02060c26] hover:text-[#1ba672]"
                onClick={() => {
                  handleDecreaseProductQantity(item.product_variant_id);
                }}
              >
                -
              </Button>

              <div className="group flex">
                <p className="cursor-default px-2 py-1.5 text-sm leading-[1.125rem] font-semibold tracking-[-0.35px] text-[#1ba672] shadow-none group-hover:bg-[#02060c26]">
                  {item.quantity}
                </p>
              </div>

              <Button
                variant="outline"
                className="h-fit cursor-pointer rounded-l-none rounded-r-lg border-none px-2 py-1.5 leading-[1.125rem] font-semibold tracking-[-0.35px] text-[#1ba672] transition-colors duration-150 group-hover:bg-inherit hover:bg-[#02060c26] hover:text-[#1ba672]"
                onClick={() => {
                  handleIncreaseProductQantity(item.product_variant_id);
                }}
              >
                +
              </Button>
            </div> */}
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
  );
};

export default ReviewOrder;
