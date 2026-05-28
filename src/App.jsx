import { useState, useCallback } from 'react';
import {
  WifiOff,
  MapPin,
  Copy,
  Check,
  ChevronRight,
} from 'lucide-react';

/* ───────────────────────────── helpers ───────────────────────────── */

function OfflineBadge() {
  return (
    <div className="flex justify-center pt-1">
      <div
        className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5"
      >
        <WifiOff className="h-3.5 w-3.5 text-red-500" strokeWidth={2.5} />
        <span className="text-[11px] font-semibold tracking-[0.2em] text-zinc-500 uppercase">
          Offline Mode
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────── location card ───────────────────────── */

function LocationCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    const text = 'NH-544, Near Avinashi.\n11.18, 77.26';
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }, []);

  return (
    <div
      className="w-full rounded-2xl border border-red-900/60 bg-gradient-to-br from-red-950/30 via-zinc-950 to-zinc-950 p-4"
      style={{ animation: 'location-glow 4s ease-in-out infinite' }}
    >
      <div className="flex items-center gap-3">
        {/* Map icon */}
        <div className="flex-shrink-0 flex items-center justify-center h-11 w-11 rounded-xl bg-red-950/50">
          <MapPin className="h-6 w-6 text-white" strokeWidth={2} />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-bold text-white leading-tight truncate">
            NH-544, Near Avinashi.
          </p>
          <p className="text-[12px] text-zinc-500 mt-0.5 font-medium">
            Coordinates: 11.18, 77.26
          </p>
        </div>

        {/* Divider */}
        <div className="w-px h-10 bg-zinc-800 flex-shrink-0" />

        {/* Copy */}
        <button
          onClick={handleCopy}
          className="flex flex-col items-center gap-1 flex-shrink-0 px-1 cursor-pointer bg-transparent border-none"
          style={copied ? { animation: 'copy-flash 0.4s ease-out' } : undefined}
          aria-label="Copy location"
        >
          {copied ? (
            <Check className="h-5 w-5 text-green-400" strokeWidth={2} />
          ) : (
            <Copy className="h-5 w-5 text-zinc-400" strokeWidth={2} />
          )}
          <span className="text-[10px] font-bold tracking-[0.15em] text-zinc-400 uppercase">
            {copied ? 'Done' : 'Copy'}
          </span>
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────── SOS button ─────────────────────────── */

function SosButton() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <button
        className="relative h-56 w-56 rounded-full border-2 border-red-600/70 cursor-pointer
          bg-gradient-to-br from-red-700 via-red-800 to-red-950
          flex flex-col items-center justify-center gap-1
          transition-transform duration-200 active:scale-95
          select-none"
        style={{
          animation: 'sos-pulse 3s ease-in-out infinite',
        }}
        aria-label="Swipe for SOS"
      >
        {/* Inner ring highlight */}
        <div className="absolute inset-2 rounded-full border border-red-600/20 pointer-events-none" />

        <span className="text-white/90 text-sm font-bold tracking-[0.25em] uppercase">
          Swipe For
        </span>
        <span className="text-white text-7xl font-black leading-none tracking-tight"
          style={{ textShadow: '0 0 30px rgba(255,255,255,0.15)' }}>
          SOS
        </span>

        {/* Chevron arrows */}
        <div className="flex items-center gap-0.5 mt-1">
          <ChevronRight className="h-6 w-6 text-red-300" strokeWidth={2.5} style={{ opacity: 0.9 }} />
          <ChevronRight
            className="h-6 w-6 text-red-300"
            strokeWidth={2.5}
            style={{ opacity: 0.5, animation: 'chevron-shimmer 2s ease-in-out 0.3s infinite' }}
          />
          <ChevronRight
            className="h-6 w-6 text-red-300"
            strokeWidth={2.5}
            style={{ opacity: 0.25, animation: 'chevron-shimmer 2s ease-in-out 0.6s infinite' }}
          />
        </div>
      </button>
    </div>
  );
}

/* ──────────────────────────── divider ────────────────────────────── */

function HelpDivider() {
  return (
    <div className="flex items-center gap-4 py-1">
      <div className="flex-1 h-px bg-zinc-800" />
      <span className="text-[11px] font-bold tracking-[0.2em] text-zinc-600 uppercase whitespace-nowrap">
        I Am Here To Help
      </span>
      <div className="flex-1 h-px bg-zinc-800" />
    </div>
  );
}

/* ───────────────────── bottom action cards ───────────────────────── */

