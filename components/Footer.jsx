'use client';

const quickLinks = [
  { label: 'Home',           href: '#home' },
  { label: 'Services',       href: '#services' },
  { label: 'About Us',       href: '#about' },
  { label: 'Why Choose Us',  href: '#why-us' },
  { label: 'Contact Us',     href: '#contact' },
];

const serviceLinks = [
  { label: 'Web Development',          href: '#services' },
  { label: 'Mobile App Development',   href: '#services' },
  { label: 'IT Consulting & Support',  href: '#services' },
  { label: 'Get a Free Quote',         href: '#contact' },
];

const socialLinks = [
  { icon: 'fa-linkedin-in', href: '#', label: 'LinkedIn' },
  { icon: 'fa-twitter',     href: '#', label: 'Twitter' },
  { icon: 'fa-instagram',   href: '#', label: 'Instagram' },
  { icon: 'fa-facebook-f',  href: '#', label: 'Facebook' },
  { icon: 'fa-youtube',     href: '#', label: 'YouTube' },
];

const contactItems = [
  { icon: 'fa-envelope',    text: 't2vrcreation@gmail.com', link: 'mailto:t2vrcreation@gmail.com' },
  { icon: 'fa-phone',       text: '+91 9092189883',        link: 'tel:+919092189883' },
  { icon: 'fa-location-dot',text: 'India',                  link: null },
  { icon: 'fa-clock',       text: 'Mon – Sat: 9AM – 6PM IST', link: null },
];

const scrollTo = (href) => {
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: '#050d1a' }}>
      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(0,212,255,0.4),transparent)' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at top center,rgba(0,212,255,0.04) 0%,transparent 60%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-6 sm:pb-8 relative z-10">

        {/* Main grid: 1 col mobile → 2 col sm → 4 col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white font-black text-lg flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg,#00d4ff,#0066cc)',
                  boxShadow: '0 0 20px rgba(0,212,255,0.3)',
                }}
              >
                T2
              </div>
              <div>
                <div className="font-black text-xl" style={{ color: '#00d4ff', fontFamily: 'Poppins,sans-serif' }}>
                  T2VR
                </div>
                <div className="text-xs text-gray-500 tracking-widest">Creative Solution</div>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Next-generation IT solutions that transform your digital vision into reality.
              Innovation. Quality. Results.
            </p>

            {/* Social Icons */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    background: 'rgba(0,212,255,0.08)',
                    border: '1px solid rgba(0,212,255,0.15)',
                    color: '#8892a4',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0,212,255,0.2)';
                    e.currentTarget.style.color = '#00d4ff';
                    e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0,212,255,0.08)';
                    e.currentTarget.style.color = '#8892a4';
                    e.currentTarget.style.borderColor = 'rgba(0,212,255,0.15)';
                  }}
                >
                  <i className={`fab ${s.icon} text-xs sm:text-sm`} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-bold mb-4 text-xs uppercase tracking-widest"
              style={{ color: '#00d4ff', fontFamily: 'Poppins,sans-serif' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="footer-link flex items-center gap-2 group text-sm"
                  >
                    <i
                      className="fas fa-chevron-right text-xs transition-transform group-hover:translate-x-1"
                      style={{ color: '#00d4ff' }}
                    />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              className="font-bold mb-4 text-xs uppercase tracking-widest"
              style={{ color: '#00d4ff', fontFamily: 'Poppins,sans-serif' }}
            >
              Our Services
            </h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="footer-link flex items-center gap-2 group text-sm"
                  >
                    <i
                      className="fas fa-chevron-right text-xs transition-transform group-hover:translate-x-1"
                      style={{ color: '#00d4ff' }}
                    />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-bold mb-4 text-xs uppercase tracking-widest"
              style={{ color: '#00d4ff', fontFamily: 'Poppins,sans-serif' }}
            >
              Contact
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              {contactItems.map((item) => (
                <li key={item.text}>
                  {item.link ? (
                    <a href={item.link} className="footer-link flex items-start gap-2.5 group text-sm break-all">
                      <i className={`fas ${item.icon} text-xs sm:text-sm mt-0.5 flex-shrink-0`} style={{ color: '#00d4ff' }} />
                      <span className="group-hover:text-cyan-400 transition-colors">{item.text}</span>
                    </a>
                  ) : (
                    <div className="flex items-start gap-2.5 text-gray-400 text-sm">
                      <i className={`fas ${item.icon} text-xs sm:text-sm mt-0.5 flex-shrink-0`} style={{ color: '#00d4ff' }} />
                      <span>{item.text}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4"
          style={{ borderTop: '1px solid rgba(0,212,255,0.08)' }}
        >
          <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
            © {new Date().getFullYear()}{' '}
            <span className="text-cyan-400 font-semibold">T2VR Creative Solution</span>.
            All rights reserved. | Built with ❤️ in India
          </p>
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-2 h-2 rounded-full animate-pulse"
              style={{ background: '#00d4ff' }}
            />
            <span className="text-gray-500 text-xs">Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
