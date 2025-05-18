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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import loginModalImage from "@/assets/loginModalBackground.png";

const LoginDialog = () => {
  const [isOtpScreen, setIsOtpScreen] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [mobileValue, setMobileValue] = useState("");
  const [resendCooldown, setResendCooldown] = useState(30);

  const FormSchema = z.object({
    mobileNumber: z
      .string()
      .trim()
      .regex(/^\d{10}$/, {
        message: "Please enter a valid 10-digit mobile number",
      }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      mobileNumber: "",
    },
  });

  const handleResend = () => {
    console.log("Resend code triggered");
    setShowResend(true);
    setResendCooldown(30);
    // Add resend OTP API logic here
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
    <DialogContent className="m-0 border-0 p-0 sm:max-w-[700px]">
      <DialogTitle asChild>
        <VisuallyHidden>Login Modal</VisuallyHidden>
      </DialogTitle>
      <ResizablePanelGroup direction="horizontal" className="p-0">
        <ResizablePanel
          defaultSize={45}
          className="hidden rounded-l-lg p-0 sm:block"
        >
          <div className="flex flex-col bg-[#2874f0] px-8 py-10">
            <span className="text-2xl font-medium text-[#dbdbdb]">LOGIN</span>
            <p className="mt-4">
              <span className="font-normal text-[#dbdbdb]">
                Get access to your Orders, Wishlist and Recommendations
              </span>
            </p>
            <div className="w-full pt-15">
              <img className="w-full" src={loginModalImage} alt="" />
            </div>
          </div>
        </ResizablePanel>
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
                    onSubmit={form.handleSubmit((data) => {
                      setMobileValue(data.mobileNumber);
                      setIsOtpScreen(true);
                      setShowResend(false);
                      setTimeout(() => setShowResend(true), 30000);
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
                    <div className="flex h-full flex-col justify-between pb-5">
                      <Button
                        type="submit"
                        className="mt-4 w-full rounded-md bg-[#fb641b] py-2 font-semibold text-white transition-colors duration-200 hover:bg-[#e65a12]"
                        disabled={isOtpScreen}
                      >
                        Request OTP
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
                <div className="flex h-full flex-col items-center px-5 pt-12">
                  <div className="flex items-center justify-center px-10 text-center">
                    <p className="text-sm font-medium text-[#212121]">
                      Please enter the OTP sent to <span>{mobileValue} </span>
                      <span
                        onClick={() => {
                          setIsOtpScreen(false);
                        }}
                        className="cursor-pointer text-sm text-blue-600 underline"
                      >
                        Change
                      </span>
                    </p>
                  </div>

                  <div className="mt-6 w-full px-8">
                    <InputOTP
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                      className="w-full gap-0"
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
                    <Button
                      type="button"
                      onClick={() => {
                        console.log("Verify button clicked");
                        // Add your OTP verification logic here
                      }}
                      className="mt-5 w-full rounded-md bg-[#fb641b] py-2 font-semibold text-white transition-colors duration-200 hover:bg-[#e65a12]"
                    >
                      Verify
                    </Button>
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
                </div>
              </div>
            </div>
          </>
        </ResizablePanel>
      </ResizablePanelGroup>
    </DialogContent>
  );
};

export default LoginDialog;
