'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/* ─── SVG Decorative Objects ─────────────────────────────────────────── */

const RibbonSculpture = () => (
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
    <path d="M18 24 C28 14, 44 32, 36 36 C28 40, 44 58, 54 48" stroke="url(#r1)" strokeWidth="3" strokeLinecap="round" fill="none"/>
    <path d="M18 48 C28 58, 44 40, 36 36 C28 32, 44 14, 54 24" stroke="url(#r2)" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>
    <ellipse cx="36" cy="36" rx="6" ry="6" fill="url(#r3)" opacity="0.6"/>
    <defs>
      <linearGradient id="r1" x1="18" y1="24" x2="54" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37"/><stop offset="1" stopColor="#B76E79"/>
      </linearGradient>
      <linearGradient id="r2" x1="18" y1="48" x2="54" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#B76E79" stopOpacity="0.7"/><stop offset="1" stopColor="#D4AF37" stopOpacity="0.4"/>
      </linearGradient>
      <radialGradient id="r3" cx="50%" cy="50%"><stop stopColor="#fff" stopOpacity="0.9"/><stop offset="1" stopColor="#D4AF37" stopOpacity="0.3"/></radialGradient>
    </defs>
  </svg>
);

const CrystalShield = () => (
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
    <path d="M36 10 L56 20 L56 40 C56 52 46 60 36 64 C26 60 16 52 16 40 L16 20 Z" fill="url(#s1)" stroke="url(#s2)" strokeWidth="1"/>
    <path d="M36 16 L50 24 L50 40 C50 49 43 55 36 58 C29 55 22 49 22 40 L22 24 Z" fill="url(#s3)" opacity="0.5"/>
    <path d="M28 36 L34 42 L46 30" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="s1" x1="16" y1="10" x2="56" y2="64" gradientUnits="userSpaceOnUse">
        <stop stopColor="rgba(183,110,121,0.35)"/><stop offset="1" stopColor="rgba(212,175,55,0.2)"/>
      </linearGradient>
      <linearGradient id="s2" x1="16" y1="10" x2="56" y2="64" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37"/><stop offset="1" stopColor="#B76E79"/>
      </linearGradient>
      <radialGradient id="s3" cx="40%" cy="30%"><stop stopColor="rgba(255,255,255,0.5)"/><stop offset="1" stopColor="transparent"/></radialGradient>
    </defs>
  </svg>
);

const GlassPrism = () => (
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
    <polygon points="36,8 62,56 10,56" fill="url(#p1)" stroke="url(#p2)" strokeWidth="1"/>
    <polygon points="36,8 49,32 23,32" fill="rgba(255,255,255,0.3)"/>
    <line x1="36" y1="8" x2="36" y2="56" stroke="rgba(212,175,55,0.3)" strokeWidth="0.8"/>
    <line x1="10" y1="56" x2="49" y2="32" stroke="rgba(183,110,121,0.25)" strokeWidth="0.6"/>
    <line x1="62" y1="56" x2="23" y2="32" stroke="rgba(212,175,55,0.25)" strokeWidth="0.6"/>
    <defs>
      <linearGradient id="p1" x1="10" y1="56" x2="62" y2="8" gradientUnits="userSpaceOnUse">
        <stop stopColor="rgba(212,175,55,0.28)"/><stop offset="1" stopColor="rgba(183,110,121,0.18)"/>
      </linearGradient>
      <linearGradient id="p2" x1="10" y1="56" x2="62" y2="8" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0.7"/><stop offset="1" stopColor="#B76E79" stopOpacity="0.5"/>
      </linearGradient>
    </defs>
  </svg>
);

const CompassSculpture = () => (
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
    <circle cx="36" cy="36" r="24" stroke="url(#c1)" strokeWidth="1" fill="rgba(255,255,255,0.06)"/>
    <circle cx="36" cy="36" r="18" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5" fill="none"/>
    <polygon points="36,14 39,34 36,32 33,34" fill="url(#c2)"/>
    <polygon points="36,58 33,38 36,40 39,38" fill="rgba(183,110,121,0.4)"/>
    <circle cx="36" cy="36" r="3" fill="url(#c3)"/>
    <line x1="12" y1="36" x2="60" y2="36" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5"/>
    <defs>
      <linearGradient id="c1" x1="12" y1="36" x2="60" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0.6"/><stop offset="1" stopColor="#B76E79" stopOpacity="0.4"/>
      </linearGradient>
      <linearGradient id="c2" x1="33" y1="14" x2="39" y2="34" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37"/><stop offset="1" stopColor="#C8A96E"/>
      </linearGradient>
      <radialGradient id="c3"><stop stopColor="#fff"/><stop offset="1" stopColor="#D4AF37"/></radialGradient>
    </defs>
  </svg>
);

