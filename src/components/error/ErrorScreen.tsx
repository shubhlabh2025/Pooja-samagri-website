import ErrorImage from "../../assets/alert.png";

const ErrorScreen = () => {
  return (
    <div className="relative z-100 flex h-full flex-1 flex-col items-center justify-center bg-orange-50 px-4">
      {/* Back Arrow */}

      {/* Image */}
      <div className="mb-6 h-40 w-40">
        <img
          src={ErrorImage}
          alt="No data"
          className="h-full w-full object-contain"
        />
      </div>

      {/* Text */}
      <h1 className="mb-1 text-xl font-bold text-orange-600">Oops!</h1>
      <p className="mb-6 text-sm text-gray-600">Something Went wrong!</p>

      {/* Button */}
    </div>
  );
};

export default ErrorScreen;
