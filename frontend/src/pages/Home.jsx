import Hero from "../components/home/Hero";
import UploadBox from "../components/home/UploadBox";
import Footer from "../components/layout/Footer";
import FeatureCards from "../components/home/FeatureCards";
const Home = () => {
  return (
    <main>
      <Hero />
      <UploadBox />
      <Footer />
      <FeatureCards />
    </main>
  );
};

export default Home;
