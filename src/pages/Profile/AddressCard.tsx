import type {
  UpdateUserAddressPayload,
  UserAddressPayload,
} from "@/features/address/addressAPI.type";
import { useGetAddressFromLatLngQuery } from "@/features/maps/MapsApi";
import { useState } from "react";
import { z } from "zod";
import type { AddressComponent } from "./UserProfile";
import SearchAddressPage from "../Address/SearchAddressPage";
import {
  useDeleteAddressMutation,
  useUpdateUserAddressMutation,
} from "@/features/address/AddresssAPI";
import { Pencil, Trash } from "lucide-react";

interface AddressCardProps {
  data: UserAddressPayload;
}

// Zod validation schema
const addressValidationSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  phone_number: z
    .string()
    .regex(
      /^\+91[0-9]{10}$/,
      "Phone number must be in format +91 followed by 10 digits",
    ),
  address_line1: z.string().min(1, "Address Line 1 is required").trim(),
  address_line2: z.string().trim(),
  landmark: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
  is_default: z.boolean().optional(),
});

type AddressFormData = z.infer<typeof addressValidationSchema>;
type ValidationErrors = {
  [K in keyof AddressFormData]?: string;
};

const extractAddressFields = (components: AddressComponent[]) => {
  const getComponent = (type: string) =>
    components.find((c) => c.types.includes(type))?.long_name || "";

  return {
    city: getComponent("locality"),
    state: getComponent("administrative_area_level_1"),
    pincode: getComponent("postal_code"),
  };
};

