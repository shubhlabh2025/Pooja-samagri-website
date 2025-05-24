import type { Product } from "@/interfaces/product";
import { useEffect, useState } from "react";
import ProductItems from "./ProductItem";
import rawData from "@/data/productData.json";
import type { FetchState } from "@/types/fetchState";

const ProductList = () => {
  const [products, setProducts] = useState<FetchState<Product[]>>({
    status: "loading",
  });
  const [visibleCount] = useState(20);

  useEffect(() => {
    const fetchProducts = () => {
      try {
        // Simulate an API call
        const data = rawData;
        if (data.length === 0) {
          setProducts({ status: "empty" });
        } else {
          setProducts({ status: "success", data });
        }
      } catch (err) {
        if (err instanceof Error) {
          setProducts({ status: "error", error: err.message });
        } else {
          setProducts({ status: "error", error: "Unknown error occurred" });
        }
      }
    };

    fetchProducts();
  }, []);

  // function getProductsData() {
  //   //   get(`api/products?page=1&pageSize=10`)
  //   //     .then((res) => {
  //   //       if (res.status == 200) {
  //   //         console.log(res.data.data.products);
  //   //         setProducts(res.data.data.products);
  //   //       } else {
  //   //         alert("Error Occured");
  //   //       }
  //   //     })
  //   //     .catch(() => {});
  //   // setProducts(demoProducts)
  // }

  // useEffect(() => {
  //   getProductsData();
  // }, []);

  return (
    <>
      {products.status == "success" && (
        <div className="p-4">
          <div className="hide-scrollbar flex snap-x snap-mandatory items-center gap-4 overflow-x-auto scroll-smooth">
            {products.data.map((item, i) => (
              <ProductItems key={i} item={item}></ProductItems>
            ))}

            {/* Load More button also snaps */}
            {visibleCount < products.data.length && (
              <button
                onClick={() => {}}
                className="flex h-24 min-w-[100px] snap-start flex-col items-center justify-center rounded-xl bg-pink-50 px-3 py-2 text-sm font-medium text-pink-800 shadow-sm hover:bg-pink-100"
              >
                Load More
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
