import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import WhyChoose from "./components/WhyChoose";
import Process from "./components/Process";
import Practice from "./components/Practice";
import Milestones from "./components/Milestones";
import Testimonials from "./components/Testimonials";
import CTABanner from "./components/CTABanner";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <WhyChoose />
      <Process />
      <Practice />
      <Milestones />
      <Testimonials />
      <CTABanner />
      <FAQ />
      <Footer />
      <BackToTop />
    </>
  );
}
