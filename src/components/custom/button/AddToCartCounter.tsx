import type { AddToCartCounterProps } from "@/interfaces/button";
import type { CartItem } from "@/interfaces/cart";
import type { FetchState } from "@/types/fetchState";
import rawData from "@/data/cartData.json";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const AddToCartCounter = ({ productVariant }: AddToCartCounterProps) => {
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

  let quantity = 0;

  if (cartData.status === "success" && cartData.data.length > 0) {
    const cartItem = cartData.data.find(
      (item) => item.variant_id === productVariant.id,
    );
    quantity = cartItem ? cartItem.quantity : 0;
  }

  return quantity == 0 ? (
    <Button
      variant={"outline"}
      className="shadow-button-shadow h-fit w-full rounded-[8px] border border-[#02060c26] p-0 py-1.5 text-sm leading-[18px] font-semibold -tracking-[0.35px] text-[#1ba672] transition-all duration-150 ease-in-out hover:border-transparent hover:bg-[#02060c26] hover:text-[#1ba672]"
    >
      Add
    </Button>
  ) : (
    <div className="flex h-fit w-full items-center justify-between rounded-[8px] border border-[#02060c26] p-0">
      <Button
        variant="outline"
        className="h-fit cursor-pointer rounded-l-[8px] rounded-r-none border-none px-2 py-1.5 leading-[1.125rem] font-semibold tracking-[-0.35px] text-[#1ba672] shadow-none transition-colors duration-150 group-hover:bg-inherit hover:bg-[#02060c26] hover:text-[#1ba672]"
        onClick={() => {
          console.log(
            "Decrease quantity of product with ID:",
            productVariant.product_id,
          );
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
          console.log(
            "Increase quantity of product with ID:",
            productVariant.product_id,
          );
        }}
      >
        +
      </Button>
    </div>
  );
};

export default AddToCartCounter;