const ChampagneOrb = () => (
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
    <circle cx="36" cy="36" r="26" fill="url(#o1)" stroke="url(#o2)" strokeWidth="0.8"/>
    <ellipse cx="28" cy="26" rx="8" ry="5" fill="rgba(255,255,255,0.35)" transform="rotate(-30 28 26)"/>
    <ellipse cx="32" cy="30" rx="3" ry="2" fill="rgba(255,255,255,0.6)" transform="rotate(-30 32 30)"/>
    <circle cx="36" cy="36" r="10" fill="url(#o3)" opacity="0.15"/>
    <defs>
      <radialGradient id="o1" cx="38%" cy="35%">
        <stop stopColor="rgba(212,175,55,0.45)"/><stop offset="60%" stopColor="rgba(212,175,55,0.12)"/><stop offset="1" stopColor="rgba(184,147,58,0.08)"/>
      </radialGradient>
      <linearGradient id="o2" x1="10" y1="10" x2="62" y2="62" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0.6"/><stop offset="1" stopColor="#B76E79" stopOpacity="0.3"/>
      </linearGradient>
      <radialGradient id="o3"><stop stopColor="#D4AF37"/><stop offset="1" stopColor="transparent"/></radialGradient>
    </defs>
  </svg>
);

const FacetedGem = () => (
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
    <polygon points="36,8 52,20 58,40 46,58 26,58 14,40 20,20" fill="url(#g1)" stroke="url(#g2)" strokeWidth="0.8"/>
    <polygon points="36,8 52,20 36,30 20,20" fill="rgba(255,255,255,0.25)"/>
    <polygon points="52,20 58,40 36,30" fill="rgba(0,0,0,0.06)"/>
    <polygon points="14,40 20,20 36,30" fill="rgba(255,255,255,0.12)"/>
    <line x1="36" y1="8" x2="36" y2="58" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5"/>
    <line x1="14" y1="40" x2="58" y2="40" stroke="rgba(183,110,121,0.2)" strokeWidth="0.5"/>
    <line x1="20" y1="20" x2="46" y2="58" stroke="rgba(212,175,55,0.15)" strokeWidth="0.5"/>
    <line x1="52" y1="20" x2="26" y2="58" stroke="rgba(212,175,55,0.15)" strokeWidth="0.5"/>
    <defs>
      <linearGradient id="g1" x1="14" y1="8" x2="58" y2="58" gradientUnits="userSpaceOnUse">
        <stop stopColor="rgba(183,110,121,0.32)"/><stop offset="0.5" stopColor="rgba(212,175,55,0.22)"/><stop offset="1" stopColor="rgba(183,110,121,0.15)"/>
      </linearGradient>
      <linearGradient id="g2" x1="14" y1="8" x2="58" y2="58" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0.7"/><stop offset="1" stopColor="#B76E79" stopOpacity="0.5"/>
      </linearGradient>
    </defs>
  </svg>
);

/* ─── Card Data ──────────────────────────────────────────────────────────── */

interface CardDef {
  id: string;
  Icon: React.ComponentType;
  title: string;
  description: string;
  floatDuration: number;
  floatY: number[];
  floatRotate: number[];
  glassGrad: string;
  glowColor: string;
  borderFrom: string;
  borderTo: string;
}

