import emptyCartImage from "@/assets/emptyCart.svg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center px-4 text-center">
      <img
        src={emptyCartImage}
        alt="Empty Cart"
        className="mb-6 w-32 md:w-48"
      />
      <p className="mb-1 text-lg font-semibold text-gray-800">
        Your cart is getting lonely
      </p>
      <p className="mb-6 text-sm text-gray-600">
        Fill it up with all things good!
      </p>
      <Link to="/">
        <Button variant="outline">Browse Products</Button>
      </Link>
    </div>
  );
};

export default EmptyCart;
