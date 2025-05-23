import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

const fruits = [
  {
    name: "Sindhura Mango (Aamba)",
    origin: "From Karnataka & Maharastra",
    description: "Golden-red,with honey-like sweetness",
    quantity: "3 pieces (450g-550g)",
    price: 79,
    originalPrice: 103,
    discount: "23% OFF",
    image:
      "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
  },
  {
    name: "Mango Kesar (Maharashtra)",
    origin: "From Maharashtra",
    description: "Saffron-hued, aromatic, fiber-free sweetness",
    quantity: "2 pieces (370 - 450 g)",
    price: 99,
    originalPrice: 128,
    discount: "22% OFF",
    image:
      "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
  },
  {
    name: "Medium Watermelon (Tarbooj)",
    origin: "",
    description: "Sweet and juicy, great for hydration.",
    quantity: "",
   price: 99,
    originalPrice: 128,
    discount: "20% OFF",
    image:
      "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
  },
  {
    name: "Robusta Banana (Kela)",
    origin: "",
    description: "Soft, sweet, perfect for snacking or smoothies.",
    quantity: "",
    price: 99,
    originalPrice: 128,
    discount: "21% OFF",
    image:
      "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
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
  const [products, setProducts] = useState(0);

  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      {/* Sidebar */}
      <aside className="flex w-22 flex-col items-center border-r bg-white px-2 py-4 sm:w-32">
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
              <span className="text-[11px] leading-4 sm:text-[12px]">{item.name}</span>
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

        {/* Fruits Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-4">
          {fruits.map((fruit, idx) => (
            <div key={idx} className="rounded-md border bg-white p-3 shadow-sm sm:p-4">
              <div className="relative">
                <img
                  src={fruit.image}
                  alt={fruit.name}
                  className="h-36 w-full rounded object-cover sm:h-40"
                />
                <span className="absolute top-2 left-2 rounded bg-orange-500 px-1.5 py-0.5 text-[10px] font-semibold text-white sm:text-xs">
                  {fruit.discount}
                </span>
              </div>
              <div className="mt-2 space-y-1 sm:mt-3">
                <h3 className="text-sm font-semibold leading-tight">
                  {fruit.name}
                </h3>
                <p className="text-[11px] text-gray-500 sm:text-xs">{fruit.description}</p>

                {fruit.price && (
                  <div className="relative mt-2 flex items-center justify-between text-sm">
                    <div>
                      <span className="font-semibold text-black">
                        ₹{fruit.price}
                      </span>{" "}
                      <span className="text-gray-400 line-through">
                        ₹{fruit.originalPrice}
                      </span>
                    </div>

                    {products > 0 ? (
                      <div className="flex h-fit items-center rounded-lg border border-[#02060c26]">
                        <Button
                          variant="outline"
                          className="h-fit cursor-pointer rounded-l-lg border-none px-2 py-1 text-sm font-semibold text-[#1ba672] hover:bg-[#02060c1a]"
                          onClick={(e) => {
                            e.stopPropagation();
                            setProducts(products - 1);
                          }}
                        >
                          -
                        </Button>
                        <p className="px-2 text-sm font-semibold text-[#1ba672]">
                          {products}
                        </p>
                        <Button
                          variant="outline"
                          className="h-fit cursor-pointer rounded-r-lg border-none px-2 py-1 text-sm font-semibold text-[#1ba672] hover:bg-[#02060c1a]"
                          onClick={(e) => {
                            e.stopPropagation();
                            setProducts(products + 1);
                          }}
                        >
                          +
                        </Button>
                      </div>
                    ) : (
                      <button
                        className="ml-auto rounded-lg border border-gray-300 px-3 py-1 text-sm font-semibold text-green-600 hover:shadow"
                        onClick={(e) => {
                          e.stopPropagation();
                          setProducts(1);
                        }}
                      >
                        ADD
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default SubCategoriesWithProductScreen;