const CARDS: CardDef[] = [
  {
    id: 'collections',
    Icon: RibbonSculpture,
    title: 'Handpicked Collections',
    description: 'Every featured product is carefully selected for quality, craftsmanship, and timeless style.',
    floatDuration: 7.8,
    floatY: [0, -10, 2, -6, 0],
    floatRotate: [0, 3, -2, 1, 0],
    glassGrad: 'linear-gradient(135deg, rgba(255,255,255,0.38) 0%, rgba(255,248,230,0.22) 100%)',
    glowColor: 'rgba(212,175,55,0.18)',
    borderFrom: '#D4AF37',
    borderTo: '#B76E79',
  },
  {
    id: 'partners',
    Icon: CrystalShield,
    title: 'Trusted Partners',
    description: 'Shop confidently through carefully selected affiliate retailers and premium marketplaces.',
    floatDuration: 8.6,
    floatY: [0, -7, 3, -9, 0],
    floatRotate: [0, -2, 4, -1, 0],
    glassGrad: 'linear-gradient(135deg, rgba(255,255,255,0.32) 0%, rgba(253,231,231,0.22) 100%)',
    glowColor: 'rgba(183,110,121,0.18)',
    borderFrom: '#B76E79',
    borderTo: '#D4AF37',
  },
  {
    id: 'curated',
    Icon: GlassPrism,
    title: 'Curated Selections',
    description: 'Thoughtfully organised collections that make discovering premium products effortless.',
    floatDuration: 9.4,
    floatY: [0, -12, 4, -8, 0],
    floatRotate: [0, 5, -3, 2, 0],
    glassGrad: 'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,252,240,0.25) 100%)',
    glowColor: 'rgba(212,175,55,0.15)',
    borderFrom: '#C8A96E',
    borderTo: '#B76E79',
  },
  {
    id: 'discovery',
    Icon: CompassSculpture,
    title: 'Fast Discovery',
    description: 'Find premium fashion, beauty, and lifestyle essentials in just a few clicks.',
    floatDuration: 10.8,
    floatY: [0, -8, 5, -11, 0],
    floatRotate: [0, -4, 2, -3, 0],
    glassGrad: 'linear-gradient(135deg, rgba(255,255,255,0.30) 0%, rgba(232,213,203,0.20) 100%)',
    glowColor: 'rgba(183,110,121,0.14)',
    borderFrom: '#B76E79',
    borderTo: '#C8A96E',
  },
  {
    id: 'responsive',
    Icon: ChampagneOrb,
    title: 'Responsive Experience',
    description: 'Enjoy a seamless browsing experience across desktop, tablet, and mobile devices.',
    floatDuration: 11.5,
    floatY: [0, -9, 2, -7, 0],
    floatRotate: [0, 2, -5, 3, 0],
    glassGrad: 'linear-gradient(135deg, rgba(255,255,255,0.40) 0%, rgba(255,250,235,0.28) 100%)',
    glowColor: 'rgba(212,175,55,0.20)',
    borderFrom: '#D4AF37',
    borderTo: '#C8A96E',
  },
  {
    id: 'quality',
    Icon: FacetedGem,
    title: 'Premium Quality',
    description: 'Products chosen for exceptional aesthetics, craftsmanship, and lasting value.',
    floatDuration: 12.2,
    floatY: [0, -11, 3, -6, 0],
    floatRotate: [0, -3, 5, -2, 0],
    glassGrad: 'linear-gradient(135deg, rgba(255,255,255,0.34) 0%, rgba(253,231,231,0.18) 100%)',
    glowColor: 'rgba(183,110,121,0.20)',
    borderFrom: '#B76E79',
    borderTo: '#D4AF37',
  },
];

/* ─── Feature Card ───────────────────────────────────────────────────────── */

