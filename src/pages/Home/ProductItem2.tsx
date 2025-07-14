import AddToCartCounter from "@/components/custom/button/AddToCartCounter";
import TriggerProductVariantBottomSheet from "@/components/custom/button/TriggerProductVariantBottomSheet";
import type { Product } from "@/features/product/productAPI.type";
import { useNavigate } from "react-router";
interface ProductItemProps {
  item: Product;
}

const ProductItem2: React.FC<ProductItemProps> = ({ item }) => {
  const navigate = useNavigate();

  const defaultVariantIndex = Math.max(
    0,
    item.product_variants.findIndex((variant) => variant.default_variant),
  );

  const discountPercentage = Math.round(
    ((item.product_variants[defaultVariantIndex].mrp -
      item.product_variants[defaultVariantIndex].price) /
      item.product_variants[defaultVariantIndex].mrp) *
      100,
  );

  const handleNavigate = () => {
    navigate(`/products/${item.id}`);
  };

  return (
    <div className="h-fit max-w-66 min-w-33 flex-1 items-center border border-[#282c3f0d] p-3">
      <div className="flex flex-col gap-5">
        <div
          className="relative flex h-30 cursor-pointer justify-center rounded-lg"
          onClick={handleNavigate}
        >
          {discountPercentage > 0 && (
            <div className="absolute top-0 left-0 z-10 flex h-8 w-7.5 items-center rounded-tl-lg bg-[url(/src/assets/offer_tag.png)] [background-size:100%_100%] bg-no-repeat">
              <div className="text-center text-[10px] leading-[13px] font-semibold tracking-[-0.25px] text-white">
                {discountPercentage}% OFF
              </div>
            </div>
          )}
          <img
            src={item.product_variants[defaultVariantIndex].images[0]}
            alt={item.product_variants[defaultVariantIndex].name}
            className="aspect-square h-full rounded-lg"
          />
          <div className="absolute bottom-0 h-7 w-full rounded-b-lg bg-[image:var(--bg-product-image-bottom)]"></div>
        </div>
        <div className="flex flex-col gap-2">
          <div
            className="flex cursor-pointer flex-col gap-1.5"
            onClick={handleNavigate}
          >
            <p className="line-clamp-2 min-h-9 text-sm leading-4.5 font-semibold tracking-[-0.35px] break-words text-[#02060cbf]">
              {item.product_variants[defaultVariantIndex].name}
            </p>
            <p className="line-clamp-2 min-h-8 text-[12px] leading-4 font-normal tracking-[-0.3px] break-words text-[#02060c73]">
              {item.product_variants[defaultVariantIndex].description}
            </p>
          </div>
          <div
            className="h-[1px] w-full cursor-pointer bg-[#02060c0d]"
            onClick={handleNavigate}
          ></div>
          <div
            className="flex cursor-pointer flex-col gap-0.5"
            onClick={handleNavigate}
          >
            <p className="line-clamp-1 text-[12px] leading-4 font-normal tracking-[-0.3px] break-words text-[#02060c99]">
              {item.product_variants[defaultVariantIndex].display_label}
            </p>
            <div className="flex gap-1">
              <p className="text-sm leading-4.5 font-semibold tracking-[-0.35px] text-[#02060cbf]">
                ₹{item.product_variants[defaultVariantIndex].price}
              </p>
              {discountPercentage > 0 && (
                <p className="text-[13px] leading-[17px] font-extralight tracking-[-0.33px] text-[#02060c4d] line-through">
                  ₹{item.product_variants[defaultVariantIndex].mrp}
                </p>
              )}
            </div>
          </div>
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

export default ProductItem2;
