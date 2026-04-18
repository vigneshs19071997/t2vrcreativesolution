'use client';
import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    setTimeout(() => {
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#050d1a]/95 backdrop-blur-md shadow-lg shadow-cyan-500/5 border-b border-cyan-500/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <button
              onClick={() => handleNavClick('#home')}
              className="flex items-center gap-2 sm:gap-3 flex-shrink-0"
            >
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white font-black text-base sm:text-lg"
                style={{
                  background: 'linear-gradient(135deg, #00d4ff, #0066cc)',
                  boxShadow: '0 0 20px rgba(0,212,255,0.4)',
                }}
              >
                T2
              </div>
              <div>
                <div
                  className="font-black text-lg sm:text-xl leading-none tracking-wide"
                  style={{ color: '#00d4ff', fontFamily: 'Poppins, sans-serif' }}
                >
                  T2VR
                </div>
                <div className="text-xs text-gray-400 font-medium tracking-widest uppercase hidden sm:block">
                  Creative Solution
                </div>
              </div>
            </button>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="nav-link text-sm"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <button
                onClick={() => handleNavClick('#contact')}
                className="btn-primary text-sm py-2.5 px-5 lg:py-3 lg:px-6"
              >
                Get Free Quote
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex flex-col justify-center gap-1.5 p-2 -mr-1 z-10"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-5 h-0.5 rounded-full bg-cyan-400 transition-all duration-300 origin-center ${
                  menuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block w-5 h-0.5 rounded-full bg-cyan-400 transition-all duration-300 ${
                  menuOpen ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`block w-5 h-0.5 rounded-full bg-cyan-400 transition-all duration-300 origin-center ${
                  menuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden flex flex-col transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(5,13,26,0.98)', backdropFilter: 'blur(24px)' }}
      >
        <div className="flex-1 flex flex-col items-center justify-center gap-2 px-8">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`w-full text-center py-4 text-xl font-semibold border-b border-cyan-500/10 transition-all duration-300 ${
                menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{
                color: '#d1d5db',
                transitionDelay: menuOpen ? `${i * 60}ms` : '0ms',
                fontFamily: 'Poppins, sans-serif',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#00d4ff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#d1d5db')}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => handleNavClick('#contact')}
            className="btn-primary w-full mt-6 text-base py-4"
            style={{
              transitionDelay: menuOpen ? `${navLinks.length * 60}ms` : '0ms',
            }}
          >
            <i className="fas fa-rocket mr-2" />
            Get Free Quote
          </button>
        </div>

        {/* Bottom brand in mobile menu */}
        <div className="pb-10 text-center">
          <span className="text-gray-600 text-xs tracking-widest">T2VR CREATIVE SOLUTION</span>
        </div>
      </div>
    </>
  );
}
