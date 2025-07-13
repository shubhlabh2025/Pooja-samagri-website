import BannerCarousel from "@/components/custom/BannerCarousel";
import CategoryList from "@/components/custom/CategoryList";
import Footer from "@/components/custom/Fotter";
import CartSummaryBanner from "@/components/common/CartSummaryBanner";
import { HomeSkeleteon } from "@/components/skeletons/HomeSkeleton";
import ErrorScreen from "@/components/error/ErrorScreen";
import { useGetCategoriesQuery } from "@/features/category/categoryAPI";
import TopCategoryProducts from "./TopCategoryProducts";
import AboutSection from "@/components/custom/AboutSection";
import { useAppSelector } from "@/app/hooks";
import { selectConfiguration } from "@/features/configuration/configurationSlice";

const Home = () => {
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
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  console.log("Is Authenticated:", isAuthenticated);

  const config = useAppSelector(selectConfiguration);
  console.log(config.data);
  console.log(config.data?.data.ad_banners);

  if (topFiveCategoryLoading) return <HomeSkeleteon />;
  if (topFiveCategoryError) return <ErrorScreen />;

  return (
    <div className="hide-scrollbar \\ overflow-auto">
      <CategoryList />
      <BannerCarousel
        adBanner={config.data?.data.ad_banners || []}
        type="HOME"
      />
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
