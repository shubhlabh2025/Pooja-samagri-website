import Logo from "@/components/custom/Logo";
import TextWithIcons from "../custom/TextIcon";
import SearchBar from "../custom/SearchBar";
import { useState } from "react";
import { MapPin, Menu, ShoppingCart, User } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import LoginDialog from "../dialog/LoginDialog";
import { useNavigate } from "react-router";

const HomeNavBar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLoginClick = () => {
    // Handle login click logic here
    console.log("Login clicked");
  };

  return (
    <header className=" px-4 py-3 shadow">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Top Row: Menu + Logo */}
        <div className="relative flex w-full items-center justify-between sm:w-auto">
          {/* Menu Icon - Left on small screens */}
          <button
            className="sm:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu"
          >
            <Menu size={24} />
          </button>

          {/* Logo - Centered absolutely on small screens */}
          <div className="absolute left-1/2 -translate-x-1/2 sm:static sm:translate-x-0">
            <Logo />
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full sm:flex-grow">
          <SearchBar />
        </div>

        {/* Desktop Menu */}
        <div className="hidden items-center space-x-6 pr-2 text-sm sm:flex">
          <Dialog>
            <DialogTrigger>
              <TextWithIcons
                icon={<User size={18} />}
                text="Login"
                onClick={handleLoginClick}
              />
            </DialogTrigger>
            <LoginDialog />
          </Dialog>

          <TextWithIcons
            icon={<MapPin size={18} />}
            text="Update Location"
            onClick={() => {
              console.log("clicked");
              navigate("/address");
            }}
          />
        </div>

        {/* Mobile Menu (below search bar) */}
        {menuOpen && (
          <div className="flex flex-col gap-3 border-t pt-2 sm:hidden">
            <TextWithIcons
              icon={<User size={18} />}
              text="Login"
              onClick={handleLoginClick}
            />
            <TextWithIcons icon={<ShoppingCart size={18} />} text="Cart" />
            <div
              onClick={() => {
                console.log("clicked");
                navigate("/address");
              }}
            >
              <TextWithIcons
                icon={<MapPin size={18} />}
                text="Update Location"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default HomeNavBar;
