import emptyOrderImage from "@/assets/no_products.png";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const EmptyOrder = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-e-black bg-white px-2 py-3">
        <div className="flex items-center gap-2">
          <ChevronLeft
            size={20}
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <p className="line-clamp-1 text-lg leading-[21px] font-semibold -tracking-[0.4px] text-[#02060cbf]">
            Your Orders
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <img loading="lazy"
          src={emptyOrderImage}
          alt="Empty Cart"
          className="mb-6 w-32 md:w-48"
        />
        <p className="mb-1 text-lg font-semibold text-gray-800">
          You haven't do any Order yet
        </p>
        <p className="mb-6 text-sm text-gray-600">
          Fill it up with all things good!
        </p>
        <Link to="/">
          <Button variant="outline">Browse Products</Button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyOrder;
