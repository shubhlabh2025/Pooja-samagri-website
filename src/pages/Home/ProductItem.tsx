import React from "react";
import type { Product } from "@/features/product/productAPI.type";
import TriggerProductVariantBottomSheet from "@/components/custom/button/TriggerProductVariantBottomSheet";
import AddToCartCounter from "@/components/custom/button/AddToCartCounter";
import { useNavigate } from "react-router";

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const navigate = useNavigate();

  const defaultVariantIndex = product.product_variants.findIndex(
    (variant) => variant.default_variant,
  );

  const defaultProductVariant = product.product_variants[defaultVariantIndex];

  const discountPercentage = Math.round(
    ((defaultProductVariant.mrp - defaultProductVariant.price) /
      defaultProductVariant.mrp) *
      100,
  );

  const handleNavigate = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="shadow-product-card flex flex-col gap-1.5 rounded-[12px] p-2">
      <div className="relative flex aspect-square h-31.5 items-center justify-around rounded-[12px] border border-[#f2f3f3]">
        {discountPercentage > 0 && (
          <div className="absolute top-0 left-0 z-10 flex h-8 w-7.5 items-center rounded-tl-[12px] bg-[url(/src/assets/offer_tag.png)] [background-size:100%_100%] bg-no-repeat">
            <div className="text-center text-[10px] leading-[13px] font-semibold tracking-[-0.25px] text-white">
              {discountPercentage}% OFF
            </div>
          </div>
        )}
        <img
          src={defaultProductVariant.image[0]}
          alt={defaultProductVariant.name}
          className="h-full w-full rounded-[12px]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div
          className="flex cursor-pointer flex-col gap-1.5"
          onClick={handleNavigate}
        >
          <p className="line-clamp-2 min-h-9 text-sm leading-4.5 font-semibold tracking-[-0.35px] break-words text-[#02060cbf]">
            {defaultProductVariant.name}
          </p>
        </div>
        <div
          className="flex cursor-pointer flex-col gap-0.5"
          onClick={handleNavigate}
        >
          <p className="line-clamp-1 text-[12px] leading-4 font-normal tracking-[-0.3px] break-words text-[#02060c99]">
            {defaultProductVariant.display_label}
          </p>
          <div className="flex gap-1">
            <p className="text-sm leading-4.5 font-semibold tracking-[-0.35px] text-[#02060cbf]">
              ₹{defaultProductVariant.mrp}
            </p>
            {discountPercentage > 0 && (
              <p className="text-[13px] leading-[17px] font-extralight tracking-[-0.33px] text-[#02060c4d] line-through">
                ₹{defaultProductVariant.price}
              </p>
            )}
          </div>
        </div>
        {product.product_variants.length > 1 ? (
          <TriggerProductVariantBottomSheet product={product} />
        ) : (
          <AddToCartCounter productVariant={defaultProductVariant} />
        )}
      </div>
    </div>
  );
};

export default ProductItem;
