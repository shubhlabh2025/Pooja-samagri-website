import CancelOrderDialog from "@/components/dialog/CancelOrderDialog";
import NeedHelpInfoDialog from "@/components/dialog/NeedHelpInfoDialog";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDownloadInvoiceMutation } from "@/features/orders/orderAPI";
import type { OrderDetailMainCardProps } from "@/interfaces/order-page-props";
import { BadgeCheck, BadgeX, Download, LifeBuoy } from "lucide-react";
import { useState } from "react";

const OrderDetailMainCard = ({ orderDetails }: OrderDetailMainCardProps) => {
  const firstItemName = orderDetails.order_items[0].product_variant.name;
  const noOfItems = orderDetails.order_items.length;
  const [cancelDialog, setCancelDialog] = useState(false);

  const statusColors = {
    pending: "text-amber-600 bg-amber-100",
    accepted: "text-amber-700 bg-amber-100",
    processing: "text-blue-600 bg-blue-100",
    packed: "text-indigo-600 bg-indigo-100",
    shipped: "text-purple-600 bg-purple-100",
    out_for_delivery: "text-sky-600 bg-sky-100",
    delivered: "text-green-700 bg-green-100",
    cancelled: "text-red-700 bg-red-100",
    rejected: "text-red-700 bg-red-100",
    returned: "text-slate-600 bg-slate-100",
    refunded: "text-slate-600 bg-slate-100",
  };

  const statusText = {
    pending: "Order Placed",
    accepted: "Order Accepted",
    processing: "Processing",
    packed: "Packed",
    shipped: "Shipped",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
    rejected: "Rejected by Seller",
    returned: "Returned",
    refunded: "Refunded",
  };

  const [downloadInvoice] = useDownloadInvoiceMutation();

  const handleCloseCancelDialog = () => {
    setCancelDialog(false);
  };

  const handleDownloadInvoice = async () => {
    downloadInvoice(orderDetails.id); // no need to unwrap or await
  };

  return (
    <div className="rounded-[12px] bg-white">
      <div className="flex justify-between border-b border-[#E9E9EB] px-4 pt-3 pb-2">
        <p className="text-[16px] text-[#02060c73]">
          Order ID: {orderDetails.order_number + 1000}
        </p>
        <p
          className={`${statusColors[orderDetails.status]} rounded-[6px] px-3 py-[1px] text-sm font-medium tracking-[-0.35px]`}
        >
          {orderDetails.status.toUpperCase()}
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 border-b border-[#E9E9EB] bg-white p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <div className="flex -space-x-4">
              {orderDetails.order_items.slice(0, 3).map((item, index) => (
                <img
                  loading="lazy"
                  key={index}
                  src={item.product_variant.images[0]}
                  alt={item.product_variant.name}
                  className="h-11 w-11 rounded-full object-cover"
                  style={{ zIndex: 3 - index }}
                />
              ))}
            </div>

            {noOfItems > 3 && (
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
                +{noOfItems - 3}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <p className="line-clamp-1 text-base font-semibold text-slate-800">
              {firstItemName}
            </p>
            <p className="text-sm font-medium text-slate-500">
              {noOfItems} {noOfItems > 1 ? "items" : "item"}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-lg font-bold text-slate-900">
            ₹{orderDetails.payment_details.amount.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 border-b border-[#E9E9EB] px-4 pt-4 pb-5">
        <div className="flex flex-col gap-5">
          {orderDetails.order_histories.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                  })}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(item.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </p>
              </div>

              <div className="relative flex flex-col items-center">
                {[
                  "pending",
                  "accepted",
                  "processing",
                  "packed",
                  "shipped",
                  "out_for_delivery",
                  "delivered",
                ].includes(item.status) ? (
                  <BadgeCheck size={20} color="white" fill="green" />
                ) : (
                  <BadgeX size={20} color="white" fill="red" />
                )}

                {!(orderDetails.order_histories.length - 1 == index) && (
                  <div className="absolute top-4.5 h-10 w-0.5 bg-green-700"></div>
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">
                  {statusText[item.status]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 px-4 py-3">
        {orderDetails.status === "delivered" && (
          <Button
            onClick={handleDownloadInvoice}
            className="flex flex-1 items-center justify-center gap-2 rounded-md border border-blue-600 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm transition duration-150 ease-in-out hover:scale-[0.95] hover:bg-blue-50"
          >
            <Download size={16} />
            <span className="truncate">Invoice</span>
          </Button>
        )}

        {orderDetails.status === "pending" && (
          <AlertDialog open={cancelDialog} onOpenChange={setCancelDialog}>
            <AlertDialogTrigger className="flex flex-1 items-center justify-center gap-2 rounded-md border border-red-600 bg-white px-4 py-2 text-sm font-medium text-red-700 shadow-sm transition duration-150 ease-in-out hover:scale-[0.95] hover:bg-red-50">
              <BadgeX size={16} />
              <span className="truncate">Cancel Order</span>
            </AlertDialogTrigger>
            <CancelOrderDialog
              orderId={orderDetails.id}
              handleCloseCancelDialog={handleCloseCancelDialog}
            />
          </AlertDialog>
        )}

        <AlertDialog>
          <AlertDialogTrigger className="flex flex-1 items-center justify-center gap-2 rounded-md border border-[#1aa672] bg-[#1aa672] px-4 py-2 text-sm font-medium text-white shadow-sm transition duration-150 ease-in-out hover:scale-[0.95] hover:border-[#168c61] hover:bg-[#168c61]">
            <LifeBuoy size={16} />
            <span className="truncate">Need Help?</span>
          </AlertDialogTrigger>
          <NeedHelpInfoDialog />
        </AlertDialog>
      </div>
    </div>
  );
};

export default OrderDetailMainCard;
