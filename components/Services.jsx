'use client';
import { useRef, useEffect, useState } from 'react';

const services = [
  {
    icon: 'fa-globe',
    title: 'Web Development',
    description:
      'From stunning corporate websites to powerful web applications, we build digital experiences that captivate users and drive conversions. Responsive, fast, and SEO-optimized.',
    features: ['Custom Web Apps', 'E-Commerce Solutions', 'CMS Development', 'API Integration'],
    color: '#00d4ff',
  },
  {
    icon: 'fa-mobile-screen',
    title: 'Mobile App Development',
    description:
      'Native and cross-platform mobile apps for iOS and Android that deliver exceptional user experiences. Scalable, secure, and performance-optimized for any device.',
    features: ['iOS & Android Apps', 'React Native / Flutter', 'UI/UX Design', 'App Store Launch'],
    color: '#0080ff',
  },
  {
    icon: 'fa-server',
    title: 'IT Consulting & Support',
    description:
      'Strategic technology consulting that aligns your IT infrastructure with business goals. End-to-end support from planning to implementation and beyond.',
    features: ['IT Strategy', 'Cloud Migration', 'Infrastructure Setup', '24/7 Tech Support'],
    color: '#00d4aa',
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{ background: '#0a1628' }}
      ref={sectionRef}
    >
      <div className="absolute inset-0 cyber-grid-bg opacity-40" />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(0,212,255,0.3),transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Heading */}
        <div
          className={`text-center mb-10 sm:mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="section-tag">What We Do</div>
          <h2
            className="font-black text-white mb-3 sm:mb-4"
            style={{ fontFamily: 'Poppins,sans-serif', fontSize: 'clamp(1.75rem,5vw,3rem)' }}
          >
            Our <span className="gradient-text">Core Services</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-lg px-2">
            We deliver end-to-end technology solutions that empower businesses to innovate,
            scale, and succeed in the digital era.
          </p>
        </div>

        {/* Cards — 1 col mobile, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`card-cyber rounded-2xl p-6 sm:p-8 transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="service-icon-wrapper">
                <i className={`fas ${service.icon} text-xl sm:text-2xl`} style={{ color: service.color }} />
              </div>

              <h3
                className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3"
                style={{ fontFamily: 'Poppins,sans-serif' }}
              >
                {service.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed mb-5">{service.description}</p>

              <ul className="space-y-1.5 sm:space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                    <i className="fas fa-check-circle text-xs" style={{ color: service.color }} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:gap-3"
                style={{ color: service.color }}
              >
                Get a Quote <i className="fas fa-arrow-right text-xs" />
              </button>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`text-center mt-10 sm:mt-14 transition-all duration-700 delay-500 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
            Need a custom solution? We build tailored IT solutions for any challenge.
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline text-sm sm:text-base"
          >
            <i className="fas fa-comments mr-2" />
            Discuss Your Project
          </button>
        </div>
      </div>
    </section>
  );
}
