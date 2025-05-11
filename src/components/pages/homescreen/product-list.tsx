import { get } from "@/api/apiFunction";
import type { Product } from "@/interfaces/product";
import { useEffect, useState } from "react";
import ProductItems from "./productItem";

const demoProducts = [
          {
                "id": 1,
                "name": "tests2",
                "description": "testing",
                "image": "products/1746952928270-beautiful-vintage-tableware-board.jpg",
                "price": "100",
                "out_of_stock": false,
                "category_id": null,
                "sub_category_id": null,
                "createdAt": "2025-05-11T08:42:21.000Z",
                "updatedAt": "2025-05-11T08:42:21.000Z",
                "SubCategory": null,
                "ProductsVariants": [
                    {
                        "id": 1,
                        "qty": "10",
                        "price": "100",
                        "mrp": "100",
                        "product_id": 1,
                        "createdAt": "2025-05-11T08:42:21.000Z",
                        "updatedAt": "2025-05-11T08:42:21.000Z"
                    }
                ],
                "ProductCategories": [
                    {
                        "id": 1,
                        "category_id": 1,
                        "product_id": 1,
                        "createdAt": "2025-05-11T08:42:21.000Z",
                        "updatedAt": "2025-05-11T08:42:21.000Z"
                    }
                ]
            },
                  {
                "id": 2,
                "name": "tests2",
                "description": "testing",
                "image": "products/1746952928270-beautiful-vintage-tableware-board.jpg",
                "price": "100",
                "out_of_stock": false,
                "category_id": null,
                "sub_category_id": null,
                "createdAt": "2025-05-11T08:42:21.000Z",
                "updatedAt": "2025-05-11T08:42:21.000Z",
                "SubCategory": null,
                "ProductsVariants": [
                    {
                        "id": 1,
                        "qty": "10",
                        "price": "100",
                        "mrp": "100",
                        "product_id": 1,
                        "createdAt": "2025-05-11T08:42:21.000Z",
                        "updatedAt": "2025-05-11T08:42:21.000Z"
                    }
                ],
                "ProductCategories": [
                    {
                        "id": 1,
                        "category_id": 1,
                        "product_id": 1,
                        "createdAt": "2025-05-11T08:42:21.000Z",
                        "updatedAt": "2025-05-11T08:42:21.000Z"
                    }
                ]
            },
                  {
                "id": 3,
                "name": "tests2",
                "description": "testing",
                "image": "products/1746952928270-beautiful-vintage-tableware-board.jpg",
                "price": "100",
                "out_of_stock": false,
                "category_id": null,
                "sub_category_id": null,
                "createdAt": "2025-05-11T08:42:21.000Z",
                "updatedAt": "2025-05-11T08:42:21.000Z",
                "SubCategory": null,
                "ProductsVariants": [
                    {
                        "id": 1,
                        "qty": "10",
                        "price": "100",
                        "mrp": "100",
                        "product_id": 1,
                        "createdAt": "2025-05-11T08:42:21.000Z",
                        "updatedAt": "2025-05-11T08:42:21.000Z"
                    }
                ],
                "ProductCategories": [
                    {
                        "id": 1,
                        "category_id": 1,
                        "product_id": 1,
                        "createdAt": "2025-05-11T08:42:21.000Z",
                        "updatedAt": "2025-05-11T08:42:21.000Z"
                    }
                ]
            },
                  {
                "id": 4,
                "name": "tests2",
                "description": "testing",
                "image": "products/1746952928270-beautiful-vintage-tableware-board.jpg",
                "price": "100",
                "out_of_stock": false,
                "category_id": null,
                "sub_category_id": null,
                "createdAt": "2025-05-11T08:42:21.000Z",
                "updatedAt": "2025-05-11T08:42:21.000Z",
                "SubCategory": null,
                "ProductsVariants": [
                    {
                        "id": 1,
                        "qty": "10",
                        "price": "100",
                        "mrp": "100",
                        "product_id": 1,
                        "createdAt": "2025-05-11T08:42:21.000Z",
                        "updatedAt": "2025-05-11T08:42:21.000Z"
                    }
                ],
                "ProductCategories": [
                    {
                        "id": 1,
                        "category_id": 1,
                        "product_id": 1,
                        "createdAt": "2025-05-11T08:42:21.000Z",
                        "updatedAt": "2025-05-11T08:42:21.000Z"
                    }
                ]
            },
                  {
                "id": 5,
                "name": "tests2",
                "description": "testing",
                "image": "products/1746952928270-beautiful-vintage-tableware-board.jpg",
                "price": "100",
                "out_of_stock": false,
                "category_id": null,
                "sub_category_id": null,
                "createdAt": "2025-05-11T08:42:21.000Z",
                "updatedAt": "2025-05-11T08:42:21.000Z",
                "SubCategory": null,
                "ProductsVariants": [
                    {
                        "id": 1,
                        "qty": "10",
                        "price": "100",
                        "mrp": "100",
                        "product_id": 1,
                        "createdAt": "2025-05-11T08:42:21.000Z",
                        "updatedAt": "2025-05-11T08:42:21.000Z"
                    }
                ],
                "ProductCategories": [
                    {
                        "id": 1,
                        "category_id": 1,
                        "product_id": 1,
                        "createdAt": "2025-05-11T08:42:21.000Z",
                        "updatedAt": "2025-05-11T08:42:21.000Z"
                    }
                ]
            },
                  {
                "id": 6,
                "name": "tests2",
                "description": "testing",
                "image": "products/1746952928270-beautiful-vintage-tableware-board.jpg",
                "price": "100",
                "out_of_stock": false,
                "category_id": null,
                "sub_category_id": null,
                "createdAt": "2025-05-11T08:42:21.000Z",
                "updatedAt": "2025-05-11T08:42:21.000Z",
                "SubCategory": null,
                "ProductsVariants": [
                    {
                        "id": 1,
                        "qty": "10",
                        "price": "100",
                        "mrp": "100",
                        "product_id": 1,
                        "createdAt": "2025-05-11T08:42:21.000Z",
                        "updatedAt": "2025-05-11T08:42:21.000Z"
                    }
                ],
                "ProductCategories": [
                    {
                        "id": 1,
                        "category_id": 1,
                        "product_id": 1,
                        "createdAt": "2025-05-11T08:42:21.000Z",
                        "updatedAt": "2025-05-11T08:42:21.000Z"
                    }
                ]
            },
                  {
                "id": 7,
                "name": "tests2",
                "description": "testing",
                "image": "products/1746952928270-beautiful-vintage-tableware-board.jpg",
                "price": "100",
                "out_of_stock": false,
                "category_id": null,
                "sub_category_id": null,
                "createdAt": "2025-05-11T08:42:21.000Z",
                "updatedAt": "2025-05-11T08:42:21.000Z",
                "SubCategory": null,
                "ProductsVariants": [
                    {
                        "id": 1,
                        "qty": "10",
                        "price": "100",
                        "mrp": "100",
                        "product_id": 1,
                        "createdAt": "2025-05-11T08:42:21.000Z",
                        "updatedAt": "2025-05-11T08:42:21.000Z"
                    }
                ],
                "ProductCategories": [
                    {
                        "id": 1,
                        "category_id": 1,
                        "product_id": 1,
                        "createdAt": "2025-05-11T08:42:21.000Z",
                        "updatedAt": "2025-05-11T08:42:21.000Z"
                    }
                ]
            },
                  {
                "id": 8,
                "name": "tests2",
                "description": "testing",
                "image": "products/1746952928270-beautiful-vintage-tableware-board.jpg",
                "price": "100",
                "out_of_stock": false,
                "category_id": null,
                "sub_category_id": null,
                "createdAt": "2025-05-11T08:42:21.000Z",
                "updatedAt": "2025-05-11T08:42:21.000Z",
                "SubCategory": null,
                "ProductsVariants": [
                    {
                        "id": 1,
                        "qty": "10",
                        "price": "100",
                        "mrp": "100",
                        "product_id": 1,
                        "createdAt": "2025-05-11T08:42:21.000Z",
                        "updatedAt": "2025-05-11T08:42:21.000Z"
                    }
                ],
                "ProductCategories": [
                    {
                        "id": 1,
                        "category_id": 1,
                        "product_id": 1,
                        "createdAt": "2025-05-11T08:42:21.000Z",
                        "updatedAt": "2025-05-11T08:42:21.000Z"
                    }
                ]
            },
                  {
                "id": 9,
                "name": "tests2",
                "description": "testing",
                "image": "products/1746952928270-beautiful-vintage-tableware-board.jpg",
                "price": "100",
                "out_of_stock": false,
                "category_id": null,
                "sub_category_id": null,
                "createdAt": "2025-05-11T08:42:21.000Z",
                "updatedAt": "2025-05-11T08:42:21.000Z",
                "SubCategory": null,
                "ProductsVariants": [
                    {
                        "id": 1,
                        "qty": "10",
                        "price": "100",
                        "mrp": "100",
                        "product_id": 1,
                        "createdAt": "2025-05-11T08:42:21.000Z",
                        "updatedAt": "2025-05-11T08:42:21.000Z"
                    }
                ],
                "ProductCategories": [
                    {
                        "id": 1,
                        "category_id": 1,
                        "product_id": 1,
                        "createdAt": "2025-05-11T08:42:21.000Z",
                        "updatedAt": "2025-05-11T08:42:21.000Z"
                    }
                ]
            }


]

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>(demoProducts);
  const [visibleCount, setVisibleCount] = useState(20);

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
      <div className="flex overflow-x-auto gap-4 items-center hide-scrollbar snap-x snap-mandatory scroll-smooth">
      
        {products.map((item) => (
           <ProductItems item={item}></ProductItems>
        ))}

        {/* Load More button also snaps */}
        {visibleCount < products.length && (
          <button
            onClick={() => {}}
            className="min-w-[100px] h-24 flex flex-col items-center justify-center bg-pink-50 text-pink-800 rounded-xl shadow-sm px-3 py-2 text-sm font-medium hover:bg-pink-100 snap-start"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductList;


