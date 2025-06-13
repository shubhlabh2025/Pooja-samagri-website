import { useNavigate } from "react-router-dom";
import  NotFoundImage  from "../../assets/noresults.png";
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative z-100 flex flex-1 h-full flex-col items-center justify-center bg-orange-50 px-4">
      {/* Back Arrow */}

      {/* Image */}
      <div className="mb-6 h-40 w-40">
        <img
          src={NotFoundImage}
          alt="No data"
          className="h-full w-full object-contain"
        />
      </div>

      {/* Text */}
      <h1 className="mb-1 text-xl font-bold text-orange-600">Oops!</h1>
      <p className="mb-6 text-sm text-gray-600">You are on invalid page!</p>

      {/* Button */}
      <button
        onClick={() => navigate("/")}
        className="rounded-full bg-orange-500 px-6 py-2 font-semibold text-white transition hover:bg-orange-600"
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
