'use client';
import { useEffect, useRef, useState } from 'react';

const bgImages = [
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920&q=80',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80',
];

const typingWords = [
  'Web Applications',
  'Mobile Experiences',
  'IT Solutions',
  'Digital Products',
  'Business Growth',
];

const trustBadges = [
  { icon: 'fa-shield-halved', text: '100% Secure' },
  { icon: 'fa-clock', text: 'On-Time Delivery' },
  { icon: 'fa-headset', text: '24/7 Support' },
  { icon: 'fa-star', text: '5-Star Service' },
];

export default function Hero() {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const [currentBg, setCurrentBg] = useState(0);
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Background Slideshow
  useEffect(() => {
    const interval = setInterval(
      () => setCurrentBg((prev) => (prev + 1) % bgImages.length),
      5000
    );
    return () => clearInterval(interval);
  }, []);

  // Typing Effect
  useEffect(() => {
    const currentWord = typingWords[typingIndex];
    let timeout;
    if (!isDeleting) {
      if (displayText.length < currentWord.length) {
        timeout = setTimeout(() => setDisplayText(currentWord.slice(0, displayText.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 40);
      } else {
        setIsDeleting(false);
        setTypingIndex((prev) => (prev + 1) % typingWords.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, typingIndex]);

  // Particle Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];

    const PARTICLE_COUNT = window.innerWidth < 768 ? 40 : 80;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random() * 0.5 + 0.2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    const maxDist = window.innerWidth < 768 ? 100 : 130;
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.25;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => { p.update(); p.draw(); });
      drawConnections();
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#050d1a' }}
    >
      {/* Slideshow */}
      {bgImages.map((img, i) => (
        <div
          key={i}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url(${img})`, opacity: currentBg === i ? 0.1 : 0 }}
        />
      ))}

      {/* Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(135deg,rgba(5,13,26,0.97) 0%,rgba(5,13,26,0.8) 50%,rgba(5,13,26,0.97) 100%)',
        }}
      />

      {/* Grid */}
      <div className="absolute inset-0 z-[1] cyber-grid-bg opacity-40" />

      {/* Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 z-[2] pointer-events-none" />

      {/* Glow orbs — hidden on very small screens */}
      <div
        className="absolute z-[1] hidden sm:block"
        style={{
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(0,212,255,0.07) 0%,transparent 70%)',
          top: '15%', left: '-8%',
        }}
      />
      <div
        className="absolute z-[1] hidden sm:block"
        style={{
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(0,102,204,0.09) 0%,transparent 70%)',
          bottom: '20%', right: '-4%',
        }}
      />

      {/* ── Hero Content ── */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-20 pb-16 sm:pt-24 sm:pb-20">

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 mb-6 sm:mb-8 px-4 py-2 rounded-full"
          style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.25)' }}
        >
          <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ background: '#00d4ff' }} />
          <span
            className="text-xs sm:text-sm font-semibold tracking-widest uppercase"
            style={{ color: '#00d4ff', fontFamily: 'Poppins,sans-serif' }}
          >
            Next-Gen IT Solutions
          </span>
        </div>

        {/* Heading — fluid sizes */}
        <h1
          className="font-black text-white mb-4 sm:mb-6 leading-tight"
          style={{
            fontFamily: 'Poppins,sans-serif',
            fontSize: 'clamp(2rem, 8vw, 4.5rem)',
          }}
        >
          Transform Your
          <br />
          <span className="gradient-text">Digital Vision</span>
          <br />
          Into Reality
        </h1>

        {/* Typing subtitle */}
        <div
          className="mb-4 sm:mb-6 font-medium"
          style={{
            color: '#8892a4',
            fontFamily: 'Inter,sans-serif',
            fontSize: 'clamp(1rem, 3vw, 1.4rem)',
          }}
        >
          We build world-class&nbsp;
          <span
            className="font-bold"
            style={{
              color: '#00d4ff',
              borderRight: '2px solid #00d4ff',
              paddingRight: '3px',
              animation: 'blink 0.75s step-end infinite',
            }}
          >
            {displayText}
          </span>
        </div>

        <p
          className="mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{
            color: '#5a6a7e',
            fontSize: 'clamp(0.875rem, 2vw, 1.0625rem)',
          }}
        >
          T2VR Creative Solution crafts innovative digital experiences that drive growth,
          efficiency, and lasting success for your business.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => scrollTo('contact')}
            className="btn-primary glow-btn w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4"
          >
            <i className="fas fa-rocket mr-2" />
            Get Free Consultation
          </button>
          <button
            onClick={() => scrollTo('services')}
            className="btn-outline w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4"
          >
            <i className="fas fa-layer-group mr-2" />
            Explore Services
          </button>
        </div>

        {/* Trust Badges — wrapping, 2-col on mobile */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2 sm:gap-4 mt-10 sm:mt-14">
          {trustBadges.map((badge) => (
            <div
              key={badge.text}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-full"
              style={{
                background: 'rgba(0,212,255,0.05)',
                border: '1px solid rgba(0,212,255,0.12)',
              }}
            >
              <i className={`fas ${badge.icon} text-xs`} style={{ color: '#00d4ff' }} />
              <span className="text-xs sm:text-sm text-gray-400 font-medium">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator — hidden on very small screens */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2">
        <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll Down</span>
        <div
          className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
          style={{ border: '1px solid rgba(0,212,255,0.3)' }}
        >
          <div className="w-1.5 h-2.5 rounded-full animate-bounce" style={{ background: '#00d4ff' }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          from, to { border-color: transparent; }
          50% { border-color: #00d4ff; }
        }
      `}</style>
    </section>
  );
}
