import { Button } from "@/components/ui/button";
import type { Product } from "@/interfaces/product";
import React, { useState } from "react";
import { Link } from "react-router";

interface ProductItemProps {
  item: Product;
}

const ProductItems: React.FC<ProductItemProps> = ({ item }) => {
  const [products, setProducts] = useState(0);
  return (
    <div
      key={item.id}
      className="flex max-w-[128px] min-w-[128px] cursor-pointer snap-start flex-col items-start justify-start"
      onClick={() => {}}
    >
      <div className="flex max-w-[128px] flex-col items-start justify-between">
        {/* Product image */}
        <Link to="/product/123">
          <div className="relative flex h-[128px] w-[128px] items-center justify-center rounded-xl shadow-sm">
            {/* Ribbon Image + Text Overlay */}
            <div className="absolute top-0 left-0 z-10 h-[44px] w-[36px]">
              <img
                src="https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_64,h_108/instamart-assets/offer_tag.png"
                alt="discount ribbon"
                className="ml-[-8px] h-full w-full object-contain"
              />
              <span className="absolute top-[6px] left-0 ml-[-8px] w-full px-[2px] text-center text-[9px] leading-tight font-bold text-white">
                {Math.round(
                  ((+item.ProductsVariants[0].mrp -
                    +item.ProductsVariants[0].price) /
                    +item.ProductsVariants[0].mrp) *
                    100,
                )}
                %<br />
                OFF
              </span>
            </div>

            {/* Product image */}
            <img
              src="https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg"
              alt={item.name}
              className="h-full w-full object-cover  rounded-xl"
            />
          </div>
        </Link>
        {/* Product name */}
        <span className="mt-1 line-clamp-2 text-[14px] leading-tight font-semibold text-[rgba(2,6,12,0.75)]">
          {item.name}
        </span>

        {/* Old price */}
        <span className="mt-1 text-xs text-[#676a6d] line-through">
          ₹{item.ProductsVariants?.[0]?.mrp}
        </span>

        {/* Price + Add button */}
        <div className="flex w-full items-center justify-between">
          <span className="text-sm font-semibold text-[rgba(2,6,12,0.85)]">
            ₹{item.ProductsVariants?.[0]?.price}
          </span>

          {products > 0 ? (
            <div className="flex h-fit items-center rounded-lg border border-[#02060c26] p-0">
              <Button
                variant="outline"
                className="h-fit cursor-pointer rounded-l-lg rounded-r-none border-none px-2 py-1.5 leading-[1.125rem] font-semibold tracking-[0.35px] text-[#1ba672] shadow-none transition-colors duration-150 group-hover:bg-inherit hover:bg-[#02060c26] hover:text-[#1ba672]"
                onClick={(e) => {
                  e.stopPropagation();
                  setProducts(products - 1);
                  // handleDecreaseProductQantity(item.product_id);
                }}
              >
                -
              </Button>

              <div className="group flex">
                <p className="cursor-default px-1 py-1.5 text-sm leading-[1.125rem] font-semibold tracking-[0.35px] text-[#1ba672] shadow-none group-hover:bg-[#02060c26]">
                  {products}
                </p>
              </div>

              <Button
                variant="outline"
                className="h-fit cursor-pointer rounded-l-none rounded-r-lg border-none px-2 py-1.5 leading-[1.125rem] font-semibold tracking-[0.35px] text-[#1ba672] transition-colors duration-150 group-hover:bg-inherit hover:bg-[#02060c26] hover:text-[#1ba672]"
                onClick={(e) => {
                  e.stopPropagation();
                  setProducts(products + 1);
                  // handleIncreaseProductQantity(item.product_id);
                }}
              >
                +
              </Button>
            </div>
          ) : (
            <button
              className="ml-auto rounded-lg border border-gray-300 px-3 py-1 text-sm font-semibold text-green-600 hover:shadow-sm"
              onClick={(e) => {
                e.stopPropagation();
                setProducts(1);
              }}
            >
              ADD
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItems;
