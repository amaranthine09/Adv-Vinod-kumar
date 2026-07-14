import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Practice from "./components/Practice";
import Milestones from "./components/Milestones";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Practice />
      <Milestones />
      <Testimonials />
      <Contact />
      <Footer />
      <BackToTop />
    </>
  );
}
