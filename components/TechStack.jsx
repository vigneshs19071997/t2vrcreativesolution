'use client';

const technologies = [
  { name: 'React',      icon: 'fa-react',        color: '#61dafb', category: 'Frontend',        fab: true },
  { name: 'Next.js',   icon: 'fa-n',             color: '#ffffff', category: 'Framework',       fab: false },
  { name: 'Node.js',   icon: 'fa-node-js',       color: '#68a063', category: 'Backend',         fab: true },
  { name: 'MongoDB',   icon: 'fa-database',      color: '#4db33d', category: 'Database',        fab: false },
  { name: 'Python',    icon: 'fa-python',        color: '#3776ab', category: 'Backend',         fab: true },
  { name: 'AWS',       icon: 'fa-aws',           color: '#ff9900', category: 'Cloud',           fab: true },
  { name: 'Docker',    icon: 'fa-docker',        color: '#0db7ed', category: 'DevOps',          fab: true },
  { name: 'GitHub',    icon: 'fa-github',        color: '#ffffff', category: 'Version Control', fab: true },
  { name: 'Flutter',   icon: 'fa-mobile-screen', color: '#54c5f8', category: 'Mobile',          fab: false },
  { name: 'TypeScript',icon: 'fa-code',          color: '#3178c6', category: 'Language',        fab: false },
  { name: 'MySQL',     icon: 'fa-server',        color: '#00758f', category: 'Database',        fab: false },
  { name: 'Linux',     icon: 'fa-linux',         color: '#fcc624', category: 'OS',              fab: true },
];

function TechCard({ tech }) {
  const iconClass = tech.fab ? `fab ${tech.icon}` : `fas ${tech.icon}`;
  return (
    <div
      className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl flex-shrink-0 cursor-default"
      style={{
        background: 'rgba(13,31,53,0.8)',
        border: '1px solid rgba(0,212,255,0.1)',
        minWidth: '110px',
      }}
    >
      <div
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${tech.color}15`, border: `1px solid ${tech.color}30` }}
      >
        <i className={`${iconClass} text-xs sm:text-sm`} style={{ color: tech.color }} />
      </div>
      <div>
        <div className="text-white text-xs font-semibold leading-tight">{tech.name}</div>
        <div className="text-gray-500 text-xs">{tech.category}</div>
      </div>
    </div>
  );
}

export default function TechStack() {
  const doubled      = [...technologies, ...technologies];
  const doubledRev   = [...technologies.slice().reverse(), ...technologies.slice().reverse()];

  return (
    <section
      className="py-16 sm:py-20 relative overflow-hidden"
      style={{ background: '#050d1a' }}
    >
      <div className="section-divider mb-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 py-4">
        <div className="text-center mb-8 sm:mb-12">
          <div className="section-tag">Our Stack</div>
          <h2
            className="font-black text-white"
            style={{ fontFamily: 'Poppins,sans-serif', fontSize: 'clamp(1.5rem,4vw,2.5rem)' }}
          >
            Technologies We <span className="gradient-text">Master</span>
          </h2>
          <p className="text-gray-400 mt-2 sm:mt-3 max-w-xl mx-auto text-sm sm:text-base px-2">
            We use the latest, battle-tested technologies to build robust, scalable,
            and future-proof solutions.
          </p>
        </div>

        {/* Row 1 — scrolls left */}
        <div className="relative overflow-hidden mb-4 sm:mb-6">
          {/* Fade edges */}
          <div
            className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right,#050d1a,transparent)' }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left,#050d1a,transparent)' }}
          />
          <div
            className="flex gap-3 sm:gap-4 w-max"
            style={{ animation: 'scrollLeft 28s linear infinite' }}
          >
            {doubled.map((tech, i) => <TechCard key={i} tech={tech} />)}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="relative overflow-hidden">
          <div
            className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right,#050d1a,transparent)' }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left,#050d1a,transparent)' }}
          />
          <div
            className="flex gap-3 sm:gap-4 w-max"
            style={{ animation: 'scrollRight 34s linear infinite' }}
          >
            {doubledRev.map((tech, i) => <TechCard key={i} tech={tech} />)}
          </div>
        </div>
      </div>

      <div className="section-divider mt-4" />

      <style jsx>{`
        @keyframes scrollLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
