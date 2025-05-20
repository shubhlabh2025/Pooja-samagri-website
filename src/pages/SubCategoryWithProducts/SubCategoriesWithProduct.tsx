import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

const SubCategoriesWithProductScreen = () => {
  const [product, setProducts] = useState(0);

  const products = [
    {
      name: "Sindhura Mango (Aamba)",
      description: "Golden-red, with honey-like sweetness",
      region: "From Karnataka & Maharastra",
      weight: "3 pieces (450g–550g)",
      price: 82,
      oldPrice: 103,
      options: 2,
      image:
        "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
    },
    {
      name: "Banganapalli Mango (Aamba)",
      description: "Large, luscious, low-fiber Indian delight",
      region: "From Andhra Pradesh & Tamil Nadu",
      weight: "1 Piece (250–450 g)",
      price: 72,
      oldPrice: 90,
      options: 3,
      image:
        "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
    },
  ];

  const categories = [
    {
      name: "Fresh Fruits",
      image:
        "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
      active: true,
    },
    {
      name: "Summer Fruits",
      image:
        "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
      active: false,
    },
    {
      name: "Exotic Fruits",
      image:
        "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
      active: false,
    },
    {
      name: "Cut Fruits and Juices",
      image:
        "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
      active: false,
    },
  ];

  return (
    <div className="flex h-screen flex-col overflow-hidden md:flex-row">
      {/* Sidebar */}
      <aside className="w-full overflow-auto border-r bg-white p-4 md:w-64">
        <div className="grid grid-cols-3 gap-6 md:grid-cols-1">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className={`flex cursor-pointer flex-col items-center text-center ${
                cat.active ? "font-semibold text-pink-700" : "text-gray-700"
              }`}
            >
              <div
                className={`mb-2 flex h-16 w-16 items-center justify-center rounded-xl border border-gray-200 bg-white shadow ${
                  cat.active ? "border-pink-600" : ""
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-10 w-10 object-contain"
                />
              </div>
              <span className="text-xs md:text-sm">{cat.name}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between md:mb-6">
          <div className="flex items-center gap-2 text-base font-medium md:gap-3 md:text-lg">
            <ChevronLeft className="cursor-pointer" />
            <div>
              <div>Fresh Fruits</div>
              <div className="text-xs text-gray-500 md:text-sm">588 items</div>
            </div>
          </div>
        </div>

        <div className="mb-3 text-sm font-medium text-gray-700 md:mb-4 md:text-base">
          110 items in{" "}
          <span className="font-semibold text-black">Fresh Fruits</span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {products.map((p, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md md:p-4"
            >
              <div className="relative">
                <img
                  src={p.image}
                  alt={p.name}
                  className="mb-3 h-36 w-full rounded-lg object-cover md:mb-4 md:h-40"
                />
                <span className="absolute top-2 left-2 rounded bg-orange-500 px-2 py-1 text-[10px] font-bold text-white md:text-xs">
                  20% OFF
                </span>
                <span className="absolute bottom-2 left-2 rounded bg-green-100 px-2 py-1 text-[10px] font-medium text-green-800 md:text-xs">
                  {p.region}
                </span>
              </div>
              <div className="text-[11px] text-gray-500 md:text-xs">
                26 MINS
              </div>
              <div className="text-sm font-semibold text-gray-900 md:text-base">
                {p.name}
              </div>
              <div className="text-xs text-gray-600 md:text-sm">
                {p.description}
              </div>
              <div className="mt-1 text-xs text-gray-700 md:text-sm">
                {p.weight}
              </div>
              <div className="relative mt-1 flex items-center gap-2 text-xs md:text-sm">
                <span className="font-semibold text-gray-900">₹{p.price}</span>
                <span className="text-gray-400 line-through">
                  ₹{p.oldPrice}
                </span>
                <div className="absolute bottom-[1px]  right-1">
                  {product > 0 ? (
                    <div className="flex h-fit items-center rounded-lg border border-[#02060c26] p-0">
                      <Button
                        variant="outline"
                        className="h-fit cursor-pointer rounded-l-lg rounded-r-none border-none px-2 py-1.5 leading-[1.125rem] font-semibold tracking-[0.35px] text-[#1ba672] shadow-none transition-colors duration-150 group-hover:bg-inherit hover:bg-[#02060c26] hover:text-[#1ba672]"
                        onClick={(e) => {
                          e.stopPropagation();
                          setProducts(product - 1);
                          // handleDecreaseProductQantity(item.product_id);
                        }}
                      >
                        -
                      </Button>

                      <div className="group flex">
                        <p className="cursor-default px-1 py-1.5 text-sm leading-[1.125rem] font-semibold tracking-[0.35px] text-[#1ba672] shadow-none group-hover:bg-[#02060c26]">
                          {product}
                        </p>
                      </div>

                      <Button
                        variant="outline"
                        className="h-fit cursor-pointer rounded-l-none rounded-r-lg border-none px-2 py-1.5 leading-[1.125rem] font-semibold tracking-[0.35px] text-[#1ba672] transition-colors duration-150 group-hover:bg-inherit hover:bg-[#02060c26] hover:text-[#1ba672]"
                        onClick={(e) => {
                          e.stopPropagation();
                          setProducts(product + 1);
                          // handleIncreaseProductQantity(item.product_id);
                        }}
                      >
                        +
                      </Button>
                    </div>
                  ) : (
                    <button
                      className="ml-auto rounded-lg border border-gray-300 px-3 py-1 text-sm font-semibold text-green-600 hover:shadow-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setProducts(1);
                      }}
                    >
                      ADD
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCategoriesWithProductScreen;
