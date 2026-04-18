'use client';
import { useState, useEffect, useRef } from 'react';

const stats = [
  { number: 50,  suffix: '+',  label: 'Projects Delivered',  icon: 'fa-rocket' },
  { number: 98,  suffix: '%',  label: 'Client Satisfaction', icon: 'fa-star' },
  { number: 5,   suffix: '+',  label: 'Years of Excellence', icon: 'fa-trophy' },
  { number: 24,  suffix: '/7', label: 'Expert Support',      icon: 'fa-headset' },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ stat, animate }) {
  const count = useCountUp(stat.number, 1800, animate);
  return (
    <div className="stat-card group">
      <div
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 transition-all duration-300 group-hover:scale-110"
        style={{
          background: 'linear-gradient(135deg,rgba(0,212,255,0.1),rgba(0,102,204,0.1))',
          border: '1px solid rgba(0,212,255,0.25)',
        }}
      >
        <i className={`fas ${stat.icon} text-xl sm:text-2xl`} style={{ color: '#00d4ff' }} />
      </div>
      <div className="stat-number">{count}{stat.suffix}</div>
      <div className="text-xs sm:text-sm font-medium text-gray-400 mt-1" style={{ fontFamily: 'Inter,sans-serif' }}>
        {stat.label}
      </div>
    </div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-12 sm:py-16 relative" style={{ background: '#050d1a' }}>
      <div className="section-divider mb-0" />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg,rgba(0,212,255,0.03) 0%,transparent 100%)' }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6" ref={ref}>
        {/* 2 cols on mobile → 4 on md+ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} animate={animate} />
          ))}
        </div>
      </div>
      <div className="section-divider mt-0" />
    </section>
  );
}
