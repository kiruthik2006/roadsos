import { useState, useCallback } from 'react';
import {
  WifiOff,
  MapPin,
  Copy,
  Check,
  ChevronRight,
  ArrowRight,
  Phone,
  Shield,
  Navigation,
} from 'lucide-react';

/* ━━━ palette tokens (used as inline values for cleanliness) ━━━━━━ */
const C = {
  bg:        '#1c1917',
  card:      '#262220',
  cardHover: '#302b28',
  text:      '#e7e0d8',
  textSec:   '#a8a090',
  textMuted: '#78716c',
  border:    '#352f2a',
  red:       '#dc5044',
  redLight:  '#dc50440f',
  redRing:   '#dc504425',
  blue:      '#5b9bd5',
  blueLight: '#5b9bd50d',
  blueBorder:'#5b9bd520',
  green:     '#5dac84',
  greenLight:'#5dac840d',
  greenBorder:'#5dac8420',
};

/* ━━━━━━━━━━━━━━━━━━━━ Status Header ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function StatusHeader() {
  return (
    <div
      className="flex items-center justify-between"
      style={{ animation: 'fade-up 0.5s ease-out both' }}
    >
      <div>
        <h1 className="text-[20px] font-bold" style={{ color: C.text }}>
          Road<span style={{ color: C.red }}>SoS</span>
        </h1>
      </div>
      <div
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1"
        style={{ background: C.redLight, border: `1px solid ${C.red}20` }}
      >
        <WifiOff className="h-3 w-3" style={{ color: C.red }} strokeWidth={2.5} />
        <span
          className="text-[10px] font-semibold tracking-[0.12em] uppercase"
          style={{ color: C.red }}
        >
          Offline
        </span>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━ Location Card ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function LocationCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard?.writeText('NH-544, Near Avinashi. 11.1819°N, 77.2621°E').catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div
      className="w-full rounded-2xl p-4"
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.15)',
        animation: 'fade-up 0.5s ease-out 0.1s both',
      }}
    >
      {/* Top row: icon + location */}
      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-xl"
          style={{ background: C.redLight }}
        >
          <MapPin className="h-5 w-5" style={{ color: C.red }} strokeWidth={1.8} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-semibold leading-snug" style={{ color: C.text }}>
            NH-544, Near Avinashi.
          </p>
          <p className="text-[12px] mt-0.5 font-medium" style={{ color: C.textSec }}>
            11.1819°N, 77.2621°E
          </p>
        </div>
      </div>

      {/* Bottom row: copy button spanning full width */}
      <button
        onClick={handleCopy}
        className="mt-3 w-full flex items-center justify-center gap-2 rounded-xl py-2.5 cursor-pointer transition-all duration-150 active:scale-[0.98]"
        style={{
          background: copied ? C.greenLight : C.cardHover,
          border: `1px solid ${copied ? C.greenBorder : C.border}`,
        }}
        aria-label="Copy location"
      >
        {copied ? (
          <span style={{ animation: 'pop-in 0.3s ease-out' }} className="flex items-center gap-2">
            <Check className="h-4 w-4" style={{ color: C.green }} strokeWidth={2.5} />
            <span className="text-[12px] font-semibold" style={{ color: C.green }}>
              Copied to clipboard
            </span>
          </span>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" style={{ color: C.textSec }} strokeWidth={2} />
            <span className="text-[12px] font-semibold" style={{ color: C.textSec }}>
              Copy Location
            </span>
          </>
        )}
      </button>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━ SOS Button ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function SosButton() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 py-2">
      <div className="relative flex items-center justify-center">
        {/* Breathing ring */}
        <div
          className="absolute h-60 w-60 rounded-full"
          style={{
            border: `2px solid ${C.redRing}`,
            animation: 'sos-breathe 4s ease-in-out infinite',
          }}
        />

        {/* Main button */}
        <button
          className="relative h-48 w-48 rounded-full cursor-pointer
            flex flex-col items-center justify-center gap-1
            transition-transform duration-200 active:scale-95
            select-none border-none outline-none"
          style={{
            background: `linear-gradient(145deg, #ef4444, ${C.red})`,
            boxShadow: `0 8px 32px ${C.red}40, 0 2px 8px rgba(0,0,0,0.3)`,
          }}
          aria-label="Swipe for SOS"
        >
          <span
            className="text-white/80 text-[11px] font-semibold tracking-[0.2em] uppercase"
          >
            Swipe For
          </span>
          <span
            className="text-white text-[56px] font-extrabold leading-none"
            style={{ letterSpacing: '-0.02em' }}
          >
            SOS
          </span>

          {/* Animated chevron hint */}
          <div
            className="flex items-center -space-x-1.5 mt-1"
            style={{ animation: 'nudge-right 2s ease-in-out infinite' }}
          >
            <ChevronRight className="h-5 w-5 text-white/60" strokeWidth={2.5} />
            <ChevronRight className="h-5 w-5 text-white/35" strokeWidth={2.5} />
            <ChevronRight className="h-5 w-5 text-white/15" strokeWidth={2.5} />
          </div>
        </button>
      </div>

      <p className="text-[11px] font-medium tracking-wide" style={{ color: C.textMuted }}>
        Hold &amp; swipe to send emergency alert
      </p>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━ Divider ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function HelpDivider() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px" style={{ background: C.border }} />
      <span
        className="text-[10px] font-semibold tracking-[0.15em] uppercase whitespace-nowrap"
        style={{ color: C.textMuted }}
      >
        Bystander? Help nearby
      </span>
      <div className="flex-1 h-px" style={{ background: C.border }} />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━ Action Cards ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function ActionCard({ icon, label, subtitle, bgLight, borderColor, accentColor, delay }) {
  return (
    <button
      className="flex flex-col items-center gap-2.5 rounded-2xl p-4 cursor-pointer
        transition-all duration-200 active:scale-[0.97] border-none outline-none text-center"
      style={{
        background: bgLight,
        border: `1px solid ${borderColor}`,
        boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
        animation: `slide-up 0.4s ease-out ${delay} both`,
      }}
    >
      {/* Icon */}
      <div
        className="flex items-center justify-center h-11 w-11 rounded-full"
        style={{ background: C.cardHover, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
      >
        {icon}
      </div>

      {/* Text */}
      <div>
        <p className="text-[13px] font-bold" style={{ color: C.text }}>{label}</p>
        <p className="text-[10px] font-medium mt-0.5" style={{ color: C.textSec }}>{subtitle}</p>
      </div>

      {/* Arrow */}
      <div
        className="flex items-center justify-center h-7 w-7 rounded-full"
        style={{ background: accentColor, boxShadow: `0 2px 8px ${accentColor}40` }}
      >
        <ArrowRight className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
      </div>
    </button>
  );
}

/* ─── Custom SVG Icons ─────────────────────────────────────────────── */

function AmbulanceIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="8" width="15" height="9" rx="1.5" stroke={C.blue} strokeWidth="1.5" />
      <path d="M16 11h4l3 4v2h-7V11z" stroke={C.blue} strokeWidth="1.5" />
      <circle cx="5.5" cy="18.5" r="1.5" fill={C.blue} />
      <circle cx="18.5" cy="18.5" r="1.5" fill={C.blue} />
      <line x1="8.5" y1="10.5" x2="8.5" y2="14.5" stroke={C.red} strokeWidth="2" />
      <line x1="6.5" y1="12.5" x2="10.5" y2="12.5" stroke={C.red} strokeWidth="2" />
    </svg>
  );
}

function PoliceIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 14h18v4H3z" stroke={C.blue} strokeWidth="1.5" />
      <path d="M5 14l2-5h10l2 5" stroke={C.blue} strokeWidth="1.5" />
      <circle cx="6.5" cy="18.5" r="1.5" fill={C.blue} />
      <circle cx="17.5" cy="18.5" r="1.5" fill={C.blue} />
      <rect x="9" y="6" width="6" height="3" rx="1" fill={C.blue} />
      <line x1="12" y1="4.5" x2="12" y2="6" stroke={C.blue} strokeWidth="1.5" />
    </svg>
  );
}

function TowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 11h4l3 4v3h-7V11z" stroke={C.green} strokeWidth="1.5" />
      <rect x="1" y="14" width="13" height="4" rx="1.5" stroke={C.green} strokeWidth="1.5" />
      <path d="M5 14V8l4-3" stroke={C.green} strokeWidth="1.8" />
      <path d="M9 5l-2 1" stroke={C.green} strokeWidth="1.5" />
      <path d="M5 8l-1.5 2" stroke={C.green} strokeWidth="1.8" />
      <circle cx="5" cy="18.5" r="1.5" fill={C.green} />
      <circle cx="18.5" cy="18.5" r="1.5" fill={C.green} />
    </svg>
  );
}

function BottomGrid() {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      <ActionCard
        icon={<AmbulanceIcon />}
        label="Hospital"
        subtitle="Nearest"
        bgLight={C.blueLight}
        borderColor={C.blueBorder}
        accentColor={C.blue}
        delay="0.05s"
      />
      <ActionCard
        icon={<PoliceIcon />}
        label="Police"
        subtitle="Nearest"
        bgLight={C.blueLight}
        borderColor={C.blueBorder}
        accentColor={C.blue}
        delay="0.1s"
      />
      <ActionCard
        icon={<TowIcon />}
        label="Towing"
        subtitle="Nearest"
        bgLight={C.greenLight}
        borderColor={C.greenBorder}
        accentColor={C.green}
        delay="0.15s"
      />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━ Main App ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: C.bg }}>
      <div className="max-w-md w-full h-screen flex flex-col justify-between px-5 py-6 gap-2">
        {/* Top section */}
        <div className="flex flex-col gap-4">
          <StatusHeader />
          <LocationCard />
        </div>

        {/* Center */}
        <SosButton />

        {/* Bottom section */}
        <div className="flex flex-col gap-3.5 pb-2">
          <HelpDivider />
          <BottomGrid />
        </div>
      </div>
    </div>
  );
}
