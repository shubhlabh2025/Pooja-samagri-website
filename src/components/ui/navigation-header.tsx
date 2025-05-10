import React, { useState } from "react";
import Logo from "./logo-text";
import SearchBar from "./search-bar";
import TextWithIcons from "./text-Icon";
import OverflowMenu from "./overflow-menu";
import { MapPin, ShoppingCart, User, Menu } from "lucide-react";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow px-4 py-3">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        {/* Top Row: Logo + Hamburger */}
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
        <div className="hidden sm:flex items-center text-sm space-x-6 pr-2">
          <TextWithIcons
            icon={<User size={18} />}
            text="Login"
            onClick={() => {}}
          />
          <TextWithIcons
            icon={<ShoppingCart size={18} />}
            text="Cart"
            onClick={() => {}}
          />
          <TextWithIcons
            icon={<MapPin size={18} />}
            text="Update Location"
            onClick={() => {}}
          />
          <OverflowMenu />
        </div>

        {/* Mobile Menu (below search bar) */}
        {menuOpen && (
          <div className="flex flex-col gap-3 sm:hidden pt-2 border-t">
            <TextWithIcons icon={<User size={18} />} text="Login" />
            <TextWithIcons icon={<ShoppingCart size={18} />} text="Cart" />
            <TextWithIcons icon={<MapPin size={18} />} text="Update Location" />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
