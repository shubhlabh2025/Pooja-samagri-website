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
import ConfirmationDialog from "@/components/dialog/ConfirmationDialog";
import AddMoreItems from "./AddMoreItems";
import AddressBottomSheet from "@/components/bottomsheet/AddressBottomSheet";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import {
  useClearCartMutation,
  useGetCartItemsQuery,
} from "@/features/cart/cartAPI";
import { useGetUserAddressListQuery } from "@/features/address/AddresssAPI";
import { useGetCouponsQuery } from "@/features/coupon/couponAPI";
import type { CartItem } from "@/features/cart/cartAPI.type";
import type { Coupon } from "@/features/coupon/couponAPI.type";
import EmptyCart from "./EmptyCart";
import { useAppSelector } from "@/app/hooks";

const Cart = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const {
    data: cartData = { data: [] },
    isLoading,
    isError,
  } = useGetCartItemsQuery(undefined, {
    skip: !isAuthenticated,
  });

  const {
    data: couponsData = { data: [] },
    isError: isCouponsError,
    isLoading: isCouponsLoading,
  } = useGetCouponsQuery();

  const [clearCart, { isLoading: clearCartLoading, isError: clearCartError }] =
    useClearCartMutation();

  console.log("Coupons Data:", isCouponsError, isCouponsLoading);
  console.log("clearCartLoading:", clearCartLoading);
  console.log("clearCartError:", clearCartError);

  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const { itemsTotal, discount } = cartData.data.reduce(
    (acc, item: CartItem) => {
      const { mrp, price } = item.variant;
      const quantity = item.quantity;

      acc.itemsTotal += mrp * quantity;
      acc.discount += (mrp - price) * quantity;

      return acc;
    },
    { itemsTotal: 0, discount: 0 },
  );

  if (
    selectedCoupon &&
    itemsTotal - discount < selectedCoupon.min_order_value
  ) {
    setSelectedCoupon(null);
  }

  const [showClearCartDialog, setShowClearCartDialog] = useState(false);

  const navigate = useNavigate();

  const { data: addressData = { data: [] } } = useGetUserAddressListQuery();

  const handleCouponChange = (coupon: Coupon | null) => {
    setSelectedCoupon(coupon);
  };

  if (isLoading) {
    return <CommonLoader />;
  }
  if (isError) {
    return <SomethingWentWrong />;
  }

  // console.log("Cart Data:", cartData.data);
  if (cartData.data.length === 0) {
    return <EmptyCart />;
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
        onConfirm={async () => {
          await clearCart();
          console.log("Cart cleared");
        }}
      />
      <div className="flex h-full max-h-full flex-1 flex-col overflow-scroll bg-[#f0f0f5]">
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
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

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
              <Coupons
                couponsData={couponsData.data}
                itemsTotal={itemsTotal}
                handleCouponChange={handleCouponChange}
                selectedCoupon={selectedCoupon}
                discount={discount}
              />
            </div>
            <div className="flex flex-4 flex-col gap-3">
              <BillDetails
                itemsTotal={itemsTotal}
                discount={discount}
                selectedCoupon={selectedCoupon}
              />
            </div>
          </div>
        </div>

        <div className="shadow-cart-card sticky bottom-0 z-10 rounded-tl-lg rounded-tr-lg bg-white px-4 py-4">
          <Drawer>
            <DrawerTrigger className="w-full cursor-pointer rounded-lg bg-[#ff5200] py-2.5 text-lg leading-5.5 font-normal -tracking-[0.45px] text-[#ffffffeb] transition duration-100 ease-in hover:scale-[0.95] hover:bg-[#ff5200] hover:shadow-none">
              Select Address
            </DrawerTrigger>
            <AddressBottomSheet addresses={addressData.data || []} />
          </Drawer>
        </div>
      </div>
    </>
  );
};

export default Cart;
