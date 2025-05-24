import CartSummaryBanner from "@/components/common/CartSummaryBanner";
import { ChevronLeft } from "lucide-react";
import ProductItems from "../Home/ProductItem";
import type { Product } from "@/interfaces/product";

const demoProducts: Product[] = [
  {
    id: "1",
    out_of_stock: false,
    default_variant_id: "123",
    product_variants: [
      {
        variant_id: "123",
        product_id: "1",
        display_label: "1 Piece",
        name: "Apple",
        description: "Fresh and juicy apples",
        mrp: 111,
        price: 111,
        image: [
          "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_272,w_252/e4c44e5bd4599c7b2ce68c5217ffc86f",
        ],
        brand_name: "Shubh Labh",
        categories: [
          {
            id: "category1",
            name: "Fruits",
            image: "https://example.com/category1.jpg",
            parent_id: null,
          },
          {
            id: "category2",
            name: "Juices",
            image: "https://example.com/category2.jpg",
            parent_id: "category1",
          },
        ],
        out_of_stock: false,
      },
      {
        variant_id: "1234",
        product_id: "1",
        display_label: "2 x 1 Piece",
        description: "Fresh and juicy apples",
        name: "Apple",
        mrp: 200,
        price: 122,
        image: [
          "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_272,w_252/e4c44e5bd4599c7b2ce68c5217ffc86f",
        ],
        categories: [
          {
            id: "category1",
            name: "Fruits",
            image: "https://example.com/category1.jpg",
            parent_id: null,
          },
          {
            id: "category2",
            name: "Juices",
            image: "https://example.com/category2.jpg",
            parent_id: "category1",
          },
        ],
        brand_name: "Shubh Labh",
        out_of_stock: false,
      },
    ],
  },
  {
    id: "2",
    out_of_stock: false,
    default_variant_id: "123",
    product_variants: [
      {
        variant_id: "1234323",
        product_id: "2",
        display_label: "1 Piece",
        name: "Apple",
        description: "Fresh and juicy apples",
        mrp: 111,
        price: 99,
        image: [
          "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_272,w_252/e4c44e5bd4599c7b2ce68c5217ffc86f",
        ],
        brand_name: "Shubh Labh",
        categories: [
          {
            id: "category1",
            name: "Fruits",
            image: "https://example.com/category1.jpg",
            parent_id: null,
          },
          {
            id: "category2",
            name: "Juices",
            image: "https://example.com/category2.jpg",
            parent_id: "category1",
          },
        ],
        out_of_stock: false,
      },
    ],
  },
];

const sidebarItems = [
  {
    name: "Fresh Fruits",
    icon: "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
    active: true,
  },
  {
    name: "Summer Fruits",
    icon: "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
  },
  {
    name: "Exotic Fruits",
    icon: "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
  },
  {
    name: "Cut Fruits and Juices",
    icon: "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
  },
  {
    name: "Pooja & Festive",
    icon: "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
  },
  {
    name: "Bouquet & Plants",
    icon: "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
  },
];
const SubCategoriesWithProductScreen = () => {
  return (
    <>
      <div className="flex min-h-screen bg-[#fafafa]">
        {/* Sidebar */}
        <aside className="flex w-20 flex-col items-center border-r bg-white px-2 py-4 sm:w-32">
          <div className="w-full space-y-4 sm:space-y-5">
            {sidebarItems.map((item, index) => (
              <div
                key={index}
                className={`flex cursor-pointer flex-col items-center justify-center rounded-lg px-2 py-2 text-center ${
                  item.active
                    ? "bg-[#FDF0F5] font-semibold text-[#BE1562]"
                    : "text-[#02060c]"
                }`}
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className="mb-1 h-10 w-10 object-contain"
                />
                <span className="text-[11px] leading-4 sm:text-[12px]">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6">
          <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
            <ChevronLeft size={20} className="cursor-pointer" />
            <h1 className="text-base font-semibold sm:text-xl">
              110 items in Fresh Fruits
            </h1>
          </div>

          <div className="xs3col:grid-cols-3 grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
            {demoProducts.map((product) => (
              <ProductItems item={product}></ProductItems>
            ))}
          </div>
        </div>
      </div>
      <CartSummaryBanner />
    </>
  );
};

export default SubCategoriesWithProductScreen;
