import type { OrderDetail } from "@/features/orders/orderAPI.type";
import { CheckCircle, Truck } from "lucide-react";
import { useNavigate } from "react-router";

const OrderCard = ({ order }: { order: OrderDetail }) => {
  const navigate = useNavigate();

  const noOfItems = order.order_items.length;
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

  return (
    <div className="flex w-full flex-col rounded-[12px] border bg-white">
      <div className="flex w-full flex-wrap items-center border-b border-[#E9E9EB] px-4 pt-2 pb-1.5 sm:flex-nowrap sm:justify-between">
        <div className="w-1/2 text-[#02060ca6] sm:w-auto sm:pr-0">
          <p className="text-sm text-[#02060c73]">
            Ordered on{" "}
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
            })}
          </p>
        </div>
        <div className="flex w-1/2 flex-row justify-end text-right sm:w-auto sm:text-left">
          <p className="text-sm text-[#02060c73]">
            Order ID:{" "}
            <span className="font-semibold">{order.order_number + 1000}</span>
          </p>
        </div>
        <div className="mt-1 w-1/2 sm:mt-0 sm:w-auto sm:pr-0">
          <p
            className={`w-fit ${statusColors[order.status]} rounded-[6px] px-3 py-[1px] text-sm font-medium tracking-[-0.35px]`}
          >
            {order.status.toUpperCase()}
          </p>
        </div>
        <div className="mt-1 w-1/2 text-right sm:mt-0 sm:w-auto sm:text-left">
          {order.delivered_at && (
            <div className="flex items-center gap-1 justify-end">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <p className="text-sm text-gray-600">
                Delivered on{" "}
                <span className="font-medium text-gray-800">
                  {new Date(order.delivered_at).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                  })}
                </span>
              </p>
            </div>
          )}

          {!order.delivered_at && order.expected_delivery_date && (
            <div className="flex items-center gap-2 justify-end">
              <Truck className="h-4 w-4 text-blue-600"/>
              <p className="text-sm text-gray-600">
                Expected by{" "}
                <span className="font-medium text-gray-800">
                  {new Date(order.expected_delivery_date).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                    },
                  )}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 p-3">
        <div className="flex justify-between">
          <p>
            {noOfItems} item{noOfItems > 1 && "(s)"}
          </p>
          <p className="text-sm font-semibold text-[#02060c73]">
            {order.payment_details.amount.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </p>
        </div>
        <div className="sm:items-en flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex gap-2 sm:min-w-[262px]">
            {order.order_items.slice(0, 4).map((item, index) => (
              <div
                className="flex items-center justify-center rounded-[4px] border border-[#d4d4d4] p-1"
                key={index}
              >
                <img
                  src={item.product_variant.images[0]}
                  alt={`Product ${index + 1}`}
                  className="h-9 w-9 rounded-lg object-cover"
                />
              </div>
            ))}
            {noOfItems > 3 && (
              <div className="flex items-center justify-center rounded-[4px] border border-[#d4d4d4] p-1">
                <span className="w-9 text-center text-sm font-medium text-[#121414]">
                  + {noOfItems - 4}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={() => {
              navigate(`/orders/${order.id}`);
            }}
            className="w-full cursor-pointer rounded-lg bg-[#ff5100e2] py-2 text-lg leading-5.5 font-medium -tracking-[0.45px] text-[#ffffffeb] transition duration-100 ease-in hover:scale-[0.95] hover:bg-[#ff5100e2] hover:shadow-none sm:h-fit sm:max-w-80"
          >
            Track Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
