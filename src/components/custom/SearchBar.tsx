import React, { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import rawData from "@/data/cartData.json";
import type { FetchState } from "@/types/fetchState";
import type { CartItem } from "@/interfaces/cart";
import { Link } from "react-router";

const SearchBar: React.FC = () => {
  const [cartData, setCartData] = useState<FetchState<CartItem[]>>({
    status: "loading",
  });
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState<CartItem[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCart = () => {
      try {
        const data = rawData;
        if (data.length === 0) {
          setCartData({ status: "empty" });
        } else {
          setCartData({ status: "success", data });
          setFilteredResults(data);
        }
      } catch (err) {
        setCartData({
          status: "error",
          error: err instanceof Error ? err.message : "Unknown error occurred",
        });
      }
    };

    fetchCart();
  }, []);

  // Filter results on change
  useEffect(() => {
    if (cartData.status === "success") {
      const filtered =
        query.trim().length === 0
          ? cartData.data
          : cartData.data.filter((item) =>
              item.name.toLowerCase().includes(query.toLowerCase()),
            );
      setFilteredResults(filtered);
    }
  }, [query, cartData]);

  // Hide on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div className="flex items-center rounded-full border border-[#e7dce5] bg-[#f0f0f5] px-4 py-2 shadow-sm">
        <input
          type="text"
          placeholder="Search for Products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="flex-grow bg-transparent text-sm text-gray-600 placeholder-gray-500 outline-none"
        />
        <Search className="h-4 w-4 text-gray-800" />
      </div>

      {isFocused && filteredResults.length > 0 && (
        <ul className="absolute top-full left-0 z-50 mt-2 max-h-64 w-full space-y-2 overflow-y-auto rounded-md border border-gray-200 bg-white p-2 shadow-lg">
          {filteredResults.slice(0, 5).map((item) => (
            <Link
              key={item.variant_id}
              to={`/product/${item.variant_id}`}
              onClick={() => {
                setQuery("");
                setIsFocused(false);
              }}
            >
              {" "}
              <li
                key={item.variant_id}
                className="flex items-center space-x-3 rounded-md p-2 transition hover:bg-gray-100"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-10 w-10 rounded-md object-contain"
                />
                <span className="text-sm font-medium text-gray-800">
                  {item.name}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
