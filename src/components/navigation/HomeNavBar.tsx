import Logo from "@/components/custom/Logo";
import { useState, useEffect, useRef } from "react";
import {
  Info,
  MapPin,
  Phone,
  ShoppingBag,
  User,
  X,
  Search,
  Heart,
} from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import LoginDialog from "../dialog/LoginDialog";
import { useNavigate, Link } from "react-router";
import { useAppSelector } from "@/app/hooks";
import clsx from "clsx";
import { useGetProductsInfiniteQuery } from "@/features/product/productAPI";

const HomeNavBar = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  // const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const searchRef = useRef<HTMLDivElement>(null);

  // API call for search
  const {
    data: searchData,
    isLoading: isSearchLoading,
    isFetching: isSearchFetching,
  } = useGetProductsInfiniteQuery(
    {
      q: searchQuery.trim(),
      limit: 10,
    },
    {
      skip: !searchQuery.trim() || searchQuery.trim().length < 2,
    },
  );

  // Get first page results for search dropdown
  const searchResults = searchData?.pages?.[0]?.data || [];

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 10);
  //     console.log(isScrolled)
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("mobile-sidebar");
      const hamburger = document.getElementById("hamburger-button");

      if (
        sidebarOpen &&
        sidebar &&
        hamburger &&
        !sidebar.contains(event.target as Node) &&
        !hamburger.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }

      // Handle search dropdown
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
        setIsSearchFocused(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page or handle search
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchResults(false);
      setIsSearchFocused(false);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSearchResults(value.trim().length >= 2);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    if (searchQuery.trim().length >= 2) {
      setShowSearchResults(true);
    }
  };

  const handleResultClick = () => {
    setSearchQuery("");
    setShowSearchResults(false);
    setIsSearchFocused(false);
  };

  const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
    <div className="flex h-6 w-6 flex-col items-center justify-center">
      <span
        className={`block h-0.5 w-6 rounded-sm bg-gray-800 transition-all duration-300 ease-out ${
          isOpen ? "translate-y-1 rotate-45" : "-translate-y-0.5"
        }`}
      />
      <span
        className={`my-0.5 block h-0.5 w-6 rounded-sm bg-gray-800 transition-all duration-300 ease-out ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`block h-0.5 w-6 rounded-sm bg-gray-800 transition-all duration-300 ease-out ${
          isOpen ? "-translate-y-1 -rotate-45" : "translate-y-0.5"
        }`}
      />
    </div>
  );

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 right-0 left-0 z-40 transition-all duration-300",
          "border-b border-gray-200/50 bg-white/95 shadow-lg backdrop-blur-md",
        )}
      >
        <div className="mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Left section - Logo and Mobile Menu */}
            <div className="flex items-center">
              <button
                id="hamburger-button"
                className="mr-4 rounded-lg p-2 transition-colors hover:bg-gray-100 sm:hidden"
                onClick={() => setSidebarOpen((prev) => !prev)}
                aria-label="Toggle Menu"
              >
                <HamburgerIcon isOpen={sidebarOpen} />
              </button>

              <div className="flex-shrink-0">
                <Logo />
              </div>
            </div>

            {/* Center section - Search Bar (Desktop) */}
            <div
              className="mx-8 hidden max-w-2xl flex-1 sm:block"
              ref={searchRef}
            >
              <form onSubmit={handleSearch} className="relative">
                <div
                  className={clsx(
                    "flex items-center rounded-full border-2 bg-gray-50 transition-all duration-200",
                    isSearchFocused
                      ? "border-yellow-200 bg-white"
                      : "border-yellow-200 hover:bg-white",
                  )}
                >
                  <Search className="ml-4 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products, brands, categories..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    onFocus={handleSearchFocus}
                    className="flex-1 border-none bg-transparent px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none"
                  />
                  {/* <button
                    type="submit"
                    className="mr-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-2 text-sm font-medium text-white transition-all duration-200 hover:from-yellow-500 hover:to-orange-600 hover:shadow-lg"
                  >
                    Search
                  </button> */}
                </div>

                {/* Search Results Dropdown */}
                {showSearchResults && searchQuery.trim().length >= 2 && (
                  <div className="absolute top-full left-0 z-50 mt-2 max-h-64 w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
                    {isSearchLoading || isSearchFetching ? (
                      <div className="flex items-center justify-center p-4">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-yellow-500"></div>
                        <span className="ml-2 text-sm text-gray-500">
                          Searching...
                        </span>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <ul className="max-h-64 space-y-1 overflow-y-auto p-2">
                        {searchResults.slice(0, 5).map((item) => (
                          <li key={item.id}>
                            <Link
                              to={`/products/${item.id}`}
                              onClick={handleResultClick}
                              className="flex items-center space-x-3 rounded-md p-2 transition hover:bg-gray-100"
                            >
                              <img
                                src={item.product_variants[0].image[0]}
                                alt={item.product_variants[0].name}
                                className="h-10 w-10 rounded-md object-contain"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "/placeholder-image.png"; // Add fallback image
                                }}
                              />
                              <span className="truncate text-sm font-medium text-gray-800">
                                {item.product_variants[0].name}
                              </span>
                            </Link>
                          </li>
                        ))}
                        {/* {searchResults.length > 5 && (
                          <li>
                            <button
                              onClick={() => {
                                handleSearch(new Event("submit") as any);
                              }}
                              className="w-full rounded-md p-2 text-center text-sm text-yellow-600 hover:bg-gray-50"
                            >
                              View all{" "}
                              {searchData?.pages?.[0]?.meta?.total || "more"}{" "}
                              results
                            </button>
                          </li>
                        )} */}
                      </ul>
                    ) : (
                      <div className="p-4 text-center text-sm text-gray-500">
                        No products found for "{searchQuery}"
                      </div>
                    )}
                  </div>
                )}
              </form>
            </div>

            {/* Right section - Navigation Items */}
            <div className="flex items-center space-x-1">
              {/* Mobile Search Icon */}
              {/* <button className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 sm:hidden">
                <Search className="h-5 w-5" />
              </button> */}

              {/* Desktop Navigation */}
              <div className="hidden items-center space-x-3 sm:flex">
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center space-x-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-700 transition-colors hover:bg-gray-200"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span className="text-sm font-medium">Orders</span>
                </button>

                {isAuthenticated ? (
                  <button
                    onClick={() => navigate("/profile")}
                    className="flex items-center space-x-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-700 transition-colors hover:bg-gray-200"
                  >
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">Profile</span>
                  </button>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:from-yellow-500 hover:to-orange-600">
                        Login
                      </button>
                    </DialogTrigger>
                    <LoginDialog />
                  </Dialog>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="border-t border-gray-200 py-3 sm:hidden">
            <form onSubmit={handleSearch} className="relative">
              <div
                className={clsx(
                  "flex items-center rounded-full border-2 bg-gray-50 transition-all duration-200",
                  isSearchFocused
                    ? "border-yellow-200 bg-white"
                    : "border-yellow-200 hover:bg-white",
                )}
              >
                <Search className="ml-4 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onFocus={handleSearchFocus}
                  className="flex-1 border-none bg-transparent px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none"
                />
                {/* <button
                  type="submit"
                  className="mr-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:from-yellow-500 hover:to-orange-600"
                >
                  Go
                </button> */}
              </div>

              {/* Mobile Search Results Dropdown */}
              {showSearchResults && searchQuery.trim().length >= 2 && (
                <div className="absolute top-full left-0 z-50 mt-2 max-h-64 w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
                  {isSearchLoading || isSearchFetching ? (
                    <div className="flex items-center justify-center p-4">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-yellow-500"></div>
                      <span className="ml-2 text-sm text-gray-500">
                        Searching...
                      </span>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <ul className="max-h-64 space-y-1 overflow-y-auto p-2">
                      {searchResults.slice(0, 5).map((item) => (
                        <li key={item.id}>
                          <Link
                            to={`/products/${item.id}`}
                            onClick={handleResultClick}
                            className="flex items-center space-x-3 rounded-md p-2 transition hover:bg-gray-100"
                          >
                            <img
                              src={item.product_variants[0].image[0]}
                              alt={item.product_variants[0].name}
                              className="h-10 w-10 rounded-md object-contain"
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder-image.png";
                              }}
                            />
                            <span className="truncate text-sm font-medium text-gray-800">
                              {item.product_variants[0].name}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-4 text-center text-sm text-gray-500">
                      No products found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <div className="h-16 sm:h-16" />

      {/* Mobile Sidebar */}
      <div
        id="mobile-sidebar"
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-80 transform bg-white shadow-2xl transition-transform duration-300 sm:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex items-center border-b p-4">
          <div className="flex-1" /> {/* Left spacer */}
          <Logo />
          <div className="flex flex-1 justify-end">
            {" "}
            {/* Right side with close button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-full p-2 text-white transition-colors hover:bg-white/20"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Menu Content */}
        <div className="flex flex-col space-y-2 p-4">
          {isAuthenticated ? (
            <div
              className="flex cursor-pointer items-center gap-4 rounded-xl p-4 transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-md"
              onClick={() => {
                navigate("/profile");
                setSidebarOpen(false);
              }}
            >
              <div className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-3">
                <User size={20} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Profile</p>
                <p className="text-sm text-gray-500">Access your account</p>
              </div>
            </div>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <div
                  onClick={() => setSidebarOpen(false)}
                  className="flex cursor-pointer items-center gap-4 rounded-xl p-4 transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-md"
                >
                  <div className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-3">
                    <User size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Login / Sign Up
                    </p>
                    <p className="text-sm text-gray-500">Access your account</p>
                  </div>
                </div>
              </DialogTrigger>
              <LoginDialog />
            </Dialog>
          )}

          <div className="my-3 border-t border-gray-200" />

          <div
            onClick={() => {
              navigate("/profile");
              setSidebarOpen(false);
            }}
            className="flex cursor-pointer items-center gap-4 rounded-xl p-4 transition-all duration-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:shadow-md"
          >
            <div className="rounded-full bg-gradient-to-r from-green-500 to-emerald-600 p-3">
              <MapPin size={20} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">My Address</p>
              <p className="text-sm text-gray-500">Change delivery address</p>
            </div>
          </div>

          <div className="flex cursor-pointer items-center gap-4 rounded-xl p-4 transition-all duration-200 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:shadow-md">
            <div className="rounded-full bg-gradient-to-r from-orange-500 to-red-600 p-3">
              <ShoppingBag size={20} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Orders</p>
              <p className="text-sm text-gray-500">View your orders</p>
            </div>
          </div>

          <div className="flex cursor-pointer items-center gap-4 rounded-xl p-4 transition-all duration-200 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 hover:shadow-md">
            <div className="rounded-full bg-gradient-to-r from-pink-500 to-rose-600 p-3">
              <Heart size={20} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Wishlist</p>
              <p className="text-sm text-gray-500">Your favorite items</p>
            </div>
          </div>

          <div className="my-3 border-t border-gray-200" />

          <div className="space-y-2">
            <div className="flex cursor-pointer items-center gap-4 rounded-xl p-4 transition-all duration-200 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:shadow-md">
              <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 p-3">
                <Info size={20} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">About Us</p>
                <p className="text-sm text-gray-500">
                  Learn more about our brand
                </p>
              </div>
            </div>
            <div className="flex cursor-pointer items-center gap-4 rounded-xl p-4 transition-all duration-200 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 hover:shadow-md">
              <div className="rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 p-3">
                <Phone size={20} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Customer Support</p>
                <p className="text-sm text-gray-500">Get help anytime</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 border-t bg-gradient-to-r from-gray-50 to-gray-100 p-4 text-center text-xs text-gray-500">
          <p className="font-medium">Version 1.0.0 • Made with ❤️</p>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default HomeNavBar;
