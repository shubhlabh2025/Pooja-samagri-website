import { useState } from "react";
import { useCancelOrderMutation } from "@/features/orders/orderAPI";
import type { CancelOrderDialogProps } from "@/interfaces/dialog-interfaces";
import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ConfirmationDialog from "./ConfirmationDialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const CANCELLATION_REASONS = [
  "Order created by mistake",
  "Item not required anymore",
  "Incorrect shipping address",
  "Duplicate order",
  "Other",
];

const CancelOrderDialog = ({
  orderId,
  handleCloseCancelDialog,
}: CancelOrderDialogProps & { orderId: string }) => {
  const [cancelOrder, { isLoading }] = useCancelOrderMutation();
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const isSubmitDisabled =
    !reason || (reason === "Other" && !otherReason.trim());

  const handleSubmit = () => {
    setShowConfirmation(true);
  };

  const handleConfirmCancellation = async () => {
    if (isSubmitDisabled) return;
    const payload = { reason: reason === "Other" ? otherReason : reason };

    try {
      await cancelOrder({ id: orderId, body: payload }).unwrap();
      toast.success("Order has been cancelled successfully.");
      setShowConfirmation(false);
      handleCloseCancelDialog();
    } catch {
      toast.error("Failed to cancel order. Please try again.");
    }
  };

  return (
    <>
      <AlertDialogContent className="rounded-2xl p-0">
        <AlertDialogHeader className="p-6 pb-4">
          <AlertDialogTitle className="text-xl font-semibold tracking-tight text-slate-800">
            Cancel Order
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-slate-500">
            Please select a reason for cancellation. This helps us improve our
            service.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col gap-3 px-6">
          <div className="flex flex-wrap gap-2">
            {CANCELLATION_REASONS.map((r) => (
              <Button
                key={r}
                variant="outline"
                onClick={() => setReason(r)}
                className={cn(
                  "h-auto rounded-full px-4 py-2 text-sm transition-all duration-150 ease-in-out hover:scale-[0.97] focus:ring-0 focus:ring-offset-0",
                  reason === r
                    ? "border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white"
                    : "border-slate-300 bg-transparent text-slate-700 hover:bg-slate-100",
                )}
              >
                {r}
              </Button>
            ))}
          </div>

          {reason === "Other" && (
            <Textarea
              placeholder="Please specify your reason for cancellation"
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
              className="mt-2 max-h-40 min-h-[100px] focus-visible:ring-1 focus-visible:ring-indigo-500 focus-visible:ring-offset-0"
            />
          )}
        </div>

        <AlertDialogFooter className="flex gap-2 rounded-b-2xl bg-slate-50 p-4">
          <Button
            variant="outline"
            onClick={handleCloseCancelDialog}
            className="flex-1 border-slate-300 bg-white text-slate-700 transition-transform duration-100 ease-in hover:scale-[0.95] hover:bg-slate-100"
          >
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitDisabled || isLoading}
            className="flex-1 bg-indigo-600 text-white transition-transform duration-100 ease-in hover:scale-[0.95] hover:bg-indigo-700 disabled:bg-indigo-600/50"
          >
            Submit
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>

      <ConfirmationDialog
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        headingText="Are you sure?"
        bodyText="This action cannot be undone. Your order will be permanently cancelled."
        onConfirm={handleConfirmCancellation}
        isConfirming={isLoading}
        confirmationButtonText={isLoading ? "Cancelling..." : "Yes, Cancel"}
      />
    </>
  );
};

export default CancelOrderDialog;
