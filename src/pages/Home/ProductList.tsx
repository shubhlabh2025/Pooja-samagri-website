import type { Product } from "@/interfaces/product";
import { useEffect, useState } from "react";
import ProductItems from "./ProductItem";

const demoProducts: Product[] = [
  {
    id: 1,
    name: "tests2",
    description: "testing",
    image: "products/1746952928270-beautiful-vintage-tableware-board.jpg",
    price: "100",
    out_of_stock: false,
    category_id: null,
    sub_category_id: null,
    SubCategory: null,
    ProductsVariants: [
      {
        id: 1,
        qty: "10",
        price: "100",
        mrp: "100",
        product_id: 1,
      },
    ],
    ProductCategories: [
      {
        id: 1,
        category_id: 1,
        product_id: 1,
      },
    ],
  },
  {
    id: 2,
    name: "tests2",
    description: "testing",
    image: "products/1746952928270-beautiful-vintage-tableware-board.jpg",
    price: "100",
    out_of_stock: false,
    category_id: null,
    sub_category_id: null,
    SubCategory: null,
    ProductsVariants: [
      {
        id: 1,
        qty: "10",
        price: "100",
        mrp: "100",
        product_id: 1,
      },
    ],
    ProductCategories: [
      {
        id: 1,
        category_id: 1,
        product_id: 1,
      },
    ],
  },
  {
    id: 3,
    name: "tests2",
    description: "testing",
    image: "products/1746952928270-beautiful-vintage-tableware-board.jpg",
    price: "100",
    out_of_stock: false,
    category_id: null,
    sub_category_id: null,
    SubCategory: null,
    ProductsVariants: [
      {
        id: 1,
        qty: "10",
        price: "100",
        mrp: "100",
        product_id: 1,
      },
    ],
    ProductCategories: [
      {
        id: 1,
        category_id: 1,
        product_id: 1,
      },
    ],
  },
  {
    id: 4,
    name: "tests2",
    description: "testing",
    image: "products/1746952928270-beautiful-vintage-tableware-board.jpg",
    price: "100",
    out_of_stock: false,
    category_id: null,
    sub_category_id: null,
    SubCategory: null,
    ProductsVariants: [
      {
        id: 1,
        qty: "10",
        price: "100",
        mrp: "100",
        product_id: 1,
      },
    ],
    ProductCategories: [
      {
        id: 1,
        category_id: 1,
        product_id: 1,
      },
    ],
  },
  {
    id: 5,
    name: "tests2",
    description: "testing",
    image: "products/1746952928270-beautiful-vintage-tableware-board.jpg",
    price: "100",
    out_of_stock: false,
    category_id: null,
    sub_category_id: null,
    SubCategory: null,
    ProductsVariants: [
      {
        id: 1,
        qty: "10",
        price: "100",
        mrp: "100",
        product_id: 1,
      },
    ],
    ProductCategories: [
      {
        id: 1,
        category_id: 1,
        product_id: 1,
      },
    ],
  },
  {
    id: 6,
    name: "tests2",
    description: "testing",
    image: "products/1746952928270-beautiful-vintage-tableware-board.jpg",
    price: "100",
    out_of_stock: false,
    category_id: null,
    sub_category_id: null,
    SubCategory: null,
    ProductsVariants: [
      {
        id: 1,
        qty: "10",
        price: "100",
        mrp: "100",
        product_id: 1,
      },
    ],
    ProductCategories: [
      {
        id: 1,
        category_id: 1,
        product_id: 1,
      },
    ],
  },
  {
    id: 7,
    name: "tests2",
    description: "testing",
    image: "products/1746952928270-beautiful-vintage-tableware-board.jpg",
    price: "100",
    out_of_stock: false,
    category_id: null,
    sub_category_id: null,
    SubCategory: null,
    ProductsVariants: [
      {
        id: 1,
        qty: "10",
        price: "100",
        mrp: "100",
        product_id: 1,
      },
    ],
    ProductCategories: [
      {
        id: 1,
        category_id: 1,
        product_id: 1,
      },
    ],
  },
  {
    id: 8,
    name: "tests2",
    description: "testing",
    image: "products/1746952928270-beautiful-vintage-tableware-board.jpg",
    price: "100",
    out_of_stock: false,
    category_id: null,
    sub_category_id: null,

    SubCategory: null,
    ProductsVariants: [
      {
        id: 1,
        qty: "10",
        price: "100",
        mrp: "100",
        product_id: 1,
      },
    ],
    ProductCategories: [
      {
        id: 1,
        category_id: 1,
        product_id: 1,
      },
    ],
  },
  {
    id: 9,
    name: "tests2",
    description: "testing",
    image: "products/1746952928270-beautiful-vintage-tableware-board.jpg",
    price: "100",
    out_of_stock: false,
    category_id: null,
    sub_category_id: null,

    SubCategory: null,
    ProductsVariants: [
      {
        id: 1,
        qty: "10",
        price: "100",
        mrp: "100",
        product_id: 1,
      },
    ],
    ProductCategories: [
      {
        id: 1,
        category_id: 1,
        product_id: 1,
      },
    ],
  },
];

const ProductList = () => {
  const [products] = useState<Product[]>(demoProducts);
  const [visibleCount] = useState(20);

  function getProductsData() {
    //   get(`api/products?page=1&pageSize=10`)
    //     .then((res) => {
    //       if (res.status == 200) {
    //         console.log(res.data.data.products);
    //         setProducts(res.data.data.products);
    //       } else {
    //         alert("Error Occured");
    //       }
    //     })
    //     .catch(() => {});
    // setProducts(demoProducts)
  }

  useEffect(() => {
    getProductsData();
  }, []);

  return (
    <div className="p-4">
      <div className="hide-scrollbar flex snap-x snap-mandatory items-center gap-4 overflow-x-auto scroll-smooth">
        {products.map((item, i) => (
            <ProductItems key={i} item={item}></ProductItems>
        ))}

        {/* Load More button also snaps */}
        {visibleCount < products.length && (
          <button
            onClick={() => {}}
            className="flex h-24 min-w-[100px] snap-start flex-col items-center justify-center rounded-xl bg-pink-50 px-3 py-2 text-sm font-medium text-pink-800 shadow-sm hover:bg-pink-100"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductList;
