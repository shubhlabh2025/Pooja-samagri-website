import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubCategoriesWithProductSkeleton } from "@/components/custom/skeletons/SubCategoriesWithProductSkeleton";
import {
  useGetUserDetailsQuery,
  useUpdateUserDetailsMutation,
  useUpdateUserEmailMutation,
  useVerifyEmailMutation,
} from "@/features/user/userApi";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

// 1. User Form Schema
const userSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  gender: z.enum(["male", "female"]),
});

type UserFormData = z.infer<typeof userSchema>;

// 2. OTP Schema
const otpSchema = z.object({
  otpCode: z
    .string()
    .trim()
    .length(6, { message: "OTP must be exactly 6 digits" })
    .regex(/^\d{6}$/, { message: "OTP must contain only digits" }),
});

export const RenderUserInputs = () => {
  const { data: userData, isLoading: userLoading } = useGetUserDetailsQuery();
  const [updateUserDetails] = useUpdateUserDetailsMutation();
  const [emailError, setEmailError] = useState("");

  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailEditable, setIsEmailEditable] = useState(false);

  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otpCode: "",
    },
  });

  const userForm = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      gender: "male",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = userForm;

  useEffect(() => {
    if (userData?.data) {
      const { first_name, last_name, gender, email: userEmail } = userData.data;
      setValue("first_name", first_name);
      setValue("last_name", last_name);
      setValue("gender", gender || "male");
      setEmail(userEmail);
      if (userData?.data?.email) {
        setEmail(userData.data.email);
        setIsEmailEditable(false); // default: not editable if email exists
      } else {
        setIsEmailEditable(true); // editable if no email
      }
    }
  }, [userData, setValue]);
  const [requestOtp] = useVerifyEmailMutation();
  const [updateEmail] = useUpdateUserEmailMutation();

  const sendOTP = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailError("");
    requestOtp({
      email: email,
    });

    setIsOtpVisible(true);
  };

  const verifyEmailOTP = () => {
    const otpValue = otpForm.getValues("otpCode");

    if (otpValue.length === 6) {
      setIsOtpVisible(false);
      updateEmail({
        email: email,
        otp_code: otpValue,
      });
    }
  };

  const onSubmit = (formData: UserFormData) => {
    if (!userData?.data?.id) return;

    updateUserDetails({
      id: userData.data.id,
      ...formData,
      phone_number: userData.data.phone_number,
      email,
    });
  };

  const renderOtpForm = () => (
    <FormProvider {...otpForm}>
      <div className="w-full max-w-md">
        <FormField
          control={otpForm.control}
          name="otpCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  className="w-full justify-center gap-1"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                >
                  <InputOTPGroup className="mt-4 flex justify-between gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className="h-12 w-10 rounded border-b border-gray-500 text-center text-xl shadow-none focus:border-blue-500 focus:ring-0"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={otpForm.watch("otpCode")?.length !== 6}
          className="mt-5 w-full rounded-md bg-[#fb641b] py-2 font-semibold text-white transition-colors duration-200 hover:bg-[#e65a12]"
          onClick={verifyEmailOTP}
        >
          Verify
        </Button>
      </div>
    </FormProvider>
  );

  const renderEmailInput = () => (
    <div className="w-full max-w-md">
      <label className="mb-1 block text-sm font-medium">Email address</label>

      {!isOtpVisible ? (
        <div className="relative">
          <input
            type="email"
            value={email}
            disabled={!isEmailEditable}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full rounded-md border border-gray-300 px-3 py-2 pr-28 text-sm outline-none ${
              !isEmailEditable ? "cursor-not-allowed bg-gray-100" : ""
            }`}
          />
          {!userData?.data?.email || isEmailEditable ? (
            <button
              type="button"
              onClick={sendOTP}
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded bg-[#ff5200] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#e64800]"
            >
              Verify
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setIsEmailEditable(true);
              }}
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded bg-[#ff5200] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#e64800]"
            >
              Edit
            </button>
          )}
        </div>
      ) : (
        <p className="rounded-md border bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700">
          {email}
        </p>
      )}
      {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
      {isOtpVisible && <div className="mt-6">{renderOtpForm()}</div>}
    </div>
  );

  if (userLoading) {
    return <SubCategoriesWithProductSkeleton isSideBarVisible={false} />;
  }

  return (
    <>
      {renderEmailInput()}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
        {/* Phone Number (non-editable) */}
        <div>
          <label className="mb-1 block text-sm font-medium">Phone Number</label>
          <input
            type="text"
            value={`+91 ${userData?.data.phone_number}`}
            disabled
            className="w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-600 outline-none"
          />
        </div>

        {/* Name Inputs */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="mb-1 block text-sm font-medium">First Name</label>
            <input
              type="text"
              {...register("first_name")}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none"
            />
            {errors.first_name && (
              <p className="text-sm text-red-500">
                {errors.first_name.message}
              </p>
            )}
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-sm font-medium">Last Name</label>
            <input
              type="text"
              {...register("last_name")}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none"
            />
            {errors.last_name && (
              <p className="text-sm text-red-500">{errors.last_name.message}</p>
            )}
          </div>
        </div>

        {/* Gender Selection */}
        <div>
          <label className="mb-1 block text-sm font-medium">Gender</label>
          <div className="flex gap-4 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="male"
                {...register("gender")}
                checked={watch("gender") === "male"}
                className="accent-pink-600"
              />
              Male
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="female"
                {...register("gender")}
                checked={watch("gender") === "female"}
                className="accent-pink-600"
              />
              Female
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="rounded-md bg-[#ff5200] px-5 py-2 text-sm font-semibold text-white hover:bg-[#e64800]"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};
