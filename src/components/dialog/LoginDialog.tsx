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

const LoginDialog = () => {
  const [isOtpScreen, setIsOtpScreen] = useState(false);
  const [showResend, setShowResend] = useState(true);
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
    <DialogContent className="sm:max-w-[700px] p-0 border-0 m-0">
      <DialogTitle asChild>
        <VisuallyHidden>Login Modal</VisuallyHidden>
      </DialogTitle>
      <ResizablePanelGroup direction="horizontal" className="p-0">
        <ResizablePanel
          defaultSize={45}
          className="rounded-l-lg p-0 hidden sm:block"
        >
          <div className="flex flex-col py-10 px-8  bg-[#2874f0]">
            <span className="font-medium text-[#dbdbdb] text-2xl">LOGIN</span>
            <p className="mt-4">
              <span className="font-normal text-[#dbdbdb]">
                Get access to your Orders, Wishlist and Recommendations
              </span>
            </p>
            <div className="w-full pt-15">
              <img
                className="w-full"
                src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png"
                alt=""
              />
            </div>
          </div>
        </ResizablePanel>
        <ResizablePanel defaultSize={55}>
          <>
            <div className="relative h-full pb-5 overflow-hidden">
              <div
                className={`h-full absolute top-0 left-0 w-full transition-transform duration-300 ${
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
                    className="pt-12 px-5 h-full flex flex-col"
                  >
                    <FormField
                      control={form.control}
                      name="mobileNumber"
                      render={({ field }) => (
                        <FormItem className="gap-0">
                          <FormLabel className="text-[#878787] text-xs pb-0">
                            Mobile Number
                          </FormLabel>
                          <FormControl>
                            <div className="group flex flex-col">
                              <div className="flex items-center gap-2">
                                <p className="text-black text-sm">+91</p>
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
                                  className="flex-1 rounded-none border-none shadow-none p-0 focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 selection:bg-blue-200 selection:text-blue-900"
                                />
                              </div>
                              <div className="h-[1.5px] w-full bg-gray-300 transition-colors duration-200 group-focus-within:bg-blue-500" />
                              <FormMessage />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-col justify-between h-full pb-5">
                      <Button
                        type="submit"
                        className="mt-4 w-full bg-[#fb641b] hover:bg-[#e65a12] text-white font-semibold py-2 rounded-md transition-colors duration-200"
                        disabled={isOtpScreen}
                      >
                        Request OTP
                      </Button>
                      <span className="text-[#878787] text-[12px]">
                        By continuing, you agree to{" "}
                        <span className="text-blue-600 cursor-pointer underline">
                          Terms of Use
                        </span>{" "}
                        and{" "}
                        <span className="text-blue-600 cursor-pointer underline">
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
                <div className="pt-12 px-5 h-full flex flex-col items-center">
                  <div className="flex items-center justify-center px-10 text-center">
                    <p className="text-sm text-[#212121] font-medium">
                      Please enter the OTP sent to <span>{mobileValue} </span>
                      <span
                        onClick={() => {
                          setIsOtpScreen(false);
                        }}
                        className="text-blue-600 text-sm underline cursor-pointer"
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
                      <InputOTPGroup className="w-full flex mt-5 gap-1">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <InputOTPSlot
                            key={i}
                            index={i}
                            className="text-xl h-11 text-center grow shadow-none border-b border-gray-500 focus:border-blue-500 focus:ring-0"
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
                      className="w-full bg-[#fb641b] hover:bg-[#e65a12] text-white font-semibold py-2 rounded-md transition-colors duration-200 mt-5"
                    >
                      Verify
                    </Button>
                  </div>

                  <p className="text-sm mt-2">
                    Not received your code?{" "}
                    {showResend ? (
                      <span className="text-[#fb641b] font-semibold">
                        {resendCooldown}s
                      </span>
                    ) : (
                      <span
                        onClick={handleResend}
                        className="text-[#fb641b] font-semibold cursor-pointer hover:text-[#e65a12] transition-colors"
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
