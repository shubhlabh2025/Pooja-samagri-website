import { get } from "@/api/apiFunction";
import BannerCarousel from "@/components/ui/banner-carousel";
import CategoryList from "@/components/custom/CategoryList";
import MarqueeText from "@/components/custom/MarqueeTree";
import type { Product } from "@/interfaces/product";
import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import HomeNavBar from "@/components/navigation/HomeNavBar";

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
    <>
      <div>
        <MarqueeText
          text="🚀 Welcome to the React TS Marquee Component Demo!"
          speed={15}
        />
      </div>
      <HomeNavBar />
      <CategoryList
        categories={categories}
      />

      <BannerCarousel></BannerCarousel>
      <span className="flex text-base font-semibold ms-3 mt-8">
        Explore the Products
      </span>
      <ProductList></ProductList>
    </>
  );
};

export default Home;
