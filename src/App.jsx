import { useState, useCallback } from 'react';
import {
  WifiOff,
  MapPin,
  Copy,
  Check,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

/* ───────────────────────────── Offline Badge ─────────────────────── */

function OfflineBadge() {
  return (
    <div className="flex justify-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-4 py-1.5">
        <WifiOff className="h-3.5 w-3.5 text-[var(--color-danger)]" strokeWidth={2} />
        <span className="text-[10px] font-medium tracking-[0.18em] text-[var(--color-text-tertiary)] uppercase">
          Offline Mode
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────── Location Card ───────────────────────── */

function LocationCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    const text = 'NH-544, Near Avinashi.\n11.18, 77.26';
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div className="w-full rounded-xl border border-[var(--color-danger-muted)]/30 bg-[var(--color-surface)] p-4">
      <div className="flex items-center gap-3">
        {/* Map icon */}
        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg bg-[var(--color-danger-muted)]/15">
          <MapPin className="h-5 w-5 text-[var(--color-danger)]" strokeWidth={1.8} />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-semibold text-[var(--color-text-primary)] leading-tight truncate">
            NH-544, Near Avinashi.
          </p>
          <p className="text-[11px] text-[var(--color-text-secondary)] mt-1 font-normal tracking-wide">
            11.1819°N, 77.2621°E
          </p>
        </div>

        {/* Divider */}
        <div className="w-px h-9 bg-[var(--color-border-subtle)] flex-shrink-0" />

        {/* Copy */}
        <button
          onClick={handleCopy}
          className="flex flex-col items-center gap-1 flex-shrink-0 px-2 py-1 cursor-pointer bg-transparent border-none rounded-lg transition-colors duration-150 hover:bg-white/[0.03] active:bg-white/[0.06]"
          aria-label="Copy location"
        >
          {copied ? (
            <Check className="h-4 w-4 text-[var(--color-accent-green)]" strokeWidth={2} />
          ) : (
            <Copy className="h-4 w-4 text-[var(--color-text-secondary)]" strokeWidth={1.8} />
          )}
          <span className="text-[9px] font-medium tracking-[0.12em] text-[var(--color-text-tertiary)] uppercase">
            {copied ? 'Copied' : 'Copy'}
          </span>
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────── SOS Button ─────────────────────────── */

function SosButton() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="relative">
        {/* Outer subtle ring */}
        <div
          className="absolute -inset-4 rounded-full border border-[var(--color-danger)]/8"
        />
        <div
          className="absolute -inset-8 rounded-full border border-[var(--color-danger)]/4"
        />

        <button
          className="relative h-52 w-52 rounded-full cursor-pointer
            bg-[var(--color-danger)]
            flex flex-col items-center justify-center gap-1.5
            transition-all duration-200 active:scale-[0.97]
            select-none border-none outline-none"
          style={{
            boxShadow: '0 4px 40px rgba(192, 57, 43, 0.2), 0 0 0 1px rgba(192, 57, 43, 0.3)',
          }}
          aria-label="Swipe for SOS"
        >
          <span className="text-white/70 text-xs font-medium tracking-[0.25em] uppercase">
            Swipe For
          </span>
          <span className="text-white text-6xl font-extrabold leading-none -tracking-[0.02em]">
            SOS
          </span>

          {/* Chevron arrows — static, fading opacity */}
          <div className="flex items-center -space-x-1 mt-2">
            <ChevronRight className="h-5 w-5 text-white/50" strokeWidth={2} />
            <ChevronRight className="h-5 w-5 text-white/30" strokeWidth={2} />
            <ChevronRight className="h-5 w-5 text-white/15" strokeWidth={2} />
          </div>
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────── Divider ────────────────────────────── */

function HelpDivider() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 h-px bg-[var(--color-border-subtle)]" />
      <span className="text-[10px] font-medium tracking-[0.2em] text-[var(--color-text-tertiary)] uppercase whitespace-nowrap">
        I Am Here To Help
      </span>
      <div className="flex-1 h-px bg-[var(--color-border-subtle)]" />
    </div>
  );
}

/* ───────────────────── Bottom Action Cards ───────────────────────── */

function ActionCard({ icon, line1, line2, accentColor }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-2 py-5">
      {/* Icon circle */}
      <div
        className="flex items-center justify-center h-11 w-11 rounded-full"
        style={{
          backgroundColor: `${accentColor}15`,
          border: `1px solid ${accentColor}25`,
        }}
      >
        {icon}
      </div>

      {/* Label */}
      <div className="text-center">
        <p className="text-[10px] font-medium tracking-[0.12em] text-[var(--color-text-tertiary)] uppercase leading-tight">
          {line1}
        </p>
        <p className="text-[12px] font-bold text-[var(--color-text-primary)] uppercase leading-tight mt-0.5">
          {line2}
        </p>
      </div>

      {/* Go button */}
      <button
        className="flex items-center justify-center h-7 w-7 rounded-full bg-[var(--color-surface-elevated)] border border-[var(--color-border-muted)] cursor-pointer transition-colors duration-150 hover:bg-[var(--color-border-muted)]"
        aria-label={`Navigate to ${line2}`}
      >
        <ArrowRight className="h-3.5 w-3.5 text-[var(--color-text-secondary)]" strokeWidth={2} />
      </button>
    </div>
  );
}

