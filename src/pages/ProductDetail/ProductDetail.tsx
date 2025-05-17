import CategoryList from "@/components/custom/CategoryList";
import MarqueeText from "@/components/custom/MarqueeTree";
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

          <div className="mt-4 hidden w-full lg:block">
            <h2 className="text-l mb-4 font-normal">Related Products</h2>
            <div className="flex gap-6 overflow-x-auto">
              {relatedProducts.map((product, idx) => (
                <div key={idx} className="w-48 rounded border p-4">
                  <img
                    src={product.img}
                    alt={`${product.brand} shoe`}
                    className="mb-2 h-32 w-full object-contain"
                  />
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{product.brand}</p>
                    <p className="text-gray-700">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6 md:order-2">
          <div className="mb-2">
            <h1 className="text-3xl font-bold">Nike</h1>
            <p className="text-gray-600">Men's Shoe</p>
          </div>
          <p className="text-2xl font-semibold">₹{250}</p>

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

        {/* Related Products */}
        <div className="col-span-2 mt-1 block md:order-3 lg:hidden">
          <h2 className="mb-4 text-xl font-semibold">Related Products</h2>
          <div className="flex gap-6 overflow-x-auto">
            {relatedProducts.map((product, idx) => (
              <div key={idx} className="w-48 rounded border p-4">
                <img
                  src={product.img}
                  alt={`${product.brand} shoe`}
                  className="mb-2 h-32 w-full object-contain"
                />
                <div className="flex items-center justify-between">
                  <p className="font-medium">{product.brand}</p>
                  <p className="text-gray-700">${product.price}</p>
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
