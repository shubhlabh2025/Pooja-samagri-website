import { useEffect } from "react";
import { useNavigate } from "react-router";

const OrderFailure = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
      <div className="text-center">
        <div className="relative mb-8">
          {/* Failure X Animation */}
          <div className="relative mx-auto h-32 w-32">
            <div className="absolute inset-0 animate-pulse rounded-full bg-red-500"></div>
            <div className="absolute inset-2 rounded-full bg-red-400"></div>
            <div className="absolute inset-4 flex items-center justify-center rounded-full bg-white">
              <svg
                className="h-16 w-16 animate-bounce text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="animate-fadeIn">
          <h1 className="mb-4 text-4xl font-bold text-red-800">
            Payment Failed!
          </h1>
          <p className="mb-6 text-xl text-red-700">Something went wrong</p>
          <p className="mb-8 text-gray-600">
            Your payment could not be processed. Please try again later.
          </p>

          <div className="mx-auto mt-8 max-w-md rounded-lg bg-white p-4 shadow-lg">
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              What happened?
            </h3>
            <p className="text-sm text-gray-600">
              The payment verification failed or was cancelled.
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

export default OrderFailure;
