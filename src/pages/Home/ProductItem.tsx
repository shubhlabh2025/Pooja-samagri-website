import React from "react";
import { Link } from "react-router";
import TriggerProductVariantBottomSheet from "@/components/custom/button/TriggerProductVariantBottomSheet";
import AddToCartCounter from "@/components/custom/button/AddToCartCounter";
import type { Product } from "@/features/product/productAPI.type";

interface ProductItemProps {
  item: Product;
}

const ProductItems: React.FC<ProductItemProps> = ({ item }) => {
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
                  ((+item.product_variants[0].mrp -
                    +item.product_variants[0].price) /
                    +item.product_variants[0].mrp) *
                    100,
                )}
                %<br />
                OFF
              </span>
            </div>

            {/* Product image */}
            <img
              src={item.product_variants[0].image[0]}
              alt={item.product_variants[0].name}
              className="h-full w-full rounded-xl object-cover"
            />
          </div>
        </Link>
        {/* Product name */}
        <span className="mt-1 line-clamp-2 text-[14px] leading-tight font-semibold text-[rgba(2,6,12,0.75)]">
          {item.product_variants[0].name}
        </span>

        {/* Old price */}
        <span className="mt-1 text-xs text-[#676a6d] line-through">
          ₹{item.product_variants?.[0]?.mrp}
        </span>

        {/* Price + Add button */}
        <div className="flex w-full flex-col items-center justify-between">
          <span className="text-sm font-semibold text-[rgba(2,6,12,0.85)]">
            ₹{item.product_variants?.[0]?.price}
          </span>

          {item.product_variants.length > 1 ? (
            <TriggerProductVariantBottomSheet product={item} />
          ) : (
            <AddToCartCounter productVariant={item.product_variants[0]} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItems;
