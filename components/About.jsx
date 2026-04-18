'use client';
import { useRef, useEffect, useState } from 'react';

const milestones = [
  { year: '2019', event: 'T2VR Creative Solution Founded',        icon: 'fa-flag' },
  { year: '2020', event: 'First Major Enterprise Project',        icon: 'fa-briefcase' },
  { year: '2022', event: 'Expanded to Mobile App Development',    icon: 'fa-mobile-screen' },
  { year: '2024', event: '50+ Successful Projects Delivered',     icon: 'fa-trophy' },
];

const highlights = [
  { icon: 'fa-lightbulb',    text: 'Innovative Thinking' },
  { icon: 'fa-users',        text: 'Expert Team' },
  { icon: 'fa-shield-halved',text: 'Secure & Reliable' },
  { icon: 'fa-chart-line',   text: 'Results-Driven' },
];

export default function About() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{ background: '#050d1a' }}
      ref={ref}
    >
      <div
        className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 rounded-full opacity-5 pointer-events-none"
        style={{
          background: 'radial-gradient(circle,#00d4ff,transparent)',
          transform: 'translate(30%,-30%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Stack vertically on mobile, side-by-side on lg */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">

          {/* ── Left ── */}
          <div
            className={`transition-all duration-700 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="section-tag">Who We Are</div>
            <h2
              className="font-black text-white mb-4 sm:mb-6"
              style={{ fontFamily: 'Poppins,sans-serif', fontSize: 'clamp(1.75rem,5vw,3rem)' }}
            >
              Building the Future,{' '}
              <span className="gradient-text">One Solution</span> at a Time
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
              T2VR Creative Solution is a next-generation IT company committed to transforming
              businesses through cutting-edge technology. We combine creativity, precision, and
              deep technical expertise to deliver solutions that actually move the needle.
            </p>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
              From startups taking their first digital steps to enterprises looking to
              modernise — we partner with businesses at every stage, bringing the same
              dedication and innovation to every project we undertake.
            </p>

            {/* 2-col grid of highlights */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {highlights.map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl"
                  style={{
                    background: 'rgba(0,212,255,0.04)',
                    border: '1px solid rgba(0,212,255,0.1)',
                  }}
                >
                  <div
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(0,212,255,0.1)', color: '#00d4ff' }}
                  >
                    <i className={`fas ${item.icon} text-xs sm:text-sm`} />
                  </div>
                  <span className="text-gray-300 text-xs sm:text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary text-sm sm:text-base w-full sm:w-auto"
            >
              <i className="fas fa-handshake mr-2" />
              Partner With Us
            </button>
          </div>

          {/* ── Right ── */}
          <div
            className={`transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            {/* Company Card */}
            <div
              className="card-cyber rounded-2xl p-6 sm:p-8 mb-5 sm:mb-6"
              style={{ background: 'linear-gradient(135deg,rgba(0,212,255,0.05),rgba(0,102,204,0.05))' }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-black text-base sm:text-xl flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg,#00d4ff,#0066cc)',
                    boxShadow: '0 0 30px rgba(0,212,255,0.4)',
                    fontFamily: 'Poppins,sans-serif',
                  }}
                >
                  T2
                </div>
                <div>
                  <h3
                    className="text-base sm:text-xl font-bold text-white"
                    style={{ fontFamily: 'Poppins,sans-serif' }}
                  >
                    T2VR Creative Solution
                  </h3>
                  <p className="text-cyan-400 text-xs sm:text-sm font-medium">
                    Where Innovation Meets Excellence
                  </p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed italic border-l-2 border-cyan-500/30 pl-4">
                "Our mission is to empower every client with technology solutions that not only
                solve today's problems but also position them for tomorrow's opportunities."
              </p>
              <div className="mt-3 text-right">
                <span className="text-xs text-gray-500">— T2VR Leadership Team</span>
              </div>
            </div>

            {/* Timeline */}
            <h4
              className="text-xs uppercase tracking-widest mb-3 sm:mb-4"
              style={{ color: '#00d4ff', fontFamily: 'Poppins,sans-serif' }}
            >
              Our Journey
            </h4>
            <div className="space-y-3">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all duration-500 ${
                    visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                  style={{
                    transitionDelay: `${300 + i * 100}ms`,
                    background: 'rgba(13,31,53,0.5)',
                    border: '1px solid rgba(0,212,255,0.1)',
                  }}
                >
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg,rgba(0,212,255,0.15),rgba(0,102,204,0.15))',
                      border: '1px solid rgba(0,212,255,0.3)',
                    }}
                  >
                    <i className={`fas ${m.icon} text-xs sm:text-sm`} style={{ color: '#00d4ff' }} />
                  </div>
                  <div>
                    <span className="text-xs font-bold mr-2" style={{ color: '#00d4ff' }}>{m.year}</span>
                    <span className="text-gray-300 text-xs sm:text-sm">{m.event}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