/* ─── Custom SVG Icons ─────────────────────────────────────────────── */

function AmbulanceIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#5a8fca" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="8" width="15" height="9" rx="1" />
      <path d="M16 11h4l3 4v2h-7V11z" />
      <circle cx="5.5" cy="18.5" r="1.5" fill="#5a8fca" stroke="none" />
      <circle cx="18.5" cy="18.5" r="1.5" fill="#5a8fca" stroke="none" />
      <line x1="8.5" y1="10.5" x2="8.5" y2="14.5" stroke="#c0392b" strokeWidth="1.8" />
      <line x1="6.5" y1="12.5" x2="10.5" y2="12.5" stroke="#c0392b" strokeWidth="1.8" />
    </svg>
  );
}

function PoliceCarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#5a8fca" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 14h18v4H3z" />
      <path d="M5 14l2-5h10l2 5" />
      <circle cx="6.5" cy="18.5" r="1.5" fill="#5a8fca" stroke="none" />
      <circle cx="17.5" cy="18.5" r="1.5" fill="#5a8fca" stroke="none" />
      <rect x="9" y="6" width="6" height="3" rx="1" fill="#5a8fca" stroke="none" />
      <line x1="12" y1="4.5" x2="12" y2="6" stroke="#5a8fca" strokeWidth="1.2" />
    </svg>
  );
}

function TowTruckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#4a9e74" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 11h4l3 4v3h-7V11z" />
      <rect x="1" y="14" width="13" height="4" rx="1" />
      <path d="M5 14V8l4-3" strokeWidth="1.8" />
      <path d="M9 5l-2 1" />
      <path d="M5 8l-1.5 2" strokeWidth="1.8" />
      <circle cx="5" cy="18.5" r="1.5" fill="#4a9e74" stroke="none" />
      <circle cx="18.5" cy="18.5" r="1.5" fill="#4a9e74" stroke="none" />
    </svg>
  );
}

function BottomGrid() {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      <ActionCard
        icon={<AmbulanceIcon />}
        line1="Nearest"
        line2="Hospital"
        accentColor="#5a8fca"
      />
      <ActionCard
        icon={<PoliceCarIcon />}
        line1="Nearest"
        line2="Police"
        accentColor="#5a8fca"
      />
      <ActionCard
        icon={<TowTruckIcon />}
        line1="Nearest"
        line2="Towing"
        accentColor="#4a9e74"
      />
    </div>
  );
}

/* ──────────────────────────── Main App ───────────────────────────── */

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="max-w-md w-full h-screen flex flex-col justify-between p-5 gap-3">
        {/* Top */}
        <div className="flex flex-col gap-4 pt-1">
          <OfflineBadge />
          <LocationCard />
        </div>

        {/* Center */}
        <SosButton />

        {/* Bottom */}
        <div className="flex flex-col gap-4 pb-3">
          <HelpDivider />
          <BottomGrid />
        </div>
      </div>
    </div>
  );
}
