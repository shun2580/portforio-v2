import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Career from '@/components/Career';
import Contact from '@/components/Contact';

export default function Home(): React.ReactNode {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Career />
      <Contact />
    </>
  );
}
