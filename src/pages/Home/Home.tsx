import { get } from "@/api/apiFunction";
import BannerCarousel from "@/components/ui/banner-carousel";
import CategoryList from "@/components/custom/CategoryList";
import type { Product } from "@/interfaces/product";
import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import Footer from "@/components/custom/Fotter";
import { Link } from "react-router";
import CartSummaryBanner from "@/components/common/CartSummaryBanner";

const Home = () => {
  const categories = [
    {
      categoryId: "1",
      categoryImage:
        "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_249/NI_CATALOG/IMAGES/CIW/2025/3/19/f7d9376b-bd76-4d32-b764-c571cc77a2e9_1caf9829-007f-4b8d-a38e-fa6d092320c2",
      categoryText: "Cold Drinks and Juices",
    },
    {
      categoryId: "2",
      categoryImage:
        "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_249/NI_CATALOG/IMAGES/CIW/2025/3/19/f7d9376b-bd76-4d32-b764-c571cc77a2e9_1caf9829-007f-4b8d-a38e-fa6d092320c2",
      categoryText: "Ice Creams and Frozen Desserts",
    },
    {
      categoryId: "3",
      categoryImage:
        "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_249/NI_CATALOG/IMAGES/CIW/2025/3/19/f7d9376b-bd76-4d32-b764-c571cc77a2e9_1caf9829-007f-4b8d-a38e-fa6d092320c2",
      categoryText: "Cold Drinks and Juices",
    },
    {
      categoryId: "4",
      categoryImage:
        "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_249/NI_CATALOG/IMAGES/CIW/2025/3/19/f7d9376b-bd76-4d32-b764-c571cc77a2e9_1caf9829-007f-4b8d-a38e-fa6d092320c2",
      categoryText: "Ice Creams and Frozen Desserts",
    },
    {
      categoryId: "5",
      categoryImage:
        "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_249/NI_CATALOG/IMAGES/CIW/2025/3/19/f7d9376b-bd76-4d32-b764-c571cc77a2e9_1caf9829-007f-4b8d-a38e-fa6d092320c2",
      categoryText: "Cold Drinks and Juices",
    },
    {
      categoryId: "6",
      categoryImage:
        "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_249/NI_CATALOG/IMAGES/CIW/2025/3/19/f7d9376b-bd76-4d32-b764-c571cc77a2e9_1caf9829-007f-4b8d-a38e-fa6d092320c2",
      categoryText: "Ice Creams and Frozen Desserts",
    },
    {
      categoryId: "7",
      categoryImage:
        "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_249/NI_CATALOG/IMAGES/CIW/2025/3/19/f7d9376b-bd76-4d32-b764-c571cc77a2e9_1caf9829-007f-4b8d-a38e-fa6d092320c2",
      categoryText: "Cold Drinks and Juices",
    },
    {
      categoryId: "8",
      categoryImage:
        "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_249/NI_CATALOG/IMAGES/CIW/2025/3/19/f7d9376b-bd76-4d32-b764-c571cc77a2e9_1caf9829-007f-4b8d-a38e-fa6d092320c2",
      categoryText: "Ice Creams and Frozen Desserts",
    },
    {
      categoryId: "9",
      categoryImage:
        "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_249/NI_CATALOG/IMAGES/CIW/2025/3/19/f7d9376b-bd76-4d32-b764-c571cc77a2e9_1caf9829-007f-4b8d-a38e-fa6d092320c2",
      categoryText: "Cold Drinks and Juices",
    },
    {
      categoryId: "10",
      categoryImage:
        "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_249/NI_CATALOG/IMAGES/CIW/2025/3/19/f7d9376b-bd76-4d32-b764-c571cc77a2e9_1caf9829-007f-4b8d-a38e-fa6d092320c2",
      categoryText: "Ice Creams and Frozen Desserts",
    },
    {
      categoryId: "11",
      categoryImage:
        "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_249/NI_CATALOG/IMAGES/CIW/2025/3/19/f7d9376b-bd76-4d32-b764-c571cc77a2e9_1caf9829-007f-4b8d-a38e-fa6d092320c2",
      categoryText: "Cold Drinks and Juices",
    },
    {
      categoryId: "12",
      categoryImage:
        "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_249/NI_CATALOG/IMAGES/CIW/2025/3/19/f7d9376b-bd76-4d32-b764-c571cc77a2e9_1caf9829-007f-4b8d-a38e-fa6d092320c2",
      categoryText: "Ice Creams and Frozen Desserts",
    },
    {
      categoryId: "13",
      categoryImage:
        "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_249/NI_CATALOG/IMAGES/CIW/2025/3/19/f7d9376b-bd76-4d32-b764-c571cc77a2e9_1caf9829-007f-4b8d-a38e-fa6d092320c2",
      categoryText: "Cold Drinks and Juices",
    },
    {
      categoryId: "14",
      categoryImage:
        "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_249/NI_CATALOG/IMAGES/CIW/2025/3/19/f7d9376b-bd76-4d32-b764-c571cc77a2e9_1caf9829-007f-4b8d-a38e-fa6d092320c2",
      categoryText: "Ice Creams and Frozen Desserts",
    },
    {
      categoryId: "15",
      categoryImage:
        "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_249/NI_CATALOG/IMAGES/CIW/2025/3/19/f7d9376b-bd76-4d32-b764-c571cc77a2e9_1caf9829-007f-4b8d-a38e-fa6d092320c2",
      categoryText: "Cold Drinks and Juices",
    },
    {
      categoryId: "16",
      categoryImage:
        "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_249/NI_CATALOG/IMAGES/CIW/2025/3/19/f7d9376b-bd76-4d32-b764-c571cc77a2e9_1caf9829-007f-4b8d-a38e-fa6d092320c2",
      categoryText: "Ice Creams and Frozen Desserts",
    },

    // Add more...
  ];

  const [products, setProducts] = useState<Product[]>([]);

  const getAllProductdata = () => {
    get(`api/products?page=1&pageSize=10`)
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data.data.products);
          setProducts(res.data.data.products);
        } else {
          alert("Error Occured");
        }
      })
      .catch(() => {});
  };

  const getAllCategoriesData = () => {
    get(`api/categories?page=1&pageSize=10`)
      .then((res) => {
        if (res.status == 200) {
          console.log(res);
        } else {
          alert("Error Occured");
        }
      })
      .catch(() => {});
  };

  const getAdBannersData = () => {
    get(`api/banners?page=1&pageSize=10`)
      .then((res) => {
        if (res.status == 200) {
          console.log(res);
        } else {
          alert("Error Occured");
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    getAllProductdata();
    getAllCategoriesData();
    getAdBannersData();
  }, []);

  useEffect(() => {
    console.log("Products updated in state:", products);
  }, [products]);
  return (
    <div className="relative">
      <div className="mt-2 mr-4 ml-2 flex items-center justify-between">
        <span className="text-lg font-semibold">Categories</span>
        <Link to="/category">
          <span className="text-sm font-semibold text-red-600">View All</span>
        </Link>
      </div>

      <CategoryList categories={categories} />

      <BannerCarousel></BannerCarousel>
      <span className="ms-3 mt-4 flex text-base font-semibold">
        Trending Products
      </span>
      <ProductList></ProductList>
      <span className="ms-3 mt-4 flex text-base font-semibold">
        Best Sellers
      </span>
      <ProductList></ProductList>

      <div className="flex w-full flex-col bg-[#FF9B17] p-10 sm:flex-row sm:p-24">
        <div>
          <span className="text-[24px] text-white sm:p-10">Namaste!</span>
        </div>

        <div className="">
          <span className="text-[16px] leading-loose text-white">
            Welcome to the world of SHUBH LABH Pooja Samagri, Bringing Devotion
            To Your Doorstep.. Shubh Labh Pooja Samagri was Founded by Mr. Raja
            Rachakonda & Mr. Yesh Bandaru with the vision of seamlessly blending
            tradition with convenience. With Began as a thoughtful business
            intiative has since flourished into a growing enterprise, with the
            goal of becoming a leading brand in India’s devotional space. The
            company specializes in delivering an unlimited range of Pooja
            Products through our website, Andriod & IOS platforms. Bringing
            devotion directly to the doorsteps of households across the nation.
            With hundreds of satisfied customers every month they only get
            encouraged.
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row">
        <div className="mb-20 flex-1">
          <img
            className="h-full w-full"
            src="https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg"
          ></img>
        </div>
        <div className="flex w-full flex-1 flex-col">
          <div className="flex h-full w-full justify-end">
            <div className="flex h-full w-full flex-col items-center justify-center p-10 sm:rounded-tl-2xl sm:rounded-bl-2xl">
              <span className="text-[24px] font-bold text-black">
                Our Vision
              </span>

              <span className="text-[16px] leading-loose text-black">
                To Touch more hearts and inspire a deeper connection to
                spiritual Tradition.<br></br>
                “Is to provide the finest religios products, upholding purity,
                heartfelt devotion and uncompromising hygiene in every
                offering.” At SHUBH LABH Pooja Samagri, we are committed to
                preserving the essence of time-honored traditions while
                embracing the power of modern convenience. To serve not just as
                a provider of spiritual essentials, but as a bridge between
                heritage and the future, guiding new generations in their
                devotional journey
              </span>
            </div>
          </div>

          {/* <div className="flex w-full justify-start">
          <div className="flex h-[200px] w-1/2 max-w-1/2 flex-col rounded-tr-2xl rounded-br-2xl bg-red-500">
            <span>About us</span>
          </div>
        </div> */}
        </div>
      </div>
      <Footer />
      <CartSummaryBanner />
    </div>
  );
};

export default Home;
