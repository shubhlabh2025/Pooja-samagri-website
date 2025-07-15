import type { AddToCartCounterProps } from "@/interfaces/button";
import { Button } from "@/components/ui/button";
import {
  useAddToCartMutation,
  useGetCartItemsQuery,
  useUpdateCartItemMutation,
} from "@/features/cart/cartAPI";
import { ShoppingCart } from "lucide-react";
// import { useAppSelector } from "@/app/hooks";

const AddToCartCounter = ({ productVariant }: AddToCartCounterProps) => {
  // const { isAuthenticated } = useAppSelector((state) => state.auth);

  const { data: cartData = { data: [] } } = useGetCartItemsQuery(undefined, {
    // skip: !isAuthenticated,
  });
  const [
    updateCartItem,
    // { isLoading: updatingCartLoading, isError: updatingCartError },
  ] = useUpdateCartItemMutation();
  const [
    addCartItem,
    // { isLoading: updatingCartLoading, isError: updatingCartError },
  ] = useAddToCartMutation();

  let quantity = 0;

  const cartItem = cartData.data.find(
    (item) => item.product_variant_id === productVariant.id,
  );
  quantity = cartItem ? cartItem.quantity : 0;

  const handleAddItemToCart = async (productId: string) => {
    await addCartItem({
      product_variant_id: productId,
    });
  };

  const handleDecreaseProductQantity = async (productId: string) => {
    await updateCartItem({
      productVariantId: productId,
      body: {
        action: "decrease",
      },
    });
  };
  const handleIncreaseProductQantity = async (productId: string) => {
    await updateCartItem({
      productVariantId: productId,
      body: {
        action: "increase",
      },
    });
  };

  // if (!isAuthenticated) {
  //   return (
  //     <Dialog>
  //       <DialogTrigger asChild>
  //         <Button
  //           variant={"outline"}
  //           className="shadow-button-shadow h-fit w-full rounded-[8px] border border-[#02060c26] p-0 py-1.5 text-sm leading-[18px] font-semibold -tracking-[0.35px] text-[#ff5200] transition-all duration-150 ease-in-out hover:border-transparent hover:bg-[#02060c26] hover:text-[#ff5200]"
  //         >
  //           Add
  //         </Button>
  //       </DialogTrigger>
  //       <LoginDialog />
  //     </Dialog>
  //   );
  // }

  return quantity == 0 ? (
    <button
      onClick={() => {
        handleAddItemToCart(productVariant.id);
      }}
      className="flex flex-[2] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl lg:mr-8 lg:ml-8"
    >
      <ShoppingCart size={18} />
      Add to Cart
    </button>
  ) : (
    <div className="flex h-fit w-full items-center justify-between rounded-full border border-[#02060c26] p-0 lg:mr-8 lg:ml-8">
      <Button
        variant="outline"
        className="h-fit cursor-pointer rounded-l-full rounded-r-none border-none px-4 py-3 leading-[1.125rem] font-semibold tracking-[-0.35px] text-orange-500 shadow-none transition-colors duration-150 group-hover:bg-inherit hover:bg-[#02060c26] hover:text-orange-500"
        onClick={() => {
          handleDecreaseProductQantity(productVariant.id);
        }}
      >
        -
      </Button>

      <div className="group flex flex-1 justify-center hover:bg-[#02060c26]">
        <p className="cursor-default px-3 py-3 text-sm leading-[1.125rem] font-semibold tracking-[0.35px] text-orange-500 shadow-none">
          {quantity}
        </p>
      </div>

      <Button
        variant="outline"
        className="h-fit cursor-pointer rounded-l-none rounded-r-full border-none px-4 py-3 leading-[1.125rem] font-semibold tracking-[-0.35px] text-orange-500 transition-colors duration-150 group-hover:bg-inherit hover:bg-[#02060c26] hover:text-orange-500"
        onClick={() => {
          handleIncreaseProductQantity(productVariant.id);
        }}
      >
        +
      </Button>
    </div>
  );
};

export default AddToCartCounter;