function FeatureCard({ card }: { card: CardDef }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null!);
  const prefersReduced = useReducedMotion();

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    setTilt({ x: dy * -2, y: dx * 2 });
  }, []);

  const onLeave = useCallback(() => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={onMouseMove}
      onMouseLeave={onLeave}
      animate={{
        y: hovered ? -10 : 0,
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      style={{
        width: 'clamp(280px, 26vw, 420px)',
        flexShrink: 0,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      className="relative rounded-[26px] p-7 cursor-default select-none"
    >
      {/* Glass base */}
      <div
        className="absolute inset-0 rounded-[26px] transition-all duration-500"
        style={{
          background: card.glassGrad,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${hovered ? 'rgba(212,175,55,0.5)' : 'rgba(232,213,203,0.55)'}`,
          boxShadow: hovered
            ? `0 28px 64px ${card.glowColor}, 0 8px 20px rgba(183,110,121,0.10)`
            : `0 8px 32px ${card.glowColor}, 0 2px 8px rgba(183,110,121,0.06)`,
        }}
      />

      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-[26px] pointer-events-none"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: `linear-gradient(135deg, ${card.borderFrom}22, ${card.borderTo}11)`,
          border: `1px solid ${card.borderFrom}44`,
        }}
      />

      {/* Diagonal sheen */}
      <motion.div
        className="absolute inset-0 rounded-[26px] pointer-events-none overflow-hidden"
        style={{ opacity: hovered ? 0.06 : 0.03 }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ x: ['-60%', '160%'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear', delay: card.floatDuration * 0.3 }}
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.9) 50%, transparent 60%)',
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-5">
        {/* Decorative object */}
        <motion.div
          animate={prefersReduced || hovered
            ? { y: 0, rotate: 0 }
            : { y: card.floatY, rotate: card.floatRotate }}
          transition={prefersReduced || hovered
            ? { duration: 0 }
            : { duration: card.floatDuration, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.08 }}
          style={{ display: 'inline-flex', willChange: 'transform' }}
        >
          <card.Icon />
        </motion.div>

        {/* Accent line */}
        <div
          className="h-px w-10"
          style={{
            background: `linear-gradient(90deg, ${card.borderFrom}, transparent)`,
          }}
        />

        {/* Text */}
        <div>
          <h3
            className="font-playfair font-semibold text-charcoal mb-3 leading-snug"
            style={{ fontSize: 'clamp(1.05rem, 1.3vw, 1.2rem)', transition: 'color 0.3s', color: hovered ? '#1a1a1a' : '#2D2D2D' }}
          >
            {card.title}
          </h3>
          <motion.p
            animate={{ y: hovered ? -3 : 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-inter text-sm text-gray-500 leading-relaxed"
          >
            {card.description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Marquee Row ────────────────────────────────────────────────────────── */

function MarqueeRow({ cards, direction }: { cards: CardDef[]; direction: 'left' | 'right' }) {
  const prefersReduced = useReducedMotion();
  // Triple for seamless loop
  const items = [...cards, ...cards, ...cards];
  const animName = direction === 'left' ? 'marqueeLeft' : 'marqueeRight';

  return (
    <>
      <style>{`
        @keyframes marqueeLeft {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
        @keyframes marqueeRight {
          0%   { transform: translate3d(-33.333%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .marquee-track {
          will-change: transform;
          backface-visibility: hidden;
        }
      `}</style>
      <div
        className="overflow-hidden w-full"
        style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)' }}
      >
        <div
          className="flex gap-5 marquee-track"
          style={{
            animation: prefersReduced
              ? 'none'
              : `${animName} ${direction === 'left' ? '52s' : '62s'} linear infinite`,
          }}
        >
          {items.map((card, i) => (
            <FeatureCard key={`${card.id}-${i}`} card={card} />
          ))}
        </div>
      </div>
    </>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */

export default function TestimonialsSection() {
  const top = CARDS;
  const bottom = [...CARDS].reverse();

  return (
    <section id="why-us" className="py-24 relative overflow-hidden">
      {/* Ambient drifting gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 60, -40, 0], y: [0, -40, 20, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)', filter: 'blur(50px)' }}
        />
        <motion.div
          animate={{ x: [0, -50, 30, 0], y: [0, 50, -30, 0] }}
          transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(183,110,121,0.12) 0%, transparent 70%)', filter: 'blur(50px)' }}
        />
        <motion.div
          animate={{ x: [0, 30, -20, 0], y: [0, -20, 40, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut', delay: 12 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(232,213,203,0.18) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 px-4"
        >
          <span className="block font-inter text-xs font-semibold tracking-widest uppercase text-rose-gold mb-3">
            Our Promise
          </span>
          <h2 className="section-title text-4xl md:text-5xl text-charcoal mb-5">
            Why Choose{' '}
            <span className="text-gradient-gold">Bags &amp; Style</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, #E8D5CB)' }} />
            <div className="w-2 h-2 rounded-full" style={{ background: '#D4AF37' }} />
            <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, #E8D5CB)' }} />
          </div>
          <p className="font-inter text-sm sm:text-base text-gray-500 leading-relaxed max-w-lg mx-auto">
            Every recommendation is thoughtfully curated to help you discover premium fashion,
            beauty, and lifestyle products from trusted affiliate partners.
          </p>
        </motion.div>

        {/* Dual marquee */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6"
        >
          <MarqueeRow cards={top} direction="left" />
          <MarqueeRow cards={bottom} direction="right" />
        </motion.div>

        {/* Footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center font-inter text-xs text-gray-400 tracking-[0.2em] mt-10 uppercase"
        >
          Six reasons to shop with confidence
        </motion.p>
      </div>
    </section>
  );
}


