import MarqueeText from "@/components/custom/MarqueeTree";
import HomeNavBar from "@/components/navigation/HomeNavBar";


const SubCategoriesWithProductScreen = () => {


  return (
    <>
      <div>
        <MarqueeText
          text="🚀 Welcome to the React TS Marquee Component Demo!"
          speed={15}
        />
      </div>
      <HomeNavBar />

      <div>
        SubCategories
      </div>

    </>
  );
};


export default SubCategoriesWithProductScreen;