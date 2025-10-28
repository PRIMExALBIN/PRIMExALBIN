'use client';

import Scene from '@/components/Scene';
import ProjectCard from '@/components/ProjectCard';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Fade-in sections on scroll
    gsap.utils.toArray<HTMLElement>('.fade-up').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  return (
    <>
      <Scene />
      
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center text-center fade-up">
        <div className="z-10 max-w-3xl px-4">
          <h1 className="text-6xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-accent-gold">
            PRIMExALBIN
          </h1>
          <h2 className="text-2xl md:text-3xl text-accent-blue mt-4 font-bold">
            Designing Tomorrow
          </h2>
          <p className="text-text-secondary mt-6 text-lg max-w-2xl mx-auto">
            Designing digital experiences that inspire, engage, and leave a lasting impression.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="section fade-up">
        <h2 className="text-4xl text-accent-gold text-center mb-12">About</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProjectCard
            title="Philosophy"
            description="I blend aesthetics with functionality to create interfaces that don’t just work—they resonate."
          />
          <ProjectCard
            title="Future-Forward"
            description="Exploring the intersection of design, code, and emerging tech to shape what’s next."
          />
        </div>
      </section>

      {/* Projects */}
      <section className="section fade-up">
        <h2 className="text-4xl text-accent-teal text-center mb-12">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ProjectCard
            title="Neon Grid"
            description="A responsive dashboard with dynamic 3D data visualization."
          />
          <ProjectCard
            title="Orbit UI"
            description="A design system inspired by celestial motion—fluid and intuitive."
          />
          <ProjectCard
            title="Voxel Lab"
            description="Experimental 3D web experiences using voxel art and spatial navigation."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-text-secondary">
        <p>
          Let’s build the future together. Reach out on{' '}
          <a href="https://twitter.com/PRIMExALBIN" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>{' '}
          or{' '}
          <a href="mailto:hello@primexalbin.dev">email</a>.
        </p>
      </footer>
    </>
  );
}