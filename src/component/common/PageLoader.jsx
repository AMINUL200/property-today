import React from "react";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--color-navy)] overflow-hidden">
      {/* ---------- Ambient brand glows ---------- */}
      <span className="pointer-events-none absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-[var(--color-secondary)]/15 blur-3xl animate-[ptLoaderGlow_3s_ease-in-out_infinite]" />
      <span className="pointer-events-none absolute -bottom-40 -right-40 w-[480px] h-[480px] rounded-full bg-[var(--color-primary)]/25 blur-3xl animate-[ptLoaderGlow_3s_ease-in-out_infinite_0.6s]" />

      {/* ---------- Subtle dot texture ---------- */}
      <span
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ---------- Center content ---------- */}
      <div className="relative flex flex-col items-center gap-8">
        {/* Logo mark + spinning rings */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* Outer rotating ring */}
          <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--color-secondary)] border-r-[var(--color-secondary)]/40 animate-[ptSpin_1.6s_linear_infinite]" />

          {/* Middle ring, opposite direction */}
          <span className="absolute inset-2 rounded-full border-2 border-transparent border-b-[var(--color-primary)] border-l-[var(--color-primary)]/50 animate-[ptSpinReverse_2s_linear_infinite]" />

          {/* Soft pulsing glow behind the logo */}
          <span className="absolute inset-4 rounded-full bg-[var(--color-secondary)]/20 blur-md animate-[ptPulse_2s_ease-in-out_infinite]" />

          {/* House icon */}
          <span className="relative w-14 h-14 rounded-[var(--radius-lg)] bg-[var(--color-primary)] flex items-center justify-center shadow-[var(--shadow-primary)] animate-[ptPulse_2s_ease-in-out_infinite]">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V10.5Z"
                fill="white"
              />
            </svg>
          </span>
        </div>

        {/* Brand name */}
        <div className="text-center leading-none">
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            Property<span className="text-[var(--color-secondary)]">today</span>
          </h1>
          <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
            Real Estate
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex items-center gap-1.5 mt-1">
          <span className="w-2 h-2 rounded-full bg-[var(--color-secondary)] animate-[ptBounce_1.2s_ease-in-out_infinite]" />
          <span className="w-2 h-2 rounded-full bg-[var(--color-secondary)] animate-[ptBounce_1.2s_ease-in-out_infinite_0.15s]" />
          <span className="w-2 h-2 rounded-full bg-[var(--color-secondary)] animate-[ptBounce_1.2s_ease-in-out_infinite_0.3s]" />
        </div>

        {/* Tagline */}
        <p className="text-xs font-medium text-white/40 tracking-wide">
          Finding your next move…
        </p>
      </div>

      {/* =========================================================
          KEYFRAMES
          ========================================================= */}
      <style>{`
        @keyframes ptSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes ptSpinReverse {
          to { transform: rotate(-360deg); }
        }
        @keyframes ptPulse {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50%      { transform: scale(1.12); opacity: 0.55; }
        }
        @keyframes ptBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40%           { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes ptLoaderGlow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%      { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default PageLoader;