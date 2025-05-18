import Logo from "@/components/custom/Logo";
import TextWithIcons from "../custom/TextIcon";
import OverflowMenu from "../custom/OverflowMenu";
import SearchBar from "../custom/SearchBar";
import { useState } from "react";
import { MapPin, Menu, ShoppingCart, User } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import LoginDialog from "../dialog/LoginDialog";
import { NavLink } from "react-router";

const HomeNavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLoginClick = () => {
    // Handle login click logic here
    console.log("Login clicked");
  };

  return (
    <header className="bg-white px-4 py-3 shadow">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-between">
          <Logo />
          <button
            className="sm:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Search Bar - Always Visible */}
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
          <NavLink to="/cart" end>
            <TextWithIcons
              icon={<ShoppingCart size={18} />}
              text="Cart"
              onClick={() => {}}
            />
          </NavLink>
          <TextWithIcons
            icon={<MapPin size={18} />}
            text="Update Location"
            onClick={() => {}}
          />
          <OverflowMenu />
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
            <TextWithIcons icon={<MapPin size={18} />} text="Update Location" />
          </div>
        )}
      </div>
    </header>
  );
};

export default HomeNavBar;
