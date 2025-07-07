import { useVerifyPaymentMutation } from "@/features/orders/orderAPI";
import type {
  OrderData,
  OrderResponse,
  RazorpayPaymentResponse,
} from "@/features/orders/orderAPI.type";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [verifyPayment, { isLoading: isVerifying }] =
    useVerifyPaymentMutation();

  // Extract orderData from navigation state
  const orderData = location.state?.orderData as OrderData;
  console.log("Order data:", orderData);
  const orderId = orderData?.id;

  useEffect(() => {
    // Check if orderData exists, if not redirect to error page
    if (!orderData || !orderId) {
      navigate("/order-failure", {
        state: { error: "Order data not found" },
      });
      return;
    }

    // Show initial animation for 2 seconds then start payment
    initiatePayment();
  }, [orderData, orderId]);

  const handlePaymentSuccess = async (response: RazorpayPaymentResponse) => {
    console.log("Payment response:", response);

    if (response.razorpay_payment_id) {
      try {
        // Verify payment signature
        const verificationResult = await verifyPayment(response).unwrap();

        if (verificationResult.success) {
          navigate("/order-success", {
            state: { paymentResponse: response },
          });
        } else {
          // Show failure animation
          navigate("/order-failure", {
            state: { error: "Payment ID not received" },
          });
        }
      } catch (error) {
        console.error("Payment verification failed:", error);
        // Show failure animation
        navigate("/order-failure", {
          state: { error: "Payment ID not received" },
        });
      }
    } else {
      // Show failure animation
      navigate("/order-failure", {
        state: { error: "Payment ID not received" },
      });
    }
  };

  const handlePaymentFailure = () => {
    navigate("/order-failure");
  };

  const initiatePayment = () => {
    const options = {
      key: "rzp_test_DyZbYSJNtcLwDW",
      currency: "INR",
      name: "Shubh Labh",
      description: "Test Transaction",
      image:
        "https://assets.shubhlabhpoojasamagri.com/767fdcf4-48c8-433d-bc02-c2959e5b114b.png",
      order_id: orderId,
      handler: handlePaymentSuccess,
      modal: {
        ondismiss: handlePaymentFailure,
        fullpage: true,
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
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
