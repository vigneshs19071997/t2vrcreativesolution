'use client';
import { useRef, useEffect, useState } from 'react';

const features = [
  {
    icon: 'fa-bolt',
    title: 'Innovation First',
    description:
      'We stay ahead of technology trends, leveraging the latest tools and frameworks to give your business a real competitive edge.',
  },
  {
    icon: 'fa-users-gear',
    title: 'Expert Team',
    description:
      'Certified developers, designers, and consultants with years of industry expertise — world-class quality on every project.',
  },
  {
    icon: 'fa-clock-rotate-left',
    title: 'On-Time Delivery',
    description:
      'Our agile approach ensures projects land on schedule. We respect your deadlines and never sacrifice quality to meet them.',
  },
  {
    icon: 'fa-shield-halved',
    title: 'Security & Reliability',
    description:
      'Every solution undergoes rigorous testing to ensure it is bulletproof and performs flawlessly under real-world load.',
  },
  {
    icon: 'fa-coins',
    title: 'Cost-Effective',
    description:
      'Premium quality at competitive pricing. We optimise our processes so your investment generates the highest possible returns.',
  },
  {
    icon: 'fa-headset',
    title: '24/7 Support',
    description:
      'Our dedicated support team is always on standby. Critical issue or quick question — we\'re here for you around the clock.',
  },
];

const achievements = [
  { icon: 'fa-award',     value: '98%',   label: 'On-time delivery rate' },
  { icon: 'fa-handshake', value: '100%',  label: 'Client retention rate' },
  { icon: 'fa-code',      value: '500K+', label: 'Lines of code written' },
];

export default function WhyUs() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.07 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="why-us"
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{ background: '#0a1628' }}
      ref={ref}
    >
      <div className="absolute inset-0 cyber-grid-bg opacity-30" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center,rgba(0,212,255,0.03) 0%,transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Heading */}
        <div
          className={`text-center mb-10 sm:mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="section-tag">Why T2VR</div>
          <h2
            className="font-black text-white mb-3 sm:mb-4"
            style={{ fontFamily: 'Poppins,sans-serif', fontSize: 'clamp(1.75rem,5vw,3rem)' }}
          >
            The T2VR <span className="gradient-text">Advantage</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-lg px-2">
            We don't just build software — we build partnerships. Here's why industry
            leaders choose T2VR Creative Solution.
          </p>
        </div>

        {/* Feature Grid: 1 col mobile → 2 col sm → 3 col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-16">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`feature-item rounded-xl transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="feature-icon rounded-xl flex-shrink-0">
                <i className={`fas ${feature.icon} text-lg sm:text-xl`} />
              </div>
              <div>
                <h3
                  className="text-white font-bold mb-1.5 text-sm sm:text-base"
                  style={{ fontFamily: 'Poppins,sans-serif' }}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Achievement Bar */}
        <div
          className={`rounded-2xl p-6 sm:p-8 transition-all duration-700 delay-500 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            background: 'linear-gradient(135deg,rgba(0,212,255,0.08),rgba(0,102,204,0.08))',
            border: '1px solid rgba(0,212,255,0.15)',
          }}
        >
          {/* Stack vertically on mobile, 3-col on md */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {achievements.map((a, i) => (
              <div
                key={a.label}
                className={`text-center ${
                  i < 2 ? 'sm:border-r border-b sm:border-b-0 border-cyan-500/10 pb-6 sm:pb-0' : ''
                }`}
              >
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4"
                  style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.25)' }}
                >
                  <i className={`fas ${a.icon} text-xl sm:text-2xl`} style={{ color: '#00d4ff' }} />
                </div>
                <div
                  className="text-3xl sm:text-4xl font-black mb-1 sm:mb-2 gradient-text"
                  style={{ fontFamily: 'Poppins,sans-serif' }}
                >
                  {a.value}
                </div>
                <div className="text-gray-400 text-xs sm:text-sm">{a.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div
          className={`text-center mt-10 sm:mt-12 px-2 transition-all duration-700 delay-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <blockquote
            className="text-base sm:text-xl text-gray-300 italic max-w-3xl mx-auto leading-relaxed mb-4"
            style={{ fontFamily: 'Inter,sans-serif' }}
          >
            "Choosing T2VR Creative Solution was one of the best decisions we made. They
            delivered beyond our expectations — on time, on budget, and with exceptional quality."
          </blockquote>
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0"
              style={{ background: 'linear-gradient(135deg,#00d4ff,#0066cc)' }}
            >
              RK
            </div>
            <div className="text-left">
              <div className="text-white text-xs sm:text-sm font-semibold">Rajesh Kumar</div>
              <div className="text-gray-500 text-xs">CEO, TechVentures India</div>
            </div>
            <div className="flex gap-1 ml-1">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fas fa-star text-xs" style={{ color: '#00d4ff' }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
