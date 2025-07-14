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
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

const ProductDetailsCartButton = ({
  productVariant,
}: AddToCartCounterProps) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { data: cartData = { data: [] } } = useGetCartItemsQuery(undefined, {
    skip: !isAuthenticated,
  });

  const [addCartItem] = useAddToCartMutation();
  const [updateCartItem] = useUpdateCartItemMutation();

  const cartItem = cartData.data.find(
    (item) => item.product_variant_id === productVariant.id,
  );

  const [quantity, setQuantity] = useState(
    cartItem?.quantity && cartItem.quantity >= 1 ? cartItem.quantity : 1,
  );

  const handleIncreaseQuantity = () => {
    if (quantity < productVariant.max_quantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleAddToCart = async () => {
    const currentQuantity = cartItem?.quantity || 1;
    const diff = quantity - currentQuantity;

    if (diff === 0) return;

    const action = diff > 0 ? "increase" : "decrease";
    const absDiff = Math.abs(diff);

    if (!cartItem && quantity >= 1) {
      await addCartItem({ product_variant_id: productVariant.id });
      for (let i = 1; i < quantity; i++) {
        await updateCartItem({
          productVariantId: productVariant.id,
          body: { action: "increase" },
        });
      }
    }

    if (cartItem) {
      for (let i = 0; i < absDiff; i++) {
        await updateCartItem({
          productVariantId: productVariant.id,
          body: { action },
        });
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full rounded-lg border border-orange-300 text-orange-500 hover:bg-orange-50">
            Add
          </Button>
        </DialogTrigger>
        <LoginDialog />
      </Dialog>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[500px] justify-between">
      <div className="flex w-full flex-row gap-4">
        <div className="flex flex-1 items-center justify-between rounded-[8px] border border-[#02060c26]">
          <Button
            variant="outline"
            className="h-fit rounded-l-[8px] rounded-r-none border-none px-3 py-2 text-orange-500 hover:bg-[#02060c26]"
            onClick={handleDecreaseQuantity}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <div className="flex flex-1 justify-center px-2">
            <p className="text-sm font-semibold text-orange-500">{quantity}</p>
          </div>
          <Button
            variant="outline"
            className="h-fit rounded-l-none rounded-r-[8px] border-none px-3 py-2 text-orange-500 hover:bg-[#02060c26]"
            onClick={handleIncreaseQuantity}
            disabled={quantity >= productVariant.max_quantity}
          >
            +
          </Button>
        </div>

        <button
          onClick={handleAddToCart}
          className="flex flex-[2] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsCartButton;
