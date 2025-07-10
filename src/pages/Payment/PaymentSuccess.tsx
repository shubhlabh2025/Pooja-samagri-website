import { useEffect } from "react";
import { useNavigate } from "react-router";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <div className="text-center">
        <div className="relative mb-8">
          {/* Success Checkmark Animation */}
          <div className="relative mx-auto h-32 w-32">
            <div className="absolute inset-0 animate-bounce rounded-full bg-green-500"></div>
            <div className="absolute inset-2 rounded-full bg-green-400"></div>
            <div className="absolute inset-4 flex items-center justify-center rounded-full bg-white">
              <svg
                className="h-16 w-16 animate-pulse text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="animate-fadeIn">
          <h1 className="mb-4 text-4xl font-bold text-green-800">
            Payment Successful!
          </h1>
          <p className="mb-6 text-xl text-green-700">
            Thank you for your order
          </p>
          <p className="mb-8 text-gray-600">
            Your order has been confirmed and will be processed shortly.
          </p>

          <div className="mx-auto mt-8 max-w-md rounded-lg bg-white p-4 shadow-lg">
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              Order Details
            </h3>
            <p className="text-sm text-gray-600">
              You will receive a confirmation email shortly.
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Redirecting to home in 5 seconds...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
