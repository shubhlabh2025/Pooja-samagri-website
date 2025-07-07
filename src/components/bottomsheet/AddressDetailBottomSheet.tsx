import {
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { X } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CompleteAddressProps } from "@/interfaces/completeAddressProps";
import { useRef } from "react";

const addressSchema = z.object({
  address_line1: z.string().min(1, "Address Line 1 is required"),
  address_line2: z.string().optional(),
  landmark: z.string().optional(),
  name: z.string().min(1, "Receiver's name is required"),
  phone_number: z
    .string()
    .regex(/^\d{10}$/, "Enter a valid 10-digit mobile number"),
});

type AddressFormData = z.infer<typeof addressSchema>;

const AddressDetailBottomSheet = ({
  onSave,
}: {
  onSave: (data: CompleteAddressProps) => void;
}) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  const onSubmit = (data: AddressFormData) => {
    onSave({
      ...data,
      address_line2: data.address_line2 ?? "",
      landmark: data.landmark ?? "",
      phone_number: `+91${data.phone_number}`,
     
    });

    // ✅ Programmatically close the drawer after successful validation
    closeRef.current?.click();
  };

  return (
    <DrawerContent className="flex flex-col bg-white px-4 pt-4 pb-24">
      <DrawerHeader className="mb-4 p-0">
        <DrawerTitle className="text-lg font-semibold text-[#02060C]">
          <div className="flex items-center justify-between">
            <span>Choose a delivery address</span>
            <DrawerClose asChild>
              <X
                size={24}
                className="rounded-lg bg-[#02060c26] p-[4px] text-white"
              />
            </DrawerClose>
          </div>
        </DrawerTitle>
      </DrawerHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <input
            {...register("address_line1")}
            placeholder="HOUSE / FLAT / FLOOR NO."
            className="w-full border-b border-gray-300 bg-transparent p-2 text-sm outline-none"
          />
          {errors.address_line1 && (
            <p className="mt-1 text-xs text-red-500">
              {errors.address_line1.message}
            </p>
          )}
        </div>

        <div>
          <input
            {...register("address_line2")}
            placeholder="APARTMENT / ROAD / AREA"
            className="w-full border-b border-gray-300 bg-transparent p-2 text-sm outline-none"
          />
        </div>

        <div>
          <input
            {...register("landmark")}
            placeholder="LANDMARK, ADDITIONAL INFO, ETC. (OPTIONAL)"
            className="w-full border-b border-gray-300 bg-transparent p-2 text-sm outline-none"
          />
        </div>

        <div>
          <input
            {...register("name")}
            placeholder="Receiver's Name"
            className="w-full border-b border-gray-300 bg-transparent p-2 text-sm outline-none"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("phone_number")}
            type="tel"
            placeholder="Receiver's Number e.g 9876543210"
            className="w-full border-b border-gray-300 bg-transparent p-2 text-sm outline-none"
          />
          {errors.phone_number && (
            <p className="mt-1 text-xs text-red-500">
              {errors.phone_number.message}
            </p>
          )}
        </div>

        <DrawerFooter className="fixed bottom-4 left-0 w-full px-4">
          <button
            type="submit"
            className="w-full rounded-lg bg-[#ff5200] py-3 text-sm font-bold tracking-wide text-white"
          >
            SAVE AND PROCEED
          </button>

          {/* Hidden close trigger */}
          <DrawerClose asChild>
            <button type="button" ref={closeRef} className="hidden" />
          </DrawerClose>
        </DrawerFooter>
      </form>
    </DrawerContent>
  );
};

export default AddressDetailBottomSheet;
