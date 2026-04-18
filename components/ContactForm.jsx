'use client';
import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';

const services = [
  'Web Development',
  'Mobile App Development',
  'IT Consulting & Support',
  'AR/VR Solutions',
  'Other',
];

const contactInfo = [
  {
    icon: 'fa-envelope',
    label: 'Email Us',
    value: 't2vrcreation@gmail.com',
    link: 'mailto:t2vrcreation@gmail.com',
  },
  {
    icon: 'fa-phone',
    label: 'Call Us',
    value: '+91 9092189883',
    link: 'tel:+919092189883',
  },
  {
    icon: 'fa-clock',
    label: 'Business Hours',
    value: 'Mon – Sat: 9AM – 6PM IST',
    link: null,
  },
];

const promises = [
  'Response within 24 hours',
  'Free initial consultation',
  'No hidden charges',
  'NDA available on request',
];

export default function ContactForm() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', subject: '', message: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    const toastId = toast.loading('Sending your enquiry…');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('🚀 Enquiry submitted! Check your email for confirmation.', {
          id: toastId,
          duration: 5000,
        });
        setFormData({ name: '', email: '', phone: '', service: '', subject: '', message: '' });
      } else {
        toast.error(data.error || 'Something went wrong. Please try again.', { id: toastId });
      }
    } catch {
      toast.error('Network error. Please check your connection.', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{ background: '#0a1628' }}
      ref={ref}
    >
      <div className="absolute inset-0 cyber-grid-bg opacity-40" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at bottom,rgba(0,212,255,0.05) 0%,transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Heading */}
        <div
          className={`text-center mb-10 sm:mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="section-tag">Get In Touch</div>
          <h2
            className="font-black text-white mb-3 sm:mb-4"
            style={{ fontFamily: 'Poppins,sans-serif', fontSize: 'clamp(1.75rem,5vw,3rem)' }}
          >
            Let's Build Something{' '}
            <span className="gradient-text">Amazing Together</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-lg px-2">
            Share your requirements and our team will reach out within 24 hours with a
            tailored solution.
          </p>
        </div>

        {/* Layout: stack on mobile, side-by-side on lg */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-10">

          {/* ── Info Panel ── */}
          <div
            className={`lg:col-span-2 flex flex-col gap-4 sm:gap-6 transition-all duration-700 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            {contactInfo.map((info) => (
              <div key={info.label} className="card-cyber rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.25)' }}
                  >
                    <i className={`fas ${info.icon} text-base sm:text-lg`} style={{ color: '#00d4ff' }} />
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs uppercase tracking-widest mb-1">{info.label}</div>
                    {info.link ? (
                      <a href={info.link} className="text-white font-semibold hover:text-cyan-400 transition-colors text-sm sm:text-base break-all">
                        {info.value}
                      </a>
                    ) : (
                      <div className="text-white font-semibold text-sm sm:text-base">{info.value}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Promise Box */}
            <div
              className="rounded-xl sm:rounded-2xl p-4 sm:p-6"
              style={{
                background: 'linear-gradient(135deg,rgba(0,212,255,0.08),rgba(0,102,204,0.08))',
                border: '1px solid rgba(0,212,255,0.2)',
              }}
            >
              <h4
                className="text-white font-bold mb-3 text-sm sm:text-base"
                style={{ fontFamily: 'Poppins,sans-serif' }}
              >
                🤝 Our Promise to You
              </h4>
              <ul className="space-y-2">
                {promises.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                    <i className="fas fa-check-circle text-xs flex-shrink-0" style={{ color: '#00d4ff' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Form ── */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <form onSubmit={handleSubmit} className="card-cyber rounded-xl sm:rounded-2xl p-5 sm:p-8">

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
                <div>
                  <label className="block text-xs text-gray-400 mb-2 uppercase tracking-widest">
                    Full Name <span style={{ color: '#00d4ff' }}>*</span>
                  </label>
                  <input
                    type="text" name="name" value={formData.name} onChange={handleChange}
                    placeholder="John Doe" className="form-input" required
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-2 uppercase tracking-widest">
                    Email Address <span style={{ color: '#00d4ff' }}>*</span>
                  </label>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleChange}
                    placeholder="john@company.com" className="form-input" required
                  />
                </div>
              </div>

              {/* Phone + Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
                <div>
                  <label className="block text-xs text-gray-400 mb-2 uppercase tracking-widest">
                    Phone Number
                  </label>
                  <input
                    type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    placeholder="+91 98765 43210" className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-2 uppercase tracking-widest">
                    Service Required
                  </label>
                  <select name="service" value={formData.service} onChange={handleChange} className="form-input">
                    <option value="">Select a service…</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* Subject */}
              <div className="mb-4 sm:mb-5">
                <label className="block text-xs text-gray-400 mb-2 uppercase tracking-widest">
                  Subject <span style={{ color: '#00d4ff' }}>*</span>
                </label>
                <input
                  type="text" name="subject" value={formData.subject} onChange={handleChange}
                  placeholder="e.g. Need a custom e-commerce website" className="form-input" required
                />
              </div>

              {/* Message */}
              <div className="mb-5 sm:mb-7">
                <label className="block text-xs text-gray-400 mb-2 uppercase tracking-widest">
                  Your Message <span style={{ color: '#00d4ff' }}>*</span>
                </label>
                <textarea
                  name="message" value={formData.message} onChange={handleChange}
                  rows={5} placeholder="Tell us about your project, goals, timeline, and budget…"
                  className="form-input resize-none" required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full text-sm sm:text-base py-3.5 sm:py-4 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><i className="fas fa-spinner animate-spin" /> Sending Enquiry…</>
                ) : (
                  <><i className="fas fa-paper-plane" /> Send Enquiry</>
                )}
              </button>

              <p className="text-center text-gray-500 text-xs mt-4 leading-relaxed">
                By submitting, you agree to be contacted by our team.
                We respect your privacy and never share your data.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
