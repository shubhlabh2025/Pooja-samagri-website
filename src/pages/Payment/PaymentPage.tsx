import { useVerifyPaymentMutation } from "@/features/orders/orderAPI";
import type {
  OrderData,
  RazorpayPaymentResponse,
} from "@/features/orders/orderAPI.type";
import { useGetUserDetailsQuery } from "@/features/user/userApi";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: userData, isLoading: userLoading } = useGetUserDetailsQuery();

  const [verifyPayment, { isLoading: isVerifying }] =
    useVerifyPaymentMutation();

  // Extract orderData from navigation state
  const orderData: OrderData = location.state.orderData;
  console.log("Order data:", orderData);
  const orderId = orderData.id;

  useEffect(() => {


    if (!userLoading && userData) {
      initiatePayment();
    }
  }, [userLoading, userData, orderData, navigate]);

  const handlePaymentSuccess = async (response: RazorpayPaymentResponse) => {
    console.log("Payment response:", response);

    if (response.razorpay_payment_id) {
      try {
        // Verify payment signature
        const verificationResult = await verifyPayment(response).unwrap();

        if (verificationResult.success) {
          window.location.replace("/");

          navigate("/", { replace: true });
        } else {
          // Show failure animation
          navigate("../order-failure", { replace: true });
        }
      } catch (error) {
        console.error("Payment verification failed:", error);
        // Show failure animation
        navigate("../order-failure", { replace: true });
      }
    } else {
      // Show failure animation
      //   navigate("/", { replace: true });
      //   navigate("/order-failure");
    }
  };

  const handlePaymentFailure = () => {
    window.location.replace("/");

    navigate("/", { replace: true });
  };

  const initiatePayment = () => {
    const options = {
      key: "rzp_live_QlYKhrECsIZWRI",
      currency: "INR",
      name: "Shubh Labh",
      description: "Test Transaction",
      image:
        "https://assets.shubhlabhpoojasamagri.com/767fdcf4-48c8-433d-bc02-c2959e5b114b.png",
      order_id: orderId,
      handler: handlePaymentSuccess,
      modal: {
        ondismiss: handlePaymentFailure,
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: userData?.data.first_name ?? "", //your customer's name
        email: userData?.data.email ?? "",
        contact: userData?.data.phone_number, //Provide the customer's phone number for better conversion rates
      },
      theme: {
        color: "#ff5200",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  if (isVerifying) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="text-center">
          <div className="mx-auto mb-6 h-24 w-24">
            <div className="h-24 w-24 animate-spin rounded-full border-b-4 border-blue-500"></div>
          </div>
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            {isVerifying ? "Verifying Payment..." : "Payment in Progress"}
          </h2>
          <p className="text-gray-600">
            {isVerifying
              ? "Please wait while we verify your payment..."
              : "Please complete your payment in the popup window..."}
          </p>
        </div>
      </div>
    );
  }

  return <div className=""></div>;
};

export default PaymentPage;
