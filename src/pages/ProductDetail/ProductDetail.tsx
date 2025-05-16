import CategoryList from "@/components/custom/CategoryList";
import MarqueeText from "@/components/custom/MarqueeTree";
import HomeNavBar from "@/components/navigation/HomeNavBar";

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

const ProductDetailsScreen = () => {
  function handleCategoryClick(): void {
    throw new Error("Function not implemented.");
  }

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
    </>
  );
};

export default ProductDetailsScreen;
