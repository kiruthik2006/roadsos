import { useState, useCallback } from 'react';
import {
  WifiOff,
  MapPin,
  Copy,
  Check,
  TriangleAlert,
  Hospital,
  ShieldAlert,
  CarFront,
} from 'lucide-react';

/* ━━━ MD3 Dark Theme Tokens ━━━━━━ */
const C = {
  bg: '#1e1b1a',
  surfaceContainer: '#2b2927',
  surfaceContainerHigh: '#363431',
  onSurface: '#eae0d4',
  onSurfaceVariant: '#d0c4b5',
  primary: '#ffb4ab',
  onPrimary: '#690005',
  primaryContainer: '#93000a',
  onPrimaryContainer: '#ffdad6',
  error: '#ffb4ab',
  blueContainer: '#004a77',
  onBlueContainer: '#c1e8ff',
  greenContainer: '#005234',
  onGreenContainer: '#8ef7c0',
  sosRed: '#ff5449',
};

/* ━━━━━━━━━━━━━━━━━━━━ Logo & Header ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function AppLogo() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none">
      {/* Shield backdrop */}
      <path
        d="M16 2 L28 6 V14 C28 22 22 28 16 30 C10 28 4 22 4 14 V6 Z"
        fill={C.primaryContainer}
      />
      {/* Road / Path inside shield */}
      <path
        d="M12 30 L16 12 L20 30"
        stroke={C.onPrimaryContainer}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="12" r="3" fill={C.primary} />
    </svg>
  );
}

function StatusHeader() {
  return (
    <div
      className="flex items-center justify-between z-10"
      style={{ animation: 'slide-up-md 0.4s ease-out both' }}
    >
      <AppLogo />
      
      {/* Visual offline indicator */}
      <div
        className="flex items-center justify-center h-10 w-10 rounded-full md-elevation-1"
        style={{ background: C.surfaceContainerHigh }}
      >
        <WifiOff className="h-5 w-5" style={{ color: C.error }} strokeWidth={2} />
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━ Location Card ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function LocationCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard?.writeText('11.1819°N, 77.2621°E').catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div
      className="w-full rounded-[28px] p-5 flex items-center gap-4 z-10 md-elevation-1"
      style={{
        background: C.surfaceContainer,
        animation: 'slide-up-md 0.4s ease-out 0.1s both',
      }}
    >
      {/* Large visual pin */}
      <div
        className="flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-full"
        style={{ background: C.surfaceContainerHigh }}
      >
        <MapPin className="h-7 w-7" style={{ color: C.primary }} strokeWidth={1.8} />
      </div>

      {/* Coordinates only - highly visual */}
      <div className="flex-1 min-w-0">
        <p className="text-[20px] font-bold tracking-wide" style={{ color: C.onSurface }}>
          11.18, 77.26
        </p>
        <p className="text-[14px] font-medium mt-1 truncate" style={{ color: C.onSurfaceVariant }}>
          NH-544, Near Avinashi
        </p>
      </div>

      {/* Visual icon-only copy button */}
      <button
        onClick={handleCopy}
        className="flex items-center justify-center h-14 w-14 rounded-full cursor-pointer md-ripple flex-shrink-0"
        style={{
          background: copied ? C.greenContainer : C.surfaceContainerHigh,
          color: copied ? C.onGreenContainer : C.onSurface,
        }}
        aria-label="Copy location"
      >
        {copied ? (
          <Check className="h-6 w-6" strokeWidth={2.5} />
        ) : (
          <Copy className="h-6 w-6" strokeWidth={2} />
        )}
      </button>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━ SOS Button ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function SosButton() {
  return (
    <div className="flex-1 flex items-center justify-center relative">
      {/* Background radar animation */}
      <div className="radar-ring" />
      <div className="radar-ring" />
      <div className="radar-ring" />

      {/* Massive visual SOS button */}
      <button
        className="relative h-64 w-64 rounded-full cursor-pointer md-ripple
          flex flex-col items-center justify-center z-10
          transition-transform duration-200 active:scale-95 border-none outline-none md-elevation-2"
        style={{
          background: C.sosRed,
          color: '#ffffff',
        }}
        aria-label="Trigger SOS"
      >
        <TriangleAlert className="h-16 w-16 mb-2" strokeWidth={2.5} />
        <span
          className="text-[48px] font-black leading-none"
          style={{ letterSpacing: '0.05em' }}
        >
          SOS
        </span>
      </button>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━ Action Cards ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function ActionButton({ icon, label, bg, color, delay }) {
  return (
    <button
      className="flex flex-col items-center justify-center gap-3 rounded-[24px] p-4 cursor-pointer
        md-ripple md-elevation-1 border-none outline-none h-28"
      style={{
        background: bg,
        color: color,
        animation: `slide-up-md 0.4s ease-out ${delay} both`,
      }}
      aria-label={`Call ${label}`}
    >
      {icon}
      <span className="text-[14px] font-bold tracking-wide">{label}</span>
    </button>
  );
}

function BottomGrid() {
  return (
    <div className="grid grid-cols-3 gap-4 z-10 w-full">
      <ActionButton
        icon={<Hospital className="h-8 w-8" strokeWidth={2} />}
        label="Medic"
        bg={C.blueContainer}
        color={C.onBlueContainer}
        delay="0.2s"
      />
      <ActionButton
        icon={<ShieldAlert className="h-8 w-8" strokeWidth={2} />}
        label="Police"
        bg={C.blueContainer}
        color={C.onBlueContainer}
        delay="0.3s"
      />
      <ActionButton
        icon={<CarFront className="h-8 w-8" strokeWidth={2} />}
        label="Tow"
        bg={C.greenContainer}
        color={C.onGreenContainer}
        delay="0.4s"
      />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━ Main App ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export default function App() {
  return (
    <div className="min-h-screen relative flex items-center justify-center" style={{ background: C.bg }}>
      <div className="max-w-md w-full h-screen flex flex-col justify-between px-6 py-8">
        {/* Top section */}
        <div className="flex flex-col gap-6">
          <StatusHeader />
          <LocationCard />
        </div>

        {/* Center */}
        <SosButton />

        {/* Bottom section */}
        <BottomGrid />
      </div>
    </div>
  );
}
