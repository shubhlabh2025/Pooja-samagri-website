import  ErrorImage  from "../../assets/alert.png";

const ErrorScreen = () => {

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center bg-orange-50 px-4 z-100">
      {/* Back Arrow */}


      {/* Image */}
      <div className="w-40 h-40 mb-6">
        <img
          src={ErrorImage}
          alt="No data"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Text */}
      <h1 className="text-xl font-bold text-orange-600 mb-1">Oops!</h1>
      <p className="text-gray-600 text-sm mb-6">Something Went wrong!</p>

      {/* Button */}
    
    </div>
  );
};

export default ErrorScreen;
