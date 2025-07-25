import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import type { ProductVaraintBottomSheetProps } from "@/interfaces/bottom-sheet";
import { Separator } from "@/components/ui/separator";
import AddToCartCounter from "../custom/button/AddToCartCounter";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useGetCartItemsQuery } from "@/features/cart/cartAPI";
import { useAppSelector } from "@/app/hooks";

const ProductVariantBottomSheet = ({
  productVariants,
}: ProductVaraintBottomSheetProps) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const { data: cartData = { data: [] } } = useGetCartItemsQuery(undefined, {
    skip: !isAuthenticated,
  });

  const productId = productVariants[0].product_id;
  const valueOfProductInCart = cartData.data.reduce((acc, item) => {
    if (item.variant.product_id === productId) {
      return acc + item.quantity * item.variant.price;
    }
    return acc;
  }, 0);

  return (
    <DrawerContent className="flex flex-col gap-6 px-3 pt-6 pb-4">
      <DrawerHeader className="p-0">
        <DrawerTitle className="text-lg leading-5.5 font-semibold -tracking-[0.45px] text-[#02060cbf]">
          {productVariants[0].name}
        </DrawerTitle>
        <DialogDescription className="none"></DialogDescription>
        <div className="flex max-h-[350px] flex-col gap-3 overflow-y-scroll">
          {productVariants.map((variant) => (
            <div
              key={variant.id}
              className={`shadow-variant-card flex justify-between gap-3 rounded-[12px] p-2 ${
                variant.out_of_stock === true ? "opacity-50" : ""
              }`}
            >
              <div className="flex basis-[40%] items-center gap-1">
                <img
                  loading="lazy"
                  src={variant.images[0]}
                  alt={variant.name}
                  className="aspect-square w-16 rounded-[12px]"
                />
                <p className="line-clamp-2 text-sm leading-4.5 font-normal -tracking-[0.35px] break-words text-[#02060cbf]">
                  {variant.display_label}
                </p>
              </div>
              <div className="h-auto">
                <Separator orientation="vertical" className="w-[1px]] h-auto" />
              </div>
              <div className="flex flex-1 items-center justify-between">
                <div className="flex gap-1">
                  <p className="text-sm leading-4.5 font-semibold -tracking-[0.35px] text-[#02060cbf]">
                    ₹{variant.price}
                  </p>
                  {variant.price < variant.mrp && (
                    <p className="text-[13px] leading-[17px] -tracking-[0.33px] text-[#02060c4d] line-through">
                      ₹{variant.mrp}
                    </p>
                  )}
                </div>
                <div className="flex min-w-19">
                  {variant.out_of_stock === true ? (
                    <div className="shadow-button-shadow h-fit w-full rounded-[8px] border border-[#02060c26] p-0 py-1.5 text-center text-sm leading-[18px] font-semibold -tracking-[0.35px] text-[#ff5200]">
                      Sold Out
                    </div>
                  ) : (
                    <AddToCartCounter productVariant={variant} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DrawerHeader>
      <DrawerFooter className="p-0">
        <DrawerClose asChild>
          <div className="flex justify-between rounded-[12px] bg-[#1ba672] px-4 py-3 transition-transform hover:scale-[0.95]">
            <div className="flex">
              <p className="text-[16px] leading-5 font-semibold -tracking-[0.4px] text-white">
                item total :
              </p>
              <p className="ml-2 text-[16px] leading-5 font-semibold -tracking-[0.4px] text-white">
                ₹{valueOfProductInCart}
              </p>
            </div>
            <p className="text-[16px] leading-5 font-semibold -tracking-[0.4px] text-white">
              Confirm
            </p>
          </div>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
};

export default ProductVariantBottomSheet;
