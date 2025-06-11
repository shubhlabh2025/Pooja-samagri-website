import type { ProductSectionProps } from "@/interfaces/product-section";
import ProductItem2 from "../Home/ProductItem2";

const ProductSection = ({
  productData,
  totalProuducts,
  selectedCategoryName,
}: ProductSectionProps) => {
  console.log("ProductSection", productData);
  return (
    <div className="flex flex-30 flex-col rounded-tl-lg bg-white">
      <div className="mb-3.5 line-clamp-1 min-h-[34px] w-full overflow-hidden px-3 pt-4 text-sm leading-4.5 font-normal tracking-[-0.35px] break-words text-[#02060cbf]">
        <span className="font-bold">{totalProuducts} items</span> in{" "}
        {selectedCategoryName}
      </div>
      <div className="hide-scrollbar flex max-h-full flex-wrap justify-start overflow-y-auto">
        {productData.map((product) => (
          <ProductItem2 key={product.id} item={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
