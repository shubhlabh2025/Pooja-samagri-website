
import MarqueeText from "./components/ui/marquee-text";
import Header from "./components/ui/navigation-header";
import CategoryList from "./components/ui/category-list";
import BannerCarousel from "./components/ui/banner-carousel";

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

  // Add more...
];

const handleCategoryClick = (categoryId: string) => {
  console.log("Clicked:", categoryId);
};

function App() {
  return (
    <>
      <div>
        <MarqueeText
          text="🚀 Welcome to the React TS Marquee Component Demo!"
          speed={15}
        />
      </div>
      <Header />
      <CategoryList
        categories={categories}
        onCategoryClick={handleCategoryClick}
      />
      <div >
    <BannerCarousel>

      </BannerCarousel>
      </div>
  
      {/* <BannerCarousel
        items={[
          {
            id: "1",
            image: "https://rukminim2.flixcart.com/fk-p-flap/480/80/image/41f7d7fb8967dab4.jpg?q=20",
            clickAction: () => console.log("Clicked 1"),
          },
          {
            id: "2",
            image: "https://rukminim2.flixcart.com/fk-p-flap/480/80/image/41f7d7fb8967dab4.jpg?q=20",
            clickAction: () => alert("Clicked 2"),
          },
        ]}
      /> */}
    </>
  );
}

export default App;
