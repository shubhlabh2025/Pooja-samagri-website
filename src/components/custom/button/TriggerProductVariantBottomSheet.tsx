import type { CartItem } from "@/interfaces/cart";
import type { FetchState } from "@/types/fetchState";
import { useEffect, useState } from "react";
import rawData from "@/data/cartData.json";
import type { TriggerProductVariantBottomSheetProps } from "@/interfaces/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import ProductVariantBottomSheet from "@/components/bottomsheet/ProductVariantBottomSheet";
import { Button } from "@/components/ui/button";

const TriggerProductVariantBottomSheet = ({
  product,
}: TriggerProductVariantBottomSheetProps) => {
  const [cartData, setCartData] = useState<FetchState<CartItem[]>>({
    status: "loading",
  });

  useEffect(() => {
    const fetchCart = () => {
      try {
        const data = rawData;
        if (data.length === 0) {
          setCartData({ status: "empty" });
        } else {
          setCartData({ status: "success", data });
        }
      } catch (err) {
        if (err instanceof Error) {
          setCartData({ status: "error", error: err.message });
        } else {
          setCartData({ status: "error", error: "Unknown error occurred" });
        }
      }
    };

    fetchCart();
  }, []);

  let totalProductsInCart = 0;
  let moreThanOneVariantInCart = false;

  if (cartData.status === "success" && cartData.data.length > 0) {
    let variantsInCartCount = 0;

    totalProductsInCart = product.product_variants.reduce((acc, variant) => {
      const variantInCart = cartData.data.find(
        (item) => item.variant_id === variant.id,
      );
      if (variantInCart) {
        variantsInCartCount++;
        return acc + variantInCart.quantity;
      }
      return acc;
    }, 0);

    moreThanOneVariantInCart = variantsInCartCount > 1;
  }

  return totalProductsInCart === 0 ? (
    <Drawer>
      <DrawerTrigger className="shadow-button-shadow w-full rounded-[8px] border border-[#02060c26] py-1.5 text-sm leading-[18px] font-semibold -tracking-[0.35px] text-[#ff5200] transition-all duration-150 ease-in-out hover:border-transparent hover:bg-[#ff5200] hover:text-[#FFF]">
        Add
      </DrawerTrigger>
      <ProductVariantBottomSheet productVariants={product.product_variants} />
    </Drawer>
  ) : (
    <div className="flex h-fit w-full items-center justify-between rounded-lg border border-[#02060c26] p-0">
      {moreThanOneVariantInCart ? (
        <Drawer>
          <DrawerTrigger className="h-fit cursor-pointer rounded-l-[8px] rounded-r-none border-none px-2 py-1.5 leading-[1.125rem] font-semibold tracking-[-0.35px] text-[#1ba672] shadow-none transition-colors duration-150 group-hover:bg-inherit hover:bg-[#02060c26] hover:text-[#1ba672]">
            -
          </DrawerTrigger>

          <ProductVariantBottomSheet
            productVariants={product.product_variants}
          />
        </Drawer>
      ) : (
        <Button
          variant="outline"
          className="h-fit cursor-pointer rounded-l-[8px] rounded-r-none border-none px-2 py-1.5 leading-[1.125rem] font-semibold tracking-[-0.35px] text-[#1ba672] shadow-none transition-colors duration-150 group-hover:bg-inherit hover:bg-[#02060c26] hover:text-[#1ba672]"
          onClick={() => {
            console.log("Decrease quantity of product with ID:", product.id);
          }}
        >
          -
        </Button>
      )}

      <Drawer>
        <DrawerTrigger className="group flex flex-1 cursor-pointer justify-center hover:bg-[#02060c26]">
          <p className="px-2 py-1.5 text-sm leading-[1.125rem] font-semibold tracking-[-0.35px] text-[#1ba672] shadow-none">
            {totalProductsInCart}
          </p>
        </DrawerTrigger>
        <ProductVariantBottomSheet productVariants={product.product_variants} />
      </Drawer>
      <Drawer>
        <DrawerTrigger className="flex h-fit cursor-pointer items-center justify-center rounded-l-none rounded-r-[8px] border-none px-2 py-1.5 leading-[1.125rem] font-semibold tracking-[-0.35px] text-[#1ba672] transition-colors duration-150 group-hover:bg-inherit hover:bg-[#02060c26] hover:text-[#1ba672]">
          +
        </DrawerTrigger>

        <ProductVariantBottomSheet productVariants={product.product_variants} />
      </Drawer>
    </div>
  );
};

export default TriggerProductVariantBottomSheet;
