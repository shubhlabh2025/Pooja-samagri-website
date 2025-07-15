import type { SearchBoxProps } from "@/interfaces/simple-navbar-props";
import { motion } from "framer-motion";
import ProductCardInSearchBox from "../custom/card/ProductCardInSearchBox";

const SearchBox = ({ products, query }: SearchBoxProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="absolute top-11 left-0 z-11 flex w-full rounded-[12px] bg-[#F8F8F8] px-2 shadow-lg"
    >
      {products.length > 0 ? (
        <ul className="w-full gap-2">
          {products.map((product) => (
            <ProductCardInSearchBox product={product} key={product.id} />
          ))}
        </ul>
      ) : (
        <div className="w-full py-3 text-center text-gray-500">
          No Result found for "{query}"
        </div>
      )}
    </motion.div>
  );
};

export default SearchBox;
