"use client";

import { useState } from "react";

interface PreviewProps {
  svgUrl: string;
}

export default function Preview({ svgUrl }: PreviewProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative">
      <div className="absolute -top-3 left-4 px-2 bg-cream font-mono text-xs tracking-wider text-brown-400 uppercase">
        Preview
      </div>
      <div
        className="border-2 border-brown-200 rounded-xl p-6 min-h-[200px] flex items-center justify-center bg-white/50"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--brown-200) 0.5px, transparent 0)`,
          backgroundSize: "16px 16px",
        }}
      >
        {!svgUrl && (
          <p className="text-brown-300 font-serif italic text-lg">
            Enter a username and click Generate
          </p>
        )}
        {svgUrl && (
          <div className="w-full flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={svgUrl}
              src={svgUrl}
              alt="CodeChef card preview"
              className={`max-w-full transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}
              onLoad={() => {
                setLoading(false);
                setError(false);
              }}
              onError={() => {
                setLoading(false);
                setError(true);
              }}
              ref={(el) => {
                if (el && !el.complete) setLoading(true);
              }}
            />
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-2 text-brown-400">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.3" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  <span className="font-mono text-sm">Fetching card...</span>
                </div>
              </div>
            )}
            {error && (
              <p className="text-brown-400 font-mono text-sm">Failed to load preview</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
