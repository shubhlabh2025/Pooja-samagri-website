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
import ConfirmationDialog from "@/components/dialog/ConfirmationDialog";
import AddMoreItems from "./AddMoreItems";

const Cart = () => {
  const [cartData, setCartData] = useState<FetchState<CartItem[]>>({
    status: "loading",
  });

  const [showClearCartDialog, setShowClearCartDialog] = useState(false);

  const isSuccess = cartData.status === "success";

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
    <>
      <ConfirmationDialog
        open={showClearCartDialog}
        onOpenChange={setShowClearCartDialog}
        headingText="Clear your cart?"
        bodyText="Would you like to remove all items from your cart?"
        confirmationButtonText="Clear cart"
        cancelButtonText="Cancel"
        onConfirm={() => {
          setCartData({ status: "empty" });
          console.log("Cart cleared");
        }}
      />
      <div className="flex h-screen flex-col bg-[#f0f0f5]">
        {/* Sticky top bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-2 py-3">
          <div className="flex items-center gap-2">
            <ChevronLeft
              size={20}
              className="cursor-pointer"
              onClick={() => navigate(-1)}
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
                {/* <AlertDialog>
                <AlertDialogTrigger asChild> */}
                <DropdownMenuItem
                  onSelect={() => {
                    setTimeout(() => {
                      setShowClearCartDialog(true);
                    }, 10);
                    console.log("Clear cart clicked");
                  }}
                  className="flex items-center p-2"
                >
                  <p className="whitespace-nowrap">Clear Cart</p>
                  <Trash size={20} className="" />
                </DropdownMenuItem>
                {/* </AlertDialogTrigger> */}
                {/* </AlertDialog> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Scrollable main content */}
        <div className="hide-scrollbar flex-1 overflow-y-auto bg-[#f0f0f5] p-4">
          {cartData.status === "loading" && <CommonLoader />}
          {cartData.status === "error" && <SomethingWentWrong />}
          {cartData.status === "empty" && <EmptyCart />}
          {isSuccess && (
            <div className="flex flex-col justify-between gap-4 sm:flex-row">
              <div className="flex flex-6 flex-col gap-3">
                <div className="flex flex-col gap-3">
                  <p className="ml-1 text-[16px] font-semibold -tracking-[0.4px]">
                    Rewiew Your Order
                  </p>
                  <ReviewOrder
                    cartData={cartData.data}
                    handleIncreaseProductQantity={handleIncreaseProductQantity}
                    handleDecreaseProductQantity={handleDecreaseProductQantity}
                  />
                  <AddMoreItems />
                </div>
                <Coupons />
              </div>
              <div className="flex flex-4 flex-col gap-3">
                <BillDetails cartData={cartData.data} />
              </div>
            </div>
          )}
        </div>

        {/* Sticky bottom "Place Order" button only if success */}
        {isSuccess && (
          <div className="shadow-cart-card sticky bottom-0 z-10 rounded-tl-lg rounded-tr-lg bg-white px-4 py-4">
            <Button className="w-full cursor-pointer bg-[#ff5200] py-5.5 text-lg leading-5.5 font-normal -tracking-[0.45px] text-[#ffffffeb] transition duration-100 ease-in hover:scale-[0.95] hover:bg-[#ff5200] hover:shadow-none">
              Place Order
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
