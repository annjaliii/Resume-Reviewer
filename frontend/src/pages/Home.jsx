import Hero from "../components/home/Hero";
import UploadBox from "../components/home/UploadBox";

import FeatureCards from "../components/home/FeatureCards";
import HowItWorks from "../components/home/HowItWorks";
import Testimonials from "../components/home/Testimonials";

import CTA from "../components/home/CTA";

const Home = () => {
  return (
    <main>
      <Hero />
      <UploadBox />

      <FeatureCards />
      <HowItWorks />
      <Testimonials />

      <CTA />
      
    </main>
  );
};

export default Home;
