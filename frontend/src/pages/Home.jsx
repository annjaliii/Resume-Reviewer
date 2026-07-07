import Hero from "../components/home/Hero";
import UploadBox from "../components/home/UploadBox";
import Footer from "../components/layout/Footer";
import FeatureCards from "../components/home/FeatureCards";
import HowItWorks from "../components/home/HowItWorks";
const Home = () => {
  return (
    <main>
      <Hero />
      <UploadBox />
      <Footer />
      <FeatureCards />
        <HowItWorks />
    </main>
  );
};

export default Home;
