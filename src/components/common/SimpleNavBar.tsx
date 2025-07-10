import type { SimpleNavBarProps } from "@/interfaces/simple-navbar-props";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

const SimpleNavBar = ({ navBarText }: SimpleNavBarProps) => {
  const navigate = useNavigate();
  return (
    <div className="shadow-cart-card flex items-center gap-2 bg-white p-3">
      <ChevronLeft
        size={20}
        className="cursor-pointer"
        onClick={() => navigate(-1)}
      />
      <p className="line-clamp-1 text-lg leading-[21px] font-semibold -tracking-[0.4px] text-[#02060cbf]">
        {navBarText}
      </p>
    </div>
  );
};

export default SimpleNavBar;
