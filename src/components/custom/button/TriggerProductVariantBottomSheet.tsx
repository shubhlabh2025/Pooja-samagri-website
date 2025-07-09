import { useState } from "react";
import type { TriggerProductVariantBottomSheetProps } from "@/interfaces/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import ProductVariantBottomSheet from "@/components/bottomsheet/ProductVariantBottomSheet";
import { Button } from "@/components/ui/button";
import {
  useGetCartItemsQuery,
  useUpdateCartItemMutation,
} from "@/features/cart/cartAPI";
import { useAppSelector } from "@/app/hooks";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import LoginDialog from "@/components/dialog/LoginDialog";

const TriggerProductVariantBottomSheet = ({
  product,
}: TriggerProductVariantBottomSheetProps) => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const { data: cartData = { data: [] } } = useGetCartItemsQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [updateCartItem] = useUpdateCartItemMutation();

  const handleDecreaseProductQuantity = async (productId: string) => {
    const variantInCart = cartData.data.find(
      (item) => item.variant.product_id === productId,
    );
    if (!variantInCart) return;

    await updateCartItem({
      productVariantId: variantInCart.product_variant_id,
      body: { action: "decrease" },
    });
  };

  let totalProductsInCart = 0;
  let variantsInCartCount = 0;

  totalProductsInCart = product.product_variants.reduce((acc, variant) => {
    const item = cartData.data.find(
      (ci) => ci.variant.id === variant.id && !ci.variant.out_of_stock,
    );
    if (item) {
      variantsInCartCount++;
      return acc + item.quantity;
    }
    return acc;
  }, 0);

  const moreThanOneVariantInCart = variantsInCartCount > 1;

  const AddButton = () => (
    <DrawerTrigger
      className="shadow-button-shadow w-full rounded-[8px] border border-[#02060c26] py-1.5 text-sm leading-[18px] font-semibold -tracking-[0.35px] text-[#ff5200] transition-all duration-150 ease-in-out hover:border-transparent hover:bg-[#ff5200] hover:text-white"
      onClick={() => setOpen(true)}
    >
      Add
    </DrawerTrigger>
  );

  const MinusButton = () =>
    moreThanOneVariantInCart ? (
      <DrawerTrigger
        className="h-fit cursor-pointer rounded-l-[8px] rounded-r-none border-none px-2 py-1.5 leading-[1.125rem] font-semibold tracking-[-0.35px] text-[#1ba672] shadow-none transition-colors duration-150 group-hover:bg-inherit hover:bg-[#02060c26] hover:text-[#1ba672]"
        onClick={() => setOpen(true)}
      >
        -
      </DrawerTrigger>
    ) : (
      <Button
        variant="outline"
        className="h-fit cursor-pointer rounded-l-[8px] rounded-r-none border-none px-2 py-1.5 leading-[1.125rem] font-semibold tracking-[-0.35px] text-[#1ba672] shadow-none transition-colors duration-150 group-hover:bg-inherit hover:bg-[#02060c26] hover:text-[#1ba672]"
        onClick={() => handleDecreaseProductQuantity(product.id)}
      >
        -
      </Button>
    );

  const PlusButton = () => (
    <DrawerTrigger
      className="flex h-fit cursor-pointer items-center justify-center rounded-l-none rounded-r-[8px] border-none px-2 py-1.5 leading-[1.125rem] font-semibold tracking-[-0.35px] text-[#1ba672] transition-colors duration-150 group-hover:bg-inherit hover:bg-[#02060c26] hover:text-[#1ba672]"
      onClick={() => setOpen(true)}
    >
      +
    </DrawerTrigger>
  );

  const QuantityDisplay = () => (
    <DrawerTrigger
      className="group flex flex-1 cursor-pointer justify-center hover:bg-[#02060c26]"
      onClick={() => setOpen(true)}
    >
      <p className="px-2 py-1.5 text-sm leading-[1.125rem] font-semibold tracking-[-0.35px] text-[#1ba672] shadow-none">
        {totalProductsInCart}
      </p>
    </DrawerTrigger>
  );

  if (!isAuthenticated) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={"outline"}
            className="shadow-button-shadow h-fit w-full rounded-[8px] border border-[#02060c26] p-0 py-1.5 text-sm leading-[18px] font-semibold -tracking-[0.35px] text-[#ff5200] transition-all duration-150 ease-in-out hover:border-transparent hover:bg-[#02060c26] hover:text-[#ff5200]"
          >
            Add
          </Button>
        </DialogTrigger>
        <LoginDialog />
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {totalProductsInCart === 0 ? (
        <AddButton />
      ) : (
        <div className="flex h-fit w-full items-center justify-between rounded-lg border border-[#02060c26] p-0">
          <MinusButton />
          <QuantityDisplay />
          <PlusButton />
        </div>
      )}
      <ProductVariantBottomSheet productVariants={product.product_variants} />
    </Drawer>
  );
};

export default TriggerProductVariantBottomSheet;