const AddressCard = ({ data }: AddressCardProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showSearchView, setShowSearchView] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [useLat, setLat] = useState<number>(data.lat);
  const [useLng, setLng] = useState<number>(data.lng);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {},
  );

  const {
    data: addressSearchData = {
      success: false,
      message: "",
      data: {
        formatted_address: "",
        address_components: [],
        geometry: {
          location: {
            lat: 31.61404351178462,
            lng: 74.88916441294835,
          },
        },
      },
    },
  } = useGetAddressFromLatLngQuery({ lat: useLat, lng: useLng });

  const [updateAddress] = useUpdateUserAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();

  const extracted = extractAddressFields(
    addressSearchData.data.address_components,
  );

  const [editAddress, setEditAddress] = useState<UpdateUserAddressPayload>({
    name: data.name,
    phone_number: data.phone_number,
    is_default: data.is_default || false,
  });

  const validateForm = () => {
    try {
      const formData = {
        ...editAddress,
        city: extracted.city,
        state: extracted.state,
        pincode: extracted.pincode,
      };

      addressValidationSchema.parse(formData);
      setValidationErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: ValidationErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as keyof ValidationErrors] = err.message;
          }
        });
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const handleSaveAddress = async (addressId: string) => {
    if (!validateForm()) {
      return;
    }

    setIsUpdating(true);
    try {
      await updateAddress({
        addressId: addressId,
        body: { ...editAddress, lat: useLat, lng: useLng },
      });
      setExpandedId(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update address:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    await deleteAddress(data.id);
  };

  const handleFieldChange = (
    field: keyof UpdateUserAddressPayload,
    value: string | boolean,
  ) => {
    setEditAddress({
      ...editAddress,
      [field]: value,
    });

    // Clear validation error for this field when user starts typing
    if (validationErrors[field]) {
      setValidationErrors({
        ...validationErrors,
        [field]: undefined,
      });
    }
  };

  return showSearchView ? (
    <SearchAddressPage
      onChange={(lat, lng) => {
        setShowSearchView(false);
        setIsEditing(true);
        setLat(lat);
        setLng(lng);
        setEditAddress({
          ...editAddress,
          address_line1: "",
          address_line2: "",
          landmark: "",
          lat: lat,
          lng: lng,
        });
      }}
      lat={data.lat}
      lng={data.lng}
    />
  ) : (
    <div key={data.id} className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium">
          {extracted.city}, {extracted.state} - {extracted.pincode}
        </p>
        <div className="flex items-center space-x-4">
          {" "}
          {/* Use a flex container for buttons */}
          <button
            onClick={() => setExpandedId(data.id)}
            className="text-sm text-blue-500 hover:underline"
          >
            {expandedId === data.id ? "Collapse" : <Pencil size={22} />}
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700" // Tailwind classes for red color
            aria-label="Delete item" // Good for accessibility
          >
            <Trash size={20} /> {/* The delete icon */}
          </button>
        </div>
      </div>

      {expandedId === data.id && (
        <div className="mt-2 grid grid-cols-3 gap-3">
          {/* Address search field */}
          <div className="relative col-span-3">
            <input
              type="text"
              className="w-full cursor-pointer rounded border bg-gray-50 p-2 pr-16 text-sm hover:bg-gray-100"
              value={
                addressSearchData?.data?.formatted_address ||
                "Click to search address"
              }
              placeholder="Click to search and select address"
              readOnly
            />
            <button
              type="button"
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded bg-orange-500 px-3 py-1 text-xs text-white hover:bg-orange-600"
              onClick={() => setShowSearchView(true)}
            >
              Edit
            </button>
          </div>

          {/* Editable fields */}
          <div className="col-span-3">
            <input
              type="text"
              className={`w-full rounded border p-2 text-sm ${
                validationErrors.name ? "border-red-500" : ""
              }`}
              value={editAddress?.name ?? ""}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              placeholder="Name *"
            />
            {validationErrors.name && (
              <p className="mt-1 text-xs text-red-500">
                {validationErrors.name}
              </p>
            )}
          </div>

          <div className="col-span-3">
            <input
              type="text"
              className={`w-full rounded border p-2 text-sm ${
                validationErrors.phone_number ? "border-red-500" : ""
              }`}
              value={editAddress?.phone_number ?? ""}
              onChange={(e) =>
                handleFieldChange("phone_number", e.target.value)
              }
              placeholder="Phone Number (+91XXXXXXXXXX) *"
            />
            {validationErrors.phone_number && (
              <p className="mt-1 text-xs text-red-500">
                {validationErrors.phone_number}
              </p>
            )}
          </div>

          <div className="col-span-3">
            <input
              type="text"
              className={`w-full rounded border p-2 text-sm ${
                validationErrors.address_line1 ? "border-red-500" : ""
              }`}
              value={
                isEditing
                  ? (editAddress?.address_line1 ?? "")
                  : data.address_line1
              }
              onChange={(e) =>
                handleFieldChange("address_line1", e.target.value)
              }
              disabled={!isEditing}
              placeholder="Address Line 1 *"
            />
            {validationErrors.address_line1 && (
              <p className="mt-1 text-xs text-red-500">
                {validationErrors.address_line1}
              </p>
            )}
          </div>

          <input
            type="text"
            className="col-span-3 rounded border p-2 text-sm"
            value={
              isEditing
                ? (editAddress?.address_line2 ?? "")
                : data.address_line2
            }
            disabled={!isEditing}
            onChange={(e) => handleFieldChange("address_line2", e.target.value)}
            placeholder="Address Line 2"
          />

          <input
            type="text"
            className="col-span-3 rounded border p-2 text-sm"
            value={isEditing ? (editAddress?.landmark ?? "") : data.landmark}
            onChange={(e) => handleFieldChange("landmark", e.target.value)}
            disabled={!isEditing}
            placeholder="Landmark"
          />

          <input
            type="text"
            className="col-span-1 rounded border p-2 text-sm"
            value={extracted.city}
            placeholder="City"
            readOnly
          />
          <input
            type="text"
            className="col-span-1 rounded border p-2 text-sm"
            value={extracted.state}
            placeholder="State"
            readOnly
          />
          <input
            type="text"
            className="col-span-1 rounded border p-2 text-sm"
            value={extracted.pincode}
            placeholder="Pincode"
            readOnly
          />

          {/* Default Address Checkbox */}
          <div className="col-span-3 flex items-center gap-2">
            <input
              type="checkbox"
              id={`default-${data.id}`}
              className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              checked={editAddress?.is_default || false}
              onChange={(e) => handleFieldChange("is_default", e.target.checked)}
              disabled={!isEditing}
            />
            <label 
              htmlFor={`default-${data.id}`} 
              className="text-sm text-gray-700"
            >
              Mark this address as default
            </label>
          </div>

          {/* Action buttons */}
          <div className="col-span-3 mt-2 flex gap-2">
            <button
              className="rounded bg-orange-500 px-4 py-2 text-sm text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => handleSaveAddress(data.id)}
              disabled={!isEditing}
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
            <button
              className="rounded bg-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-400"
              onClick={() => {
                setExpandedId(null);
                setValidationErrors({});
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressCard;