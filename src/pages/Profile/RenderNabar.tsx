import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RenderNavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-10 flex h-[60px] items-center gap-4 border-b bg-white px-4 py-3 shadow-sm">
      <button onClick={() => navigate(-1)}>
        <ChevronLeft size={24} />
      </button>
      <h1 className="text-lg font-semibold">Account Settings</h1>
    </nav>
  );
};

export default RenderNavBar;
