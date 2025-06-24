import React, { useState } from "react";

interface RenderUserInputsProps {
  onSaveCallback?: () => void;
}

export const RenderUserInputs: React.FC<RenderUserInputsProps> = ({
  onSaveCallback,
}) => {
  const [gender, setGender] = useState("male");

  return (
    <div className="mt-4 space-y-4">
      {/* Phone Number (non-editable) */}
      <div>
        <label className="mb-1 block text-sm font-medium">Phone Number</label>
        <input
          type="text"
          value="+91 9876543210"
          disabled
          className="w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-600 outline-none"
        />
      </div>

      {/* Name Inputs */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="mb-1 block text-sm font-medium">First Name</label>
          <div className="relative">
            <input
              type="text"
              defaultValue="Active"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none"
            />
          </div>
        </div>
        <div className="flex-1">
          <label className="mb-1 block text-sm font-medium">Last Name</label>
          <input
            type="text"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none"
          />
        </div>
      </div>

      {/* Gender Selection */}
      <div>
        <label className="mb-1 block text-sm font-medium">Gender</label>
        <div className="flex gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={() => setGender("male")}
              className="accent-pink-600"
            />
            Male
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={() => setGender("female")}
              className="accent-pink-600"
            />
            Female
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onSaveCallback}
          className="rounded-md bg-[#ff5200] px-5 py-2 text-sm font-semibold text-white hover:bg-[#e64800]"
        >
          Save
        </button>
      </div>
    </div>
  );
};
