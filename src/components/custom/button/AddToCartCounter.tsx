import type { AddToCartCounterProps } from "@/interfaces/button";
import { Button } from "@/components/ui/button";
import {
  useAddToCartMutation,
  useGetCartItemsQuery,
  useUpdateCartItemMutation,
} from "@/features/cart/cartAPI";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import LoginDialog from "@/components/dialog/LoginDialog";
import { useAppSelector } from "@/app/hooks";

const AddToCartCounter = ({ productVariant }: AddToCartCounterProps) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const { data: cartData = { data: [] } } = useGetCartItemsQuery(undefined, {
    skip: !isAuthenticated,
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

  return quantity == 0 ? (
    <Button
      variant={"outline"}
      className="shadow-button-shadow h-fit w-full rounded-[8px] border border-[#02060c26] p-0 py-1.5 text-sm leading-[18px] font-semibold -tracking-[0.35px] text-[#ff5200] transition-all duration-150 ease-in-out hover:border-transparent hover:bg-[#02060c26] hover:text-[#ff5200]"
      onClick={() => {
        handleAddItemToCart(productVariant.id);
      }}
    >
      Add
    </Button>
  ) : (
    <div className="flex h-fit w-full items-center justify-between rounded-[8px] border border-[#02060c26] p-0">
      <Button
        variant="outline"
        className="h-fit cursor-pointer rounded-l-[8px] rounded-r-none border-none px-2 py-1.5 leading-[1.125rem] font-semibold tracking-[-0.35px] text-[#1ba672] shadow-none transition-colors duration-150 group-hover:bg-inherit hover:bg-[#02060c26] hover:text-[#1ba672]"
        onClick={() => {
          handleDecreaseProductQantity(productVariant.id);
        }}
      >
        -
      </Button>

      <div className="group flex flex-1 justify-center hover:bg-[#02060c26]">
        <p className="cursor-default px-2 py-1.5 text-sm leading-[1.125rem] font-semibold tracking-[0.35px] text-[#1ba672] shadow-none">
          {quantity}
        </p>
      </div>

      <Button
        variant="outline"
        className="h-fit cursor-pointer rounded-l-none rounded-r-[8px] border-none px-2 py-1.5 leading-[1.125rem] font-semibold tracking-[-0.35px] text-[#1ba672] transition-colors duration-150 group-hover:bg-inherit hover:bg-[#02060c26] hover:text-[#1ba672]"
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
