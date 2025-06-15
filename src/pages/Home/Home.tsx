import BannerCarousel from "@/components/ui/banner-carousel";
import CategoryList from "@/components/custom/CategoryList";
import Footer from "@/components/custom/Fotter";
import CartSummaryBanner from "@/components/common/CartSummaryBanner";
import { HomeSkeleteon } from "@/components/custom/skeletons/HomeSkeleton";
import ErrorScreen from "@/components/error/ErrorScreen";
import { useGetCategoriesQuery } from "@/features/category/categoryAPI";
import TopCategoryProducts from "./TopCategoryProducts";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import AboutSection from "@/components/custom/AboutSection";
import { useAppSelector } from "@/app/hooks";
import { selectConfiguration } from "@/features/configuration/configurationSlice";
import { getUserLocation } from "@/utils/LocationDetector";
import { useEffect, useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const {
    data: topFiveCategory = {
      data: [],
    },
    isError: topFiveCategoryError,
    isLoading: topFiveCategoryLoading,
  } = useGetCategoriesQuery({
    limit: 5,
    sort_by: "priority",
    sort_order: "DESC",
  });

  const config = useAppSelector(selectConfiguration);
  console.log(config.data);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const location = await getUserLocation();
        setUserLocation(location);
        console.log("User location:", userLocation);
        // You can also store it in Redux or use it for API calls here
      } catch (error) {
        console.error("Failed to get location:", error);
        // Handle location error (maybe set a default location)
      }
    };

    getLocation();
  }, []);

  if (topFiveCategoryLoading) return <HomeSkeleteon />;
  if (topFiveCategoryError) return <ErrorScreen />;

  return (
    <div className="relative overflow-auto bg-orange-50">
      <div className="flex items-center gap-3 px-4 py-5">
        <p className="text-lg leading-4 font-medium break-words whitespace-nowrap text-[#02060cbf]">
          Top Collections
        </p>
        <div className="h-[1px] flex-1 [background:var(--bg-categroy-line)]"></div>
        <div
          className="flex cursor-pointer items-center gap-0.5"
          onClick={() => navigate(`/categories}`)}
        >
          <p className="text-[13px] leading-[17px] font-semibold tracking-[-0.33px] whitespace-nowrap text-[#ff5200]">
            See All
          </p>
          <ChevronRight color="#ff5200" size={18} />
        </div>
      </div>
      <CategoryList />
      <BannerCarousel />
      {topFiveCategory.data.length > 0 && (
        <div className="flex flex-col gap-8 pt-8">
          {topFiveCategory.data.map((category) => (
            <TopCategoryProducts key={category.id} category={category} />
          ))}
        </div>
      )}

      <AboutSection />
      <Footer />
      <CartSummaryBanner />
    </div>
  );
};

export default Home;
