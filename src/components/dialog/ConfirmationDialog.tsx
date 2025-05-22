import type { ConfirmationDialogProps } from "@/interfaces/dialog-interfaces";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ConfirmationDialog = ({
  open,
  onOpenChange,
  headingText,
  bodyText = "",
  confirmationButtonText = "Confirm",
  cancelButtonText = "Cancel",
  onConfirm,
  confirmationButtonClassName,
  cancellationButtonClassName,
}: ConfirmationDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-3xl px-4 pt-6 pb-4">
        <AlertDialogHeader className="flex flex-col">
          <AlertDialogTitle className="text-[#02060ceb ] text-left text-[20px] leading-6 font-semibold -tracking-[0.5px]">
            {headingText}
          </AlertDialogTitle>
          {bodyText && (
            <AlertDialogDescription className="text-left">
              {bodyText}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row">
          <AlertDialogCancel
            className={cn(
              "flex h-auto flex-1 items-center justify-center rounded-[12px] border-none bg-[#ffeee5] px-4 py-3 text-sm leading-[20px] font-semibold -tracking-[0.35px] text-[#ff5200] shadow-none transition duration-100 ease-in hover:scale-[0.95] hover:bg-[#ffeee5] hover:text-[#ff5200] hover:shadow-none focus:border-none focus:ring-0 focus-visible:ring-0",
              cancellationButtonClassName,
            )}
          >
            {cancelButtonText}
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={onConfirm}
            className={cn(
              "flex h-auto flex-1 items-center justify-center rounded-[12px] border-none bg-[#ff5200] px-4 py-3 text-sm leading-[20px] font-semibold -tracking-[0.35px] text-[#ffffffeb] shadow-none transition duration-100 ease-in hover:scale-[0.95] hover:bg-[#ff5200] hover:shadow-none",
              confirmationButtonClassName,
            )}
          >
            {confirmationButtonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
