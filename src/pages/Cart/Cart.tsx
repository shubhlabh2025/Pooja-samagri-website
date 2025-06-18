import { ChevronLeft, EllipsisVertical, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router";
import { useState } from "react";
import CommonLoader from "@/components/loader/CommonLoader";
import SomethingWentWrong from "@/components/error/SomethingWentWrong";
import ReviewOrder from "./ReviewOrder";
import BillDetails from "./BillDetails";
import Coupons from "./Coupons";
import { Button } from "@/components/ui/button";
import ConfirmationDialog from "@/components/dialog/ConfirmationDialog";
import AddMoreItems from "./AddMoreItems";
import EmptyScreen from "@/components/custom/EmptyScreen";
import EmptyCartIcon from "../../assets/emptyCart.svg";
import AddressBottomSheet from "@/components/bottomsheet/AddressBottomSheet";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import type { UserAddressPayload } from "@/features/address/addressAPI.type";
import { useGetCartItemsQuery } from "@/features/cart/cartAPI";

const Cart = () => {
  const {
    data: cartData = { data: [] },
    isLoading,
    isError,
  } = useGetCartItemsQuery();

  const [showClearCartDialog, setShowClearCartDialog] = useState(false);

  const navigate = useNavigate();

  const staticAddresses: UserAddressPayload[] = [
    {
      id: "1",
      user_id: "user_001",
      phone_number: "+911234567890",
      name: "Jyoti",
      addressLine1: "Room No 13 Om Ganeshwar Welfare Society",
      addressLine2: "Near Sai Mandir, Powai",
      landmark: "Opposite Lake View",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400076",
    },
    {
      id: "2",
      user_id: "user_002",
      phone_number: "+919876543210",
      name: "Raj",
      addressLine1: "Flat 402, Maple Heights",
      addressLine2: "Sector 21, Gurugram",
      city: "Gurgaon",
      state: "Haryana",
      pincode: "122016",
    },
  ];
  //  return <CartPageSkeleton/>

  if (isLoading) {
    return <CommonLoader />;
  }
  if (isError) {
    return <SomethingWentWrong />;
  }
  if (cartData.data.length === 0) {
    <EmptyScreen
      imageSrc={EmptyCartIcon}
      title="Your cart is empty"
      subtitle="Add items to your cart to view them here."
      buttonText="Start Shopping"
      onButtonClick={() => navigate(-1)}
    />;
  }

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
          // setCartData({ status: "empty" });
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
          <div className="flex flex-col justify-between gap-4 sm:flex-row">
            <div className="flex flex-6 flex-col gap-3">
              <div className="flex flex-col gap-3">
                <p className="ml-1 text-[16px] font-semibold -tracking-[0.4px]">
                  Rewiew Your Order
                </p>
                <ReviewOrder cartData={cartData.data} />
                <AddMoreItems />
              </div>
              <Coupons />
            </div>
            <div className="flex flex-4 flex-col gap-3">
              <BillDetails cartData={cartData.data} />
            </div>
          </div>
        </div>

        {/* Sticky bottom "Place Order" button only if success */}

        <div className="shadow-cart-card sticky bottom-0 z-10 rounded-tl-lg rounded-tr-lg bg-white px-4 py-4">
          <Drawer>
            <DrawerTrigger asChild>
              <Button className="w-full cursor-pointer bg-[#ff5200] py-5.5 text-lg leading-5.5 font-normal -tracking-[0.45px] text-[#ffffffeb] transition duration-100 ease-in hover:scale-[0.95] hover:bg-[#ff5200] hover:shadow-none">
                Select Address
              </Button>
            </DrawerTrigger>
            <AddressBottomSheet addresses={staticAddresses} />
          </Drawer>
        </div>
      </div>
    </>
  );
};

export default Cart;
