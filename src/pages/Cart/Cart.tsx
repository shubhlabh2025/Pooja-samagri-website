import { ChevronLeft, EllipsisVertical, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router";
import { useState } from "react";
import SomethingWentWrong from "@/components/error/SomethingWentWrong";
import ReviewOrder from "./ReviewOrder";
import BillDetails from "./BillDetails";
import Coupons from "./Coupons";
import ConfirmationDialog from "@/components/dialog/ConfirmationDialog";
import AddMoreItems from "./AddMoreItems";
import AddressBottomSheet from "@/components/bottomsheet/AddressBottomSheet";
import { Drawer } from "@/components/ui/drawer";
import {
  useClearCartMutation,
  useGetCartItemsQuery,
} from "@/features/cart/cartAPI";
import { useGetUserAddressListQuery } from "@/features/address/AddresssAPI";
import { useGetCouponsQuery } from "@/features/coupon/couponAPI";
import type { CartItem } from "@/features/cart/cartAPI.type";
import type { Coupon } from "@/features/coupon/couponAPI.type";
import EmptyCart from "./EmptyCart";
// import { useAppSelector } from "@/app/hooks";
import { useCreateOrderMutation } from "@/features/orders/orderAPI";
import type { CreateOrders } from "@/features/orders/orderAPI.type";
import AddressCard from "./AddressCard";
import type { UserAddressPayload } from "@/features/address/addressAPI.type";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/app/hooks";
import { selectConfiguration } from "@/features/configuration/configurationSlice";
import { toast } from "sonner";
import PaymentBottomSheet from "@/components/bottomsheet/PaymentBottomSheet";
import { CartSkeleton } from "@/components/skeletons/CartPageSkeleton";

const Cart = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const configState = useAppSelector(selectConfiguration);
  const minOrderValue = configState.data?.data.min_order_amount ?? 0;

  const deliveryCharge = configState.data?.data.delivery_charge ?? 0;

  const {
    data: cartData = { data: [] },
    isLoading,
    isError,
  } = useGetCartItemsQuery(undefined, {
    skip: !isAuthenticated,
  });

  const [
    createOrder,
    // { isLoading: orderPlacingLoading, isError: orderPlacingError },
  ] = useCreateOrderMutation();

  const {
    data: addressData = { data: [] },
    // isLoading: addressDataLoading,
    // isError: addressDataError,
  } = useGetUserAddressListQuery(undefined, {
    skip: !isAuthenticated,
  });
  const defaultAddress = addressData.data.find((address) => address.is_default);

  const {
    data: couponsData = { data: [] },
    isError: isCouponsError,
    isLoading: isCouponsLoading,
  } = useGetCouponsQuery(undefined, {
    skip: !isAuthenticated,
  });

  const [clearCart, { isLoading: clearCartLoading, isError: clearCartError }] =
    useClearCartMutation();

  console.log("Coupons Data:", isCouponsError, isCouponsLoading);
  console.log("clearCartLoading:", clearCartLoading);
  console.log("clearCartError:", clearCartError);

  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [openPaymentSheet, isOpenPaymentSheet] = useState<boolean>(false);

  const [selectedAddress, setSelectedAddress] =
    useState<UserAddressPayload | null>(null);
  const [isAddressDrawerOpen, setIsAddressDrawerOpen] = useState(false);

  const avaiableItems = cartData.data.filter(
    (item) => !item.variant.out_of_stock,
  );

  const { itemsTotal, discount } = avaiableItems.reduce(
    (acc, item: CartItem) => {
      const { mrp, price } = item.variant;
      const quantity = item.quantity;

      acc.itemsTotal += mrp * quantity;
      acc.discount += (mrp - price) * quantity;

      return acc;
    },
    { itemsTotal: 0, discount: 0 },
  );

  let promoCodeDiscount = 0;

  if (selectedCoupon) {
    if (selectedCoupon.discount_type === "percentage") {
      promoCodeDiscount =
        ((itemsTotal - discount) * selectedCoupon.discount_value) / 100;

      if (selectedCoupon.max_discount_value) {
        promoCodeDiscount = Math.min(
          promoCodeDiscount,
          selectedCoupon.max_discount_value,
        );
      }
      if (selectedCoupon.min_discount_value) {
        promoCodeDiscount = Math.max(
          promoCodeDiscount,
          selectedCoupon.min_discount_value,
        );
      }
    } else if (selectedCoupon.discount_type === "fixed") {
      promoCodeDiscount = selectedCoupon.discount_value;
    }

    if (
      selectedCoupon.max_discount_value &&
      promoCodeDiscount > selectedCoupon.max_discount_value
    ) {
      promoCodeDiscount = selectedCoupon.max_discount_value;
    }
  }

  if (promoCodeDiscount > itemsTotal - discount) {
    promoCodeDiscount = itemsTotal - discount;
  }

  const totalAmount =
    itemsTotal - discount - promoCodeDiscount + deliveryCharge;

  if (
    selectedCoupon &&
    itemsTotal - discount < selectedCoupon.min_order_value
  ) {
    setSelectedCoupon(null);
  }

  const [showClearCartDialog, setShowClearCartDialog] = useState(false);

  const navigate = useNavigate();

  const handleCouponChange = (coupon: Coupon | null) => {
    setSelectedCoupon(coupon);
  };

  const handleAddressChange = (address: UserAddressPayload) => {
    setSelectedAddress(address);
    setIsAddressDrawerOpen(false);
  };

  const handleAdressDrawerOpen = () => {
    setIsAddressDrawerOpen(true);
  };

  if (isLoading) {
    return (
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
        </div>
        <CartSkeleton />
      </div>
    );
  }
  if (isError) {
    return <SomethingWentWrong />;
  }

  // console.log("Cart Data:", cartData.data);
  if (cartData.data.length === 0) {
    return <EmptyCart />;
  }

  const placeOrder = async (method: string) => {
    if (!cartData || !cartData.data) return;
    if (!selectedAddress && !defaultAddress) {
      return handleAdressDrawerOpen();
    }
    if (itemsTotal - discount < minOrderValue) {
      toast.error(`Minimum order value is ₹${minOrderValue}`);
      return;
    }

    const orderItems = avaiableItems.map(
      ({ quantity, product_variant_id }) => ({
        quantity,
        product_variant_id,
      }),
    );

    const orderPayload: CreateOrders = {
      items: orderItems,
      charges: [
        {
          type: "delivery",
          name: "Delivery Charges",
          amount: deliveryCharge,
        },
      ],
      address_id: `${selectedAddress ? selectedAddress.id : defaultAddress?.id}`,
      offer_codes: selectedCoupon ? [selectedCoupon.offer_code] : [],
      method: method,
    };

    try {
      const result = await createOrder(orderPayload).unwrap();
      console.log("Order creation result:", result);

      if (result.success) {
        if (result.data) {
          // Navigate to success page
          navigate("payment-page", {
            replace: true,
            state: { orderData: result.data },
          });
        } else {
          navigate("order-success", { replace: true });
        }
      } else {
        // Navigate to failure page
        navigate("/order-failure", { state: { message: result.message } });
      }
    } catch (error) {
      console.error("Order creation failed:", error);
      // Navigate to failure page
      navigate("../order-failure", {
        state: { message: "Order creation failed" },
        replace: true,
      });
    }
  };

  return (
    <>
      <ConfirmationDialog
        open={showClearCartDialog}
        onOpenChange={setShowClearCartDialog}
        headingText="Clear your cart?"
        bodyText="Would you like to remove all items from your cart?"
        confirmationButtonText={clearCartLoading ? "Clearing..." : "Clear Cart"}
        cancelButtonText="Cancel"
        onConfirm={async () => {
          await clearCart();
        }}
        isConfirming={clearCartLoading}
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

        <div className="flex-1 overflow-y-auto bg-[#f0f0f5] p-4">
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
              <AddressCard
                selectedAddress={selectedAddress || defaultAddress}
                handleAdressDrawerOpen={handleAdressDrawerOpen}
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

        <div className="shadow-cart-card bottom-0 z-10 rounded-tl-lg rounded-tr-lg bg-white px-4 py-4">
          {selectedAddress || defaultAddress ? (
            <button
              className="focus:ring-opacity-75 w-full cursor-pointer rounded-lg bg-[#ff5200] py-2.5 text-lg leading-5 font-normal text-white transition duration-150 ease-in-out hover:scale-[0.98] hover:bg-[#ff5200] focus:outline-none"
              onClick={() => {
                isOpenPaymentSheet(true);
              }}
            >
              Pay{" "}
              {`₹ ${new Intl.NumberFormat("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(totalAmount)}`}
            </button>
          ) : (
            <Button
              className="w-full cursor-pointer rounded-lg bg-[#ff5200] py-2.5 text-lg leading-5.5 font-normal -tracking-[0.45px] text-[#ffffffeb] transition duration-100 ease-in hover:scale-[0.95] hover:bg-[#ff5200] hover:shadow-none"
              onClick={handleAdressDrawerOpen}
            >
              Select Address
            </Button>
          )}
        </div>
      </div>
      <Drawer open={isAddressDrawerOpen} onOpenChange={setIsAddressDrawerOpen}>
        <AddressBottomSheet
          addresses={addressData.data || []}
          handleAddressChange={handleAddressChange}
        />
      </Drawer>
      <Drawer open={openPaymentSheet} onOpenChange={isOpenPaymentSheet}>
        <PaymentBottomSheet
          onSelectPaymentMethod={(method) => {
            placeOrder(method);
          }}
        />
      </Drawer>
    </>
  );
};

export default Cart;
