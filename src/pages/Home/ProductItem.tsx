import type { Product } from "@/interfaces/product";
import React from "react";

interface ProductItemProps {
  item: Product;
}

const ProductItems: React.FC<ProductItemProps> = ({ item }) => {
  return (
    <div
      key={item.id}
      className="flex flex-col items-start justify-start min-w-[128px] max-w-[128px] cursor-pointer snap-start"
      onClick={() => {}}
    >
      <div className="flex flex-col items-start justify-between max-w-[128px]">
        {/* Product image */}
        <div className="relative rounded-xl w-[128px] h-[128px]  flex items-center justify-center shadow-sm">
          {/* Ribbon Image + Text Overlay */}
          <div className="absolute top-0 left-0 w-[36px] h-[44px] z-10">
            <img
              src="https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_64,h_108/instamart-assets/offer_tag.png"
              alt="discount ribbon"
              className="w-full h-full object-contain"
            />
            <span className="absolute top-[6px] left-0 w-full text-[9px] font-bold text-white text-center leading-tight px-[2px]">
              {Math.round(
                ((+item.ProductsVariants[0].mrp -
                  +item.ProductsVariants[0].price) /
                  +item.ProductsVariants[0].mrp) *
                  100
              )}
              %<br />
              OFF
            </span>
          </div>

          {/* Product image */}
          <img
            src="https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg"
            alt={item.name}
            className="object-contain w-full h-full"
          />
        </div>

        {/* Product name */}
        <span className="text-[14px] text-[rgba(2,6,12,0.75)] font-semibold leading-tight mt-1 line-clamp-2">
          {item.name}
        </span>

        {/* Old price */}
        <span className="text-xs line-through text-[#676a6d] mt-1">
          ₹{item.ProductsVariants?.[0]?.mrp}
        </span>

        {/* Price + Add button */}
        <div className="flex items-center justify-between w-full">
          <span className="text-sm font-semibold text-[rgba(2,6,12,0.85)]">
            ₹{item.ProductsVariants?.[0]?.price}
          </span>

          <button className="ml-auto text-green-600 font-semibold border border-gray-300 rounded-lg px-4 py-1 text-sm hover:shadow-sm">
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItems;
