import { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import CustomCursor from './components/CustomCursor.jsx';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-paper text-ink">
      <div className="grain-overlay" aria-hidden />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee
          items={[
            'Design',
            'Development',
            'Security',
            'Visual Editing',
            'Brand',
            'Motion',
          ]}
        />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
