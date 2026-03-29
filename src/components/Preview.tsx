"use client";

import { useState, useEffect } from "react";

interface PreviewProps {
  username: string;
  theme: string;
  extension: string;
  font: string;
  hide: string[];
  colors: Record<string, string>;
  bgImage: string;
}

export default function Preview({
  username, theme, extension, font, hide, colors, bgImage,
}: PreviewProps) {
  const [svgUrl, setSvgUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!username) {
      setSvgUrl("");
      return;
    }

    const params = new URLSearchParams();
    if (theme !== "light") params.set("theme", theme);
    if (extension) params.set("ext", extension);
    if (font !== "roboto mono") params.set("font", font);
    if (hide.length > 0) params.set("hide", hide.join(","));
    if (bgImage) params.set("bg_image", bgImage);

    for (const [k, v] of Object.entries(colors)) {
      if (v) params.set(k, v.replace("#", ""));
    }

    const qs = params.toString();
    const url = `/api/${encodeURIComponent(username)}${qs ? `?${qs}` : ""}`;
    setSvgUrl(url);
    setLoading(true);
    setError(false);
  }, [username, theme, extension, font, hide, colors, bgImage]);

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
        {!username && (
          <p className="text-brown-300 font-serif italic text-lg">
            Enter a username to see the preview
          </p>
        )}
        {username && svgUrl && (
          <div className="w-full flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={svgUrl}
              alt={`CodeChef card for ${username}`}
              className={`max-w-full transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}
              onLoad={() => {
                setLoading(false);
                setError(false);
              }}
              onError={() => {
                setLoading(false);
                setError(true);
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
