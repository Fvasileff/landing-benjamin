import About from './landing/About';
import Contact from './landing/Contact';
import Footer from './landing/Footer';
import Hero from './landing/Hero';
import Navbar from './landing/Navbar';
import PracticeAreas from './landing/PracticeAreas';
import Testimonials from './landing/Testimonials';

export default function LandingPage({ testimonios }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 font-sans text-slate-100">
      <Navbar />
      <main>
        <Hero />
        <PracticeAreas />
        <About />
        <Testimonials testimonios={testimonios} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
