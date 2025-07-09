import { Button } from "@/components/ui/button";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-separator";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import loginModalImage from "@/assets/loginModal.jpg";
import {
  useRequestOtpMutation,
  useVerifyOtpMutation,
} from "@/features/auth/authAPI";
import { DialogClose } from "@radix-ui/react-dialog";

const LoginDialog = () => {
  const [isOtpScreen, setIsOtpScreen] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [mobileValue, setMobileValue] = useState("");
  const [resendCooldown, setResendCooldown] = useState(30);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  const [requestOtp, { isLoading: isRequestingOtp }] = useRequestOtpMutation();
  const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();

  const FormSchema = z.object({
    mobileNumber: z
      .string()
      .trim()
      .regex(/^\d{10}$/, {
        message: "Please enter a valid 10-digit mobile number",
      }),
  });

  const otpSchema = z.object({
    otpCode: z
      .string()
      .trim()
      .length(6, { message: "OTP must be exactly 6 digits" })
      .regex(/^\d{6}$/, { message: "OTP must contain only digits" }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      mobileNumber: "",
    },
  });

  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otpCode: "",
    },
  });

  const handleResend = async () => {
    setRequestError(null);
    try {
      const result = await requestOtp({
        phone_number: `+91${mobileValue}`,
      }).unwrap();
      if (result.success) {
        setShowResend(true);
        setResendCooldown(30);
      } else {
        setRequestError(
          result.message || "Failed to send OTP. Please try again.",
        );
      }
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      setRequestError("Failed to send OTP. Please try again after sometime.");
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (showResend) {
      interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setShowResend(false); // switch back to clickable resend
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval); // clean up
  }, [showResend]);

  return (
    <DialogContent
      className="m-0 border-0 p-0 sm:max-w-[750px]"
      aria-describedby={undefined}
    >
      <DialogTitle asChild>
        <VisuallyHidden>Login Modal</VisuallyHidden>
      </DialogTitle>
      <ResizablePanelGroup direction="horizontal" className="p-0">
        <ResizablePanel
          defaultSize={45}
          className="hidden rounded-l-lg p-0 sm:block"
        >
          <div className="flex flex-col ">
            <div className="w-full">
              <img className="w-full h-[325px] aspect-square relative" src={loginModalImage} alt="" />
            </div>
            <span className="px-5 pt-5 text-2xl font-medium absolute text-white">LOGIN</span>
          </div>
        </ResizablePanel>
        {/* <ResizableHandle />  */}
        <ResizablePanel defaultSize={55}>
          <>
            <div className="relative h-full overflow-hidden pb-5">
              <div
                className={`absolute top-0 left-0 h-full w-full transition-transform duration-300 ${
                  isOtpScreen ? "-translate-x-full" : "translate-x-0"
                }`}
              >
                {/* Mobile Number Form */}
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(async (data) => {
                      setMobileValue(data.mobileNumber);
                      setRequestError(null);
                      try {
                        await requestOtp({
                          phone_number: `+91${data.mobileNumber}`,
                        }).unwrap();

                        setIsOtpScreen(true);
                        setShowResend(true);
                        setResendCooldown(30);
                      } catch {
                        setRequestError(
                          "Failed to send OTP. Please try again after sometime.",
                        );
                      }
                    })}
                    className="flex h-full flex-col px-5 pt-12"
                  >
                    <FormField
                      control={form.control}
                      name="mobileNumber"
                      render={({ field }) => (
                        <FormItem className="gap-0">
                          <FormLabel className="pb-0 text-xs text-[#878787]">
                            Mobile Number
                          </FormLabel>
                          <FormControl>
                            <div className="group flex flex-col">
                              <div className="flex items-center gap-2">
                                <p className="text-sm text-black">+91</p>
                                <Separator
                                  orientation="vertical"
                                  className="!h-[70%] !w-[1.5px] !bg-gray-300"
                                />
                                <Input
                                  placeholder="Enter mobile number"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    setMobileValue(e.target.value);
                                    if (requestError) {
                                      setRequestError(null);
                                    }
                                  }}
                                  className="flex-1 rounded-none border-none p-0 shadow-none selection:bg-blue-200 selection:text-blue-900 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
                                />
                              </div>
                              <div className="h-[1.5px] w-full bg-gray-300 transition-colors duration-200 group-focus-within:bg-blue-500" />
                              <FormMessage />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {requestError && (
                      <p className="mt-2 text-sm text-red-600">
                        {requestError}
                      </p>
                    )}
                    <div className="flex h-full flex-col justify-between pb-5">
                      <Button
                        type="submit"
                        className="mt-4 w-full rounded-md bg-[#fb641b] py-2 font-semibold text-white transition-colors duration-200 hover:bg-[#e65a12]"
                        disabled={isRequestingOtp}
                      >
                        {isRequestingOtp ? "Requesting..." : "Request OTP"}
                      </Button>
                      <span className="text-[12px] text-[#878787]">
                        By continuing, you agree to{" "}
                        <span className="cursor-pointer text-blue-600 underline">
                          Terms of Use
                        </span>{" "}
                        and{" "}
                        <span className="cursor-pointer text-blue-600 underline">
                          Privacy Policy
                        </span>
                        .
                      </span>
                    </div>
                  </form>
                </Form>
              </div>

              {/* OTP Form */}
              <div
                className={`transition-transform duration-300 ${
                  isOtpScreen ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <Form {...otpForm}>
                  <form
                    onSubmit={otpForm.handleSubmit(async (data) => {
                      setVerifyError(null);
                      try {
                        await verifyOtp({
                          phone_number: `+91${mobileValue}`,
                          otp_code: data.otpCode,
                        }).unwrap();
                        dialogCloseRef.current?.click();
                      } catch {
                        setVerifyError("Invalid OTP. Please try again.");
                      }
                    })}
                    className="flex h-full flex-col items-center px-5 pt-12"
                  >
                    <div className="flex items-center justify-center px-10 text-center">
                      <p className="text-sm font-medium text-[#212121]">
                        Please enter the OTP sent to{" "}
                        <span>+91{mobileValue}</span>{" "}
                        <span
                          onClick={() => {
                            setIsOtpScreen(false);
                            setVerifyError(null);
                          }}
                          className="cursor-pointer text-sm text-blue-600 underline"
                        >
                          Change
                        </span>
                      </p>
                    </div>

                    <div className="mt-6 w-full px-8">
                      <FormField
                        control={otpForm.control}
                        name="otpCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <InputOTP
                                maxLength={6}
                                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                                className="w-full gap-0"
                                value={field.value}
                                onChange={(value) => {
                                  field.onChange(value);
                                }}
                              >
                                <InputOTPGroup className="mt-5 flex w-full gap-1">
                                  {Array.from({ length: 6 }).map((_, i) => (
                                    <InputOTPSlot
                                      key={i}
                                      index={i}
                                      className="h-11 grow border-b border-gray-500 text-center text-xl shadow-none focus:border-blue-500 focus:ring-0"
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
                        disabled={
                          otpForm.watch("otpCode")?.length !== 6 ||
                          isVerifyingOtp
                        }
                        className="mt-5 w-full rounded-md bg-[#fb641b] py-2 font-semibold text-white transition-colors duration-200 hover:bg-[#e65a12]"
                      >
                        {isVerifyingOtp ? "Verifying..." : "Verify"}
                      </Button>

                      {verifyError && (
                        <p className="mt-2 text-center text-sm text-red-600">
                          {verifyError}
                        </p>
                      )}
                    </div>

                    <p className="mt-2 text-sm">
                      Not received your code?{" "}
                      {showResend ? (
                        <span className="font-semibold text-[#fb641b]">
                          {resendCooldown}s
                        </span>
                      ) : (
                        <span
                          onClick={handleResend}
                          className="cursor-pointer font-semibold text-[#fb641b] transition-colors hover:text-[#e65a12]"
                        >
                          Resend code
                        </span>
                      )}
                    </p>
                  </form>
                </Form>
              </div>
            </div>
          </>
        </ResizablePanel>
      </ResizablePanelGroup>
      <DialogClose asChild>
        <button ref={dialogCloseRef} className="hidden" />
      </DialogClose>
    </DialogContent>
  );
};

export default LoginDialog;
