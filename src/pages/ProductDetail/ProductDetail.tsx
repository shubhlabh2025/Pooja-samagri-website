import MarqueeText from "@/components/custom/MarqueeTree";
import ThumbnailCarousel from "@/components/custom/ThumbnailCarousel";
import HomeNavBar from "@/components/navigation/HomeNavBar";
import { useState } from "react";

const ProductDetailsScreen = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("100g");

  const sizes = ["100g", "250g", "500g", "1kg"];
  const relatedProducts = [
    {
      brand: "adidas",
      price: 250,
      img: "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
    },
    {
      brand: "Nike",
      price: 250,
      img: "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
    },
    {
      brand: "Nike",
      price: 250,
      img: "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
    },
        {
      brand: "Nike",
      price: 250,
      img: "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
    },
        {
      brand: "Nike",
      price: 250,
      img: "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
    },
  ];

  return (
    <>
      <div>
        <MarqueeText
          text="🚀 Welcome to the React TS Marquee Component Demo!"
          speed={15}
        />
      </div>
      <HomeNavBar />

      <div className="flex flex-col gap-10 p-10 md:grid md:grid-cols-2">
        {/* Product Image on top for small devices */}
        <div className="flex flex-col items-center justify-center md:order-1">
          <img
            src="https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/banner.jpg"
            alt="Nike Shoe"
            className="w-full max-w-md"
          />

          {/* Small Thumbnails */}
          <ThumbnailCarousel></ThumbnailCarousel>
        </div>

        {/* Product Details */}
        <div className="space-y-6 md:order-2">
          <div className="mb-2">
            <h1 className="text-3xl font-bold">Nike</h1>
            <p className="text-gray-600">Men's Shoe</p>
            {/* ⭐️ Star Review Section */}
            <div className="mt-2 flex flex-row items-center space-x-1">
              {Array.from({ length: 5 }).map((_, idx) => (
                <svg
                  key={idx}
                  className="h-5 w-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.214 3.736a1 1 0 00.95.69h3.924c.969 0 1.371 1.24.588 1.81l-3.18 2.31a1 1 0 00-.364 1.118l1.214 3.736c.3.921-.755 1.688-1.54 1.118l-3.18-2.31a1 1 0 00-1.175 0l-3.18 2.31c-.784.57-1.838-.197-1.539-1.118l1.213-3.736a1 1 0 00-.364-1.118L2.273 9.163c-.783-.57-.38-1.81.588-1.81h3.925a1 1 0 00.95-.69l1.214-3.736z" />
                </svg>
              ))}
              <p className="pt-1 text-gray-600">Based on 3 Reviews</p>
            </div>
          </div>
          <div className="flex flex-row space-x-2">
            <p className="text-2xl font-semibold">₹{250}</p>
            <p className="text-l justify-center font-normal line-through">
              ₹{350}
            </p>
          </div>

          <p className="text-gray-600">
            Bringing a new look to the Waffle sneaker family, the Nike Waffle
            One balances everything you love about heritage Nike running with
            fresh innovations. Its TPU heel clip adds energy while a mixture of
            transparent mesh (let that sock game shine) and retro suedes give
            texture and depth. The updated Waffle outsole provides a level of
            support and traction you have to feel to believe.
          </p>

          <div className="flex items-center gap-4">
            <p className="text-lg">Quantity</p>
            <div className="flex items-center rounded border px-2">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          <div>
            <p className="mb-2 font-medium">Select Size</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSize(size)}
                  className={`rounded border px-4 py-2 ${selectedSize === size ? "bg-black text-white" : "bg-white text-black"}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex gap-4">
            <button className="rounded bg-black px-6 py-2 text-white">
              Buy Now
            </button>
            <button className="rounded border border-black px-6 py-2">
              Add to Cart
            </button>
          </div>

          <p className="text-gray-500">
            Delivery <span className="font-medium">(3 days)</span>
          </p>
        </div>

        <div className="col-span-2 mt-2 md:order-3">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            Related Products
          </h2>
          <div className="scrollbar-hide flex gap-6 overflow-x-auto">
            {relatedProducts.map((product, idx) => (
              <div
                key={idx}
                className="min-w-[180px] rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <img
                  src={product.img}
                  alt={`Related product ${idx + 1}`}
                  className="mb-4 h-32 w-full rounded-lg object-cover"
                />
                <div className="flex items-center justify-between text-sm">
                  <p className="truncate font-medium text-gray-900">
                    {product.brand}
                  </p>
                  <p className="font-semibold text-gray-700">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
     
      </div>
    </>
  );
};

export default ProductDetailsScreen;
