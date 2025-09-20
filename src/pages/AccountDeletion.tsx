import React, { useState } from "react";
import axios, { AxiosError } from "axios";

// A type alias for the different states the form can be in.
type FormStatus = 'idle' | 'loading' | 'success' | 'error';

// A type for the expected error structure from your API.
interface ApiErrorResponse {
  error: string;
  // You can add other properties your API might return on error.
}

const AccountDeletion: React.FC = () => {
  // State to manage form inputs and submission status with TypeScript types.
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);

  // Type the event object for the mobile number input handler.
  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMobileNumber(value);
    const indianMobileRegex = /^[6-9]\d{9}$/;
    if (indianMobileRegex.test(value)) {
      setIsValid(true);
      setError(null); // Clear previous errors
    } else {
      setIsValid(false);
    }
  };

  // Type the event object for the form submission handler.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default page reload

    if (!isValid) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setStatus("loading");
    setError(null);

    try {
      // API Call to your backend. The request body is implicitly typed.
      const response = await axios.post("/api/accounts/delete", {
        phone_number: mobileNumber,
      });

      if (response.status === 200) {
        setStatus("success");
      }
    } catch (err) {
      setStatus("error");
      // Use the AxiosError type for safe error handling.
      const axiosError = err as AxiosError<ApiErrorResponse>;
      const errorMessage = axiosError.response?.data?.error || "An unexpected error occurred.";
      setError(errorMessage);
    }
  };

  // If submission is successful, show a success message.
  if (status === "success") {
    return (
      <div className="flex flex-col p-4 items-center text-center max-w-lg mx-auto bg-green-100 text-green-800 border border-green-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-2">Request Submitted!</h2>
        <p>Your account deletion request has been received. We will process it and get back to you within 7 business days.</p>
      </div>
    );
  }

  // Render the form. JSX is the same as in the .jsx file.
  return (
    <div className="flex flex-col p-4 max-w-lg mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <h1 className="text-2xl font-bold text-center mb-2">Request Account Deletion</h1>
        <p className="text-center text-gray-600 mb-6">We're sorry to see you go. Please fill out the form below.</p>
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="mobile" className="block font-semibold text-gray-700 mb-2">Mobile Number:</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              placeholder="Enter your registered 10-digit mobile number"
              required
              value={mobileNumber}
              onChange={handleMobileChange}
              className={`w-full px-3 py-2 border rounded-md ${!isValid && mobileNumber.length > 0 ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="reason" className="block font-semibold text-gray-700 mb-2">Reason for Deletion:</label>
            <select
              id="reason"
              name="reason"
              required
              value={reason}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>-- Please select a reason --</option>
              <option value="no_longer_use">I no longer use the service.</option>
              <option value="privacy_concerns">I have privacy concerns.</option>
              <option value="app_not_useful">The app is not useful for me.</option>
              <option value="switching_service">I am switching to another service.</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="comment" className="block font-semibold text-gray-700 mb-2">Optional Comments:</label>
            <textarea
              id="comment"
              name="comment"
              placeholder="Your feedback is valuable to us..."
              value={comment}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Display API or validation error message */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          
          <div className="text-center">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-red-600 text-white py-3 px-4 rounded-md font-bold hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Submitting...' : 'Submit Deletion Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountDeletion;