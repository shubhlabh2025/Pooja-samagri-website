import { ChevronLeft, EllipsisVertical, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router";
import rawData from "@/data/cartData.json";
import type { CartItem } from "@/interfaces/cart";
import { useEffect, useState } from "react";
import type { FetchState } from "@/types/fetchState";
import CommonLoader from "@/components/loader/CommonLoader";
import SomethingWentWrong from "@/components/error/SomethingWentWrong";
import EmptyCart from "./EmptyCart";
import ReviewOrder from "./ReviewOrder";
import BillDetails from "./BillDetails";
import Coupons from "./Coupons";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const [cartData, setCartData] = useState<FetchState<CartItem[]>>({
    status: "loading",
  });

  const handleIncreaseProductQantity = (productId: string) => {
    console.log("Increase quantity of product with ID:", productId);
  };
  const handleDecreaseProductQantity = (productId: string) => {
    console.log("Decrease quantity of product with ID:", productId);
  };

  useEffect(() => {
    const fetchCart = async () => {
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

    setTimeout(fetchCart, 500);
  }, []);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-col">
      <div className="sticky top-0 flex items-center justify-between bg-white px-2 py-3">
        <div className="flex items-center gap-2">
          <ChevronLeft
            size={20}
            className="cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          />
          <p className="line-clamp-1 text-lg leading-[21px] font-semibold -tracking-[0.4px] text-[#02060cbf]">
            Your Cart
          </p>
        </div>
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="border-none focus-visible:outline-none">
              <EllipsisVertical size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="fixed top-0 -right-1 p-0">
              <DropdownMenuItem className="flex items-center p-2">
                <p className="whitespace-nowrap">Clear Cart</p>
                <Trash size={20} className="" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="hide-scrollbar h-screen flex-1 overflow-y-scroll overscroll-none bg-[#f0f0f5] p-4">
        {cartData.status === "loading" && <CommonLoader />}
        {cartData.status === "error" && <SomethingWentWrong />}
        {cartData.status === "empty" && <EmptyCart />}
        {cartData.status === "success" && (
          <div className="flex flex-col justify-between gap-4">
            <div className="flex flex-6 flex-col gap-3">
              <ReviewOrder
                cartData={cartData.data}
                handleIncreaseProductQantity={handleIncreaseProductQantity}
                handleDecreaseProductQantity={handleDecreaseProductQantity}
              />
              <Coupons />
            </div>
            <div className="flex flex-4 flex-col gap-3">
              <BillDetails cartData={cartData.data} />
              <Button className="cursor-pointer bg-[#ff5200] py-5.5 text-lg leading-5.5 font-normal -tracking-[0.45px] text-[#ffffffeb] transition duration-100 ease-in hover:scale-[0.95] hover:bg-[#ff5200] hover:shadow-none">
                Place Order
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
