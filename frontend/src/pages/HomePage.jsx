import FeatureSection from "../components/Home/FeatureSection";
import Footer from "../components/Footer";
import HeroSection from "../components/Home/HeroSection";
import HowItWorksSection from "../components/Home/HowItWorksSection";
import UseCasesSection from "../components/Home/UseCasesSection";
import Navbar from "../components/Home/Navbar";

function HomePage() {
  return (
    <div className="bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      {/* Navbar */}
      <Navbar />

      {/* HeroSection */}
      <HeroSection />

      {/*Features Section  */}
      <FeatureSection/>

      {/* How it works section */}
      <HowItWorksSection/>
      {/* Use Cases Section Section */}
      <UseCasesSection/>
      {/* Footer */}
      <Footer/>
     
    </div>
  );
}

export default HomePage;
