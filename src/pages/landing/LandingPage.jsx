import React, { useEffect, useState } from "react";
import HomePageHeroSection from "../../component/home_page/HomePageHeroSection";
import HomePageCategorySection from "../../component/home_page/HomePageCategorySection";
import HomePageFeaturedPropertiesSection from "../../component/home_page/HomePageFeaturedPropertiesSection";
import HomePageWhyChooseSection from "../../component/home_page/HomePageWhyChooseSection";
import HomePageLocationsSection from "../../component/home_page/HomePageLocationsSection";
import HomePageServicesSection from "../../component/home_page/HomePageServicesSection";
import HomePageHowItWorksSection from "../../component/home_page/HomePageHowItWorksSection";
import HomePageBuySellRentSection from "../../component/home_page/HomePageBuySellRentSection";
import HomePagePropertyVerificationSection from "../../component/home_page/HomePagePropertyVerificationSection";
import HomePageInvestmentSection from "../../component/home_page/HomePageInvestmentSection";
import HomePageInsightsSection from "../../component/home_page/HomePageInsightsSection";
import HomePageTestimonialsSection from "../../component/home_page/HomePageTestimonialsSection";
import HomePageListPropertySection from "../../component/home_page/HomePageListPropertySection";
import HomePageFAQSection from "../../component/home_page/HomePageFAQSection";
import HomePageFinalCTASection from "../../component/home_page/HomePageFinalCTASection";
import PageLoader from "../../component/common/PageLoader";

const LandingPage = () => {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 1000);

    // Cleanup timer when component unmounts
    return () => clearTimeout(timer);
  }, []);

  // Show loader for 1 second
  if (loader) {
    return <PageLoader />;
  }

  return (
    <div>
      <HomePageHeroSection />
      <HomePageCategorySection />
      <HomePageFeaturedPropertiesSection />
      <HomePageWhyChooseSection />
      <HomePageLocationsSection />
      <HomePageServicesSection />
      <HomePageHowItWorksSection />
      <HomePageBuySellRentSection />
      <HomePagePropertyVerificationSection />
      <HomePageInvestmentSection />
      <HomePageInsightsSection />
      <HomePageTestimonialsSection />
      <HomePageListPropertySection />
      <HomePageFAQSection />
      <HomePageFinalCTASection />
    </div>
  );
};

export default LandingPage;
