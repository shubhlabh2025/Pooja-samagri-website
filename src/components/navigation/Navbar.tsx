import { Separator } from "@/components/ui/separator";
import logo from "@/assets/LOGO1.png";
import { useNavigate } from "react-router";
import { CircleUserRound, Package, Search } from "lucide-react";
import { Input } from "../ui/input";
import RotatingText from "../bits/RotatingText";
import { useDeferredValue, useRef, useState, type FocusEvent } from "react";
import { useAppSelector } from "@/app/hooks";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import LoginDialog from "../dialog/LoginDialog";
import { useGetProductsInfiniteQuery } from "@/features/product/productAPI";
import SearchBox from "../common/SearchBox";
import { AnimatePresence } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const {
    data: productsData = {
      pages: [
        {
          data: [],
        },
      ],
    },
    isLoading,
    isError,
  } = useGetProductsInfiniteQuery({ q: query, limit: 5 });
  const products = productsData.pages.flatMap((page) => page.data);
  console.log("Products:", products);
  console.log("Query:", query);
  console.log("Deferred Query:", deferredQuery);
  console.log("Is Loading:", isLoading);
  console.log("Is Error:", isError);

  const [focused, setFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.relatedTarget)
    ) {
      setFocused(false);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <img loading="lazy"
          src={logo}
          alt="Logo"
          className="block h-12 cursor-pointer sm:hidden"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div className="flex items-center gap-2 px-2 py-2 sm:gap-6 sm:px-6 sm:py-0">
        <img loading="lazy"
          src={logo}
          alt="Logo"
          className="hidden h-18 cursor-pointer py-2 sm:block"
          onClick={() => {
            navigate("/");
          }}
        />
        <Separator orientation="vertical" className="hidden sm:block" />
        <div
          className="relative flex flex-1 items-center rounded-[12px] border border-[#0000000a] bg-[#F8F8F8] px-2"
          ref={searchContainerRef}
        >
          <Search size={18} strokeWidth={2.5} className="" />
          {!focused && !query && (
            <div className="pointer-events-none absolute left-9 flex items-center gap-1">
              <p className="text-gray-500">Search</p>
              <RotatingText
                texts={['"Coconut"', '"Oil"', '"Agarbatti"', '"Diyas"']}
                mainClassName="text-gray-500"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </div>
          )}
          <AnimatePresence>
            {focused && query && (
              <SearchBox products={products} query={query} />
            )}
          </AnimatePresence>
          <Input
            onFocus={() => setFocused(true)}
            onBlur={handleBlur}
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            className="border-none font-light shadow-none selection:bg-blue-200 selection:text-black focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
          />
        </div>
        {isAuthenticated ? (
          <div className="flex gap-1 sm:gap-3">
            <button
              onClick={() => {
                navigate("/orders");
              }}
              className="flex items-center gap-1.5 rounded-[12px] bg-gradient-to-r from-emerald-500 to-green-600 p-2 text-white transition duration-100 ease-in hover:scale-[0.95]"
            >
              <Package size={20} strokeWidth={2} />
              <p className="hidden font-medium md:block">Orders</p>
            </button>
            <button
              onClick={() => {
                navigate("/profile");
              }}
              className="flex items-center gap-1.5 rounded-[12px] bg-gradient-to-r from-blue-500 to-blue-600 px-2 text-white transition duration-100 ease-in hover:scale-[0.95]"
            >
              <CircleUserRound size={20} />
              <p className="hidden font-medium md:block">Account</p>
            </button>
          </div>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center gap-1.5 rounded-[12px] bg-linear-to-r from-[#fc4a1a] to-[#f7b733] px-5 py-[7px] text-white transition duration-100 ease-in hover:scale-[0.95]">
                <CircleUserRound size={20} />
                <p className="font-medium">Login</p>
              </button>
            </DialogTrigger>
            <LoginDialog />
          </Dialog>
        )}
      </div>
      <Separator />
    </>
  );
};

export default Navbar;