function ActionCard({ icon, line1, line2, bgClass, borderClass, glowColor }) {
  return (
    <div
      className={`flex flex-col items-center gap-3 rounded-2xl border ${borderClass} ${bgClass} px-2 py-5`}
    >
      {/* Icon circle */}
      <div
        className="flex items-center justify-center h-12 w-12 rounded-full bg-black/30 border border-white/10"
        style={{ boxShadow: `0 0 20px ${glowColor}` }}
      >
        {icon}
      </div>

      {/* Label */}
      <div className="text-center">
        <p className="text-[11px] font-bold tracking-[0.15em] text-zinc-400 uppercase leading-tight">
          {line1}
        </p>
        <p className="text-[13px] font-extrabold text-white uppercase leading-tight mt-0.5">
          {line2}
        </p>
      </div>

      {/* Go button */}
      <button
        className="flex items-center justify-center h-8 w-8 rounded-full bg-zinc-800/80 border border-zinc-700/50 cursor-pointer transition-colors hover:bg-zinc-700"
        aria-label={`Navigate to ${line2}`}
      >
        <ChevronRight className="h-4 w-4 text-white" strokeWidth={2.5} />
      </button>
    </div>
  );
}

/* ─── custom SVG icons (Lucide doesn't have exact ambulance/police) ── */

function AmbulanceIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {/* Ambulance body */}
      <rect x="1" y="8" width="15" height="9" rx="1" />
      <path d="M16 11h4l3 4v2h-7V11z" />
      {/* Wheels */}
      <circle cx="5.5" cy="18.5" r="1.5" fill="white" />
      <circle cx="18.5" cy="18.5" r="1.5" fill="white" />
      {/* Cross */}
      <line x1="8.5" y1="10.5" x2="8.5" y2="14.5" stroke="#ef4444" strokeWidth="2" />
      <line x1="6.5" y1="12.5" x2="10.5" y2="12.5" stroke="#ef4444" strokeWidth="2" />
    </svg>
  );
}

function PoliceCarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {/* Car body */}
      <path d="M3 14h18v4H3z" />
      <path d="M5 14l2-5h10l2 5" />
      {/* Wheels */}
      <circle cx="6.5" cy="18.5" r="1.5" fill="white" />
      <circle cx="17.5" cy="18.5" r="1.5" fill="white" />
      {/* Siren light */}
      <rect x="9" y="6" width="6" height="3" rx="1" fill="#3b82f6" stroke="#3b82f6" />
      {/* Light beam */}
      <line x1="12" y1="4" x2="12" y2="6" stroke="#60a5fa" strokeWidth="1.5" />
    </svg>
  );
}

function TowTruckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {/* Truck cab */}
      <path d="M14 11h4l3 4v3h-7V11z" />
      {/* Flatbed */}
      <rect x="1" y="14" width="13" height="4" rx="1" />
      {/* Tow arm */}
      <path d="M5 14V8l4-3" strokeWidth="2" />
      <path d="M9 5l-2 1" />
      {/* Hook */}
      <path d="M5 8l-1.5 2" strokeWidth="2" />
      {/* Wheels */}
      <circle cx="5" cy="18.5" r="1.5" fill="white" />
      <circle cx="18.5" cy="18.5" r="1.5" fill="white" />
    </svg>
  );
}

function BottomGrid() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <ActionCard
        icon={<AmbulanceIcon />}
        line1="Nearest"
        line2="Hospital"
        bgClass="bg-blue-950/60"
        borderClass="border-blue-900/50"
        glowColor="rgba(59, 130, 246, 0.25)"
      />
      <ActionCard
        icon={<PoliceCarIcon />}
        line1="Nearest"
        line2="Police"
        bgClass="bg-blue-950/60"
        borderClass="border-blue-900/50"
        glowColor="rgba(59, 130, 246, 0.25)"
      />
      <ActionCard
        icon={<TowTruckIcon />}
        line1="Nearest"
        line2="Towing"
        bgClass="bg-green-950/60"
        borderClass="border-green-900/50"
        glowColor="rgba(34, 197, 94, 0.25)"
      />
    </div>
  );
}

/* ──────────────────────────── main app ───────────────────────────── */

export default function App() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="max-w-md w-full h-screen flex flex-col justify-between p-4 gap-3">
        {/* Top section */}
        <div className="flex flex-col gap-4">
          <OfflineBadge />
          <LocationCard />
        </div>

        {/* Center SOS */}
        <SosButton />

        {/* Bottom section */}
        <div className="flex flex-col gap-4 pb-2">
          <HelpDivider />
          <BottomGrid />
        </div>
      </div>
    </div>
  );
}
