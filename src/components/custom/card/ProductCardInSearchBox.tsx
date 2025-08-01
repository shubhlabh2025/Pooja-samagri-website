import type { ProductCardInSearchBoxProps } from "@/interfaces/simple-navbar-props";
import { useNavigate } from "react-router";

const ProductCardInSearchBox = ({ product }: ProductCardInSearchBoxProps) => {
  const navigate = useNavigate();

  const defaultVariantIndex = Math.max(
    0,
    product.product_variants.findIndex((variant) => variant.default_variant),
  );
  const defaultProductVariant = product.product_variants[defaultVariantIndex];

  return (
    <li
      className="flex cursor-pointer items-center gap-2 py-2 transition hover:bg-gray-100"
      onClick={() => {
        navigate(`/products/${product.id}`);
      }}
    >
      <img
        loading="lazy"
        src={defaultProductVariant.images[0]}
        alt={defaultProductVariant.name}
        className="h-10 w-10 rounded-md object-contain"
        onError={(e) => {
          e.currentTarget.src = "/placeholder-image.png"; // Add fallback image
        }}
      />
      <span className="truncate text-sm font-medium text-gray-800">
        {defaultProductVariant.name}
      </span>
    </li>
  );
};

export default ProductCardInSearchBox;
