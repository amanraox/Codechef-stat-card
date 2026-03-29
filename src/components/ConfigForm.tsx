"use client";

import { useState, useCallback, useRef } from "react";
import Preview from "./Preview";
import CopyButton from "./CopyButton";

// Organized in 4 rows
const THEME_ROWS: { label: string; themes: string[] }[] = [
  {
    label: "Light Gradients",
    themes: ["gradient-peach", "gradient-sky", "gradient-lavender", "gradient-mint", "gradient-rose", "gradient-sunset", "gradient-candy"],
  },
  {
    label: "Dark Gradients",
    themes: ["gradient-ocean", "gradient-aurora", "gradient-royal", "gradient-neon", "gradient-cosmic", "gradient-ember"],
  },
  {
    label: "Light",
    themes: ["light", "warm", "paper", "sakura", "ocean-light", "leaf", "sand"],
  },
  {
    label: "Dark",
    themes: ["dark", "nord", "dracula", "tokyonight", "cyberpunk", "aurora", "ember"],
  },
];

const ALL_THEMES = THEME_ROWS.flatMap((r) => r.themes);

// Theme swatch preview colors [bg, accent]
const THEME_SWATCHES: Record<string, [string, string]> = {
  // Light gradients
  "gradient-peach":    ["linear-gradient(135deg,#ffecd2,#fcb69f,#ff9a9e)", "#d4451a"],
  "gradient-sky":      ["linear-gradient(135deg,#e0f7fa,#b2ebf2,#80deea,#a7ffeb)", "#00838f"],
  "gradient-lavender": ["linear-gradient(135deg,#f3e7e9,#e3eeff,#d5c8f0)", "#7c4dff"],
  "gradient-mint":     ["linear-gradient(135deg,#e8f5e9,#c8e6c9,#a5d6a7,#e0f2f1)", "#00c853"],
  "gradient-rose":     ["linear-gradient(135deg,#fce4ec,#f8bbd0,#f48fb1)", "#e91e63"],
  "gradient-sunset":   ["linear-gradient(135deg,#f093fb,#f5576c,#fda085)", "#ffffff"],
  "gradient-candy":    ["linear-gradient(135deg,#fff1f5,#fce4f0,#e8d5f5,#d5e4fc,#f0f7ff)", "#e040fb"],
  // Dark gradients
  "gradient-ocean":    ["linear-gradient(135deg,#0f2027,#203a43,#2c5364)", "#00e5ff"],
  "gradient-aurora":   ["linear-gradient(135deg,#0d1b2a,#1b4332,#2d1b69)", "#a3f7bf"],
  "gradient-royal":    ["linear-gradient(135deg,#141e30,#1a1a3e,#243b55)", "#d4af37"],
  "gradient-neon":     ["linear-gradient(135deg,#0a0a0a,#1a0a2e,#0a1628)", "#ff2e97"],
  "gradient-cosmic":   ["linear-gradient(135deg,#0f0c29,#302b63,#24243e)", "#818cf8"],
  "gradient-ember":    ["linear-gradient(135deg,#0f0a07,#2d0a0a,#4a1a08,#1a0a00)", "#ff4500"],
  // Light solid
  light:         ["#ffffff", "#5b4638"],
  warm:          ["#fdf6e3", "#cb4b16"],
  paper:         ["#faf9f6", "#0f3460"],
  sakura:        ["#fef6f9", "#d63384"],
  "ocean-light": ["#f0f9ff", "#0284c7"],
  leaf:          ["#f5faf5", "#2e7d32"],
  sand:          ["#fdf8f0", "#bf360c"],
  // Dark solid
  dark:          ["#0d1117", "#d4a373"],
  nord:          ["#2e3440", "#88c0d0"],
  dracula:       ["#282a36", "#ff79c6"],
  tokyonight:    ["#1a1b26", "#7aa2f7"],
  cyberpunk:     ["#0a0e17", "#00ffd5"],
  aurora:        ["#0f1923", "#a3f7bf"],
  ember:         ["#1a1210", "#ff6b35"],
};

const EXTENSIONS = [
  { value: "", label: "None" },
  { value: "heatmap", label: "Submission Heatmap" },
  { value: "contest", label: "Rating History" },
];
const FONTS = [
  { value: "roboto", label: "Roboto" },
  { value: "roboto mono", label: "Roboto Mono" },
  { value: "fira code", label: "Fira Code" },
  { value: "jetbrains mono", label: "JetBrains Mono" },
  { value: "source code pro", label: "Source Code Pro" },
  { value: "inter", label: "Inter" },
  { value: "poppins", label: "Poppins" },
  { value: "space grotesk", label: "Space Grotesk" },
  { value: "ubuntu", label: "Ubuntu" },
  { value: "ubuntu mono", label: "Ubuntu Mono" },
];
const HIDE_OPTIONS = [
  { value: "currentRating", label: "Current Rating" },
  { value: "highestRating", label: "Highest Rating" },
  { value: "globalRank", label: "Global Rank" },
  { value: "countryRank", label: "Country Rank" },
];

const COLOR_FIELDS = [
  { key: "bg",        label: "Background",   default_l: "#ffffff", default_d: "#0d1117" },
  { key: "border",    label: "Border",        default_l: "#e4e2e2", default_d: "#30363d" },
  { key: "title",     label: "Title",         default_l: "#2f363d", default_d: "#f0f6fc" },
  { key: "text",      label: "Text",          default_l: "#586069", default_d: "#c9d1d9" },
  { key: "subtext",   label: "Subtext",       default_l: "#8b949e", default_d: "#8b949e" },
  { key: "accent",    label: "Accent",        default_l: "#5b4638", default_d: "#d4a373" },
  { key: "gridFill",  label: "Heatmap Fill",  default_l: "#5b4638", default_d: "#d4a373" },
  { key: "chartLine", label: "Chart Line",    default_l: "#5b4638", default_d: "#d4a373" },
];

function ColorPicker({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2.5 group">
      <div className="relative">
        <input
          type="color"
          value={value || placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-9 h-9 rounded-lg border-2 border-brown-200 cursor-pointer p-0.5
            group-hover:border-brown-400 transition-colors"
        />
        {value && (
          <button
            onClick={(e) => { e.preventDefault(); onChange(""); }}
            className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-brown-500 text-white rounded-full
              text-[10px] leading-none flex items-center justify-center cursor-pointer
              hover:bg-brown-700 transition-colors"
          >
            ×
          </button>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] text-brown-400 mb-0.5 leading-tight">{label}</div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-1.5 py-0.5 text-xs font-mono border border-brown-200 rounded
            bg-white text-brown-700 placeholder:text-brown-300
            focus:outline-none focus:border-brown-400 transition-colors"
        />
      </div>
    </div>
  );
}

export default function ConfigForm() {
  const [username, setUsername] = useState("");
  const [submittedUser, setSubmittedUser] = useState("");
  const [theme, setTheme] = useState("light");
  const [extension, setExtension] = useState("");
  const [font, setFont] = useState("roboto mono");
  const [hide, setHide] = useState<string[]>([]);
  const [colors, setColors] = useState<Record<string, string>>({});
  const [bgImage, setBgImage] = useState("");
  const [showCustomize, setShowCustomize] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (username.trim()) {
        setSubmittedUser(username.trim());
      }
    },
    [username]
  );

  const toggleHide = (field: string) => {
    setHide((prev) =>
      prev.includes(field)
        ? prev.filter((f) => f !== field)
        : [...prev, field]
    );
  };

  const setColor = (key: string, value: string) => {
    setColors((prev) => {
      const next = { ...prev };
      if (value) {
        next[key] = value;
      } else {
        delete next[key];
      }
      return next;
    });
  };

  const LIGHT_THEMES = new Set(["light","warm","paper","sakura","ocean-light","leaf","sand","gradient-peach","gradient-sky","gradient-lavender","gradient-mint","gradient-rose","gradient-sunset","gradient-candy"]);
  const isDark = !LIGHT_THEMES.has(theme);
  const activeOverrides = Object.keys(colors).filter((k) => colors[k]);

  const buildUrl = (base: string) => {
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
    return `${base}/api/${submittedUser}${qs ? `?${qs}` : ""}`;
  };

  const fullUrl = submittedUser
    ? buildUrl(typeof window !== "undefined" ? window.location.origin : "")
    : "";
  const markdown = submittedUser
    ? `![CodeChef Stats](${fullUrl})`
    : "";

  return (
    <div className="space-y-8">
      {/* Username Input */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brown-400 font-mono text-sm">
              codechef.com/users/
            </span>
            <input
              ref={inputRef}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className="w-full pl-[168px] pr-4 py-3.5 bg-white border-2 border-brown-200 rounded-xl
                font-mono text-brown-800 placeholder:text-brown-300
                focus:outline-none focus:border-brown-500 focus:ring-2 focus:ring-brown-500/10
                transition-all duration-200"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3.5 bg-brown-600 text-cream rounded-xl font-semibold
              hover:bg-brown-700 active:scale-[0.97] transition-all duration-200
              shadow-lg shadow-brown-600/20 cursor-pointer"
          >
            Generate
          </button>
        </div>
      </form>

      {/* Theme Picker — 4-row visual swatch grid */}
      <div className="space-y-4">
        {THEME_ROWS.map((row) => (
          <div key={row.label}>
            <label className="block font-mono text-[10px] tracking-wider text-brown-400 uppercase mb-1.5">
              {row.label}
            </label>
            <div className="flex gap-2 flex-wrap">
              {row.themes.map((t) => {
                const swatch = THEME_SWATCHES[t] || ["#000", "#fff"];
                const isActive = theme === t;
                return (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    title={t}
                    className={`group relative flex flex-col items-center gap-1 cursor-pointer transition-all duration-200
                      ${isActive ? "scale-105" : "hover:scale-105"}`}
                    style={{ width: "calc((100% - 6 * 0.5rem) / 7)", minWidth: 56 }}
                  >
                    <div
                      className={`w-full aspect-[3/2] rounded-lg border-2 overflow-hidden relative transition-all duration-200
                        ${isActive
                          ? "border-brown-600 shadow-md shadow-brown-600/30 ring-2 ring-brown-600/20"
                          : "border-brown-200 group-hover:border-brown-400"
                        }`}
                      style={{ background: swatch[0] }}
                    >
                      <div className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full border border-white/30"
                        style={{ background: swatch[1] }}
                      />
                    </div>
                    <span className={`text-[10px] font-mono leading-tight truncate w-full text-center
                      ${isActive ? "text-brown-700 font-semibold" : "text-brown-400"}`}>
                      {t.replace("gradient-", "")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Font & Extension Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-mono text-xs tracking-wider text-brown-400 uppercase mb-2">
            Font
          </label>
          <select
            value={font}
            onChange={(e) => setFont(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border-2 border-brown-200 rounded-lg
              font-mono text-sm text-brown-700
              focus:outline-none focus:border-brown-500 transition-colors cursor-pointer"
          >
            {FONTS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-mono text-xs tracking-wider text-brown-400 uppercase mb-2">
            Extension
          </label>
          <select
            value={extension}
            onChange={(e) => setExtension(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border-2 border-brown-200 rounded-lg
              font-mono text-sm text-brown-700
              focus:outline-none focus:border-brown-500 transition-colors cursor-pointer"
          >
            {EXTENSIONS.map((ext) => (
              <option key={ext.value} value={ext.value}>
                {ext.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Hide Fields */}
      <div>
        <label className="block font-mono text-xs tracking-wider text-brown-400 uppercase mb-2">
          Hide Fields
        </label>
        <div className="flex flex-wrap gap-2">
          {HIDE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => toggleHide(opt.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border cursor-pointer
                ${
                  hide.includes(opt.value)
                    ? "bg-brown-200 text-brown-700 border-brown-300 line-through"
                    : "bg-white text-brown-500 border-brown-200 hover:border-brown-300"
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Theme Builder */}
      <div className="border-2 border-brown-200 rounded-xl overflow-hidden">
        <button
          onClick={() => setShowCustomize(!showCustomize)}
          className="w-full flex items-center justify-between px-5 py-3.5
            hover:bg-brown-50/50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-brown-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
            </svg>
            <span className="font-mono text-xs tracking-wider text-brown-600 uppercase font-semibold">
              Custom Theme Builder
            </span>
            {activeOverrides.length > 0 && (
              <span className="px-2 py-0.5 bg-brown-600 text-cream text-[10px] font-mono rounded-full">
                {activeOverrides.length} override{activeOverrides.length > 1 ? "s" : ""}
              </span>
            )}
          </div>
          <svg
            className={`w-4 h-4 text-brown-400 transition-transform duration-200 ${showCustomize ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showCustomize && (
          <div className="border-t border-brown-200">
            {/* Mini preview bar */}
            <div className="px-5 py-3 bg-brown-50/30 flex items-center gap-3 border-b border-brown-100">
              <span className="text-[11px] text-brown-400">Preview:</span>
              <div className="flex-1 h-6 rounded-md flex overflow-hidden border border-brown-200">
                {COLOR_FIELDS.slice(0, 6).map((cf) => (
                  <div
                    key={cf.key}
                    className="flex-1 h-full"
                    title={`${cf.label}: ${colors[cf.key] || (isDark ? cf.default_d : cf.default_l)}`}
                    style={{
                      background: colors[cf.key] || (isDark ? cf.default_d : cf.default_l),
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Color Grid */}
            <div className="p-5 space-y-5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-4">
                {COLOR_FIELDS.map((cf) => (
                  <ColorPicker
                    key={cf.key}
                    label={cf.label}
                    value={colors[cf.key] || ""}
                    placeholder={isDark ? cf.default_d : cf.default_l}
                    onChange={(v) => setColor(cf.key, v)}
                  />
                ))}
              </div>

              {/* Reset */}
              {activeOverrides.length > 0 && (
                <div className="flex items-center gap-3 pt-2 border-t border-brown-100">
                  <button
                    onClick={() => setColors({})}
                    className="text-xs text-brown-400 hover:text-brown-600 transition-colors cursor-pointer
                      flex items-center gap-1"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Reset all overrides
                  </button>
                  <span className="text-[10px] text-brown-300">
                    Active: {activeOverrides.map((k) => k).join(", ")}
                  </span>
                </div>
              )}

              {/* Background Image */}
              <div className="pt-3 border-t border-brown-100">
                <label className="flex items-center gap-2 text-xs text-brown-500 font-semibold mb-2">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Background Image
                  <span className="font-normal text-brown-300">(https .jpg/.png/.webp)</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={bgImage}
                    onChange={(e) => setBgImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 px-3 py-2 text-sm font-mono border-2 border-brown-200 rounded-lg
                      bg-white text-brown-700 placeholder:text-brown-300
                      focus:outline-none focus:border-brown-500 transition-colors"
                  />
                  {bgImage && (
                    <button
                      onClick={() => setBgImage("")}
                      className="px-3 py-2 text-xs text-brown-400 border-2 border-brown-200 rounded-lg
                        hover:border-brown-400 hover:text-brown-600 transition-colors cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Preview */}
      <Preview
        username={submittedUser}
        theme={theme}
        extension={extension}
        font={font}
        hide={hide}
        colors={colors}
        bgImage={bgImage}
      />

      {/* Copy Buttons */}
      {submittedUser && (
        <div className="space-y-4 animate-slide-up">
          <div>
            <label className="block font-mono text-xs tracking-wider text-brown-400 uppercase mb-2">
              Markdown
            </label>
            <div className="flex items-stretch gap-3">
              <div className="code-block flex-1 truncate">{markdown}</div>
              <CopyButton text={markdown} label="Copy" />
            </div>
          </div>
          <div>
            <label className="block font-mono text-xs tracking-wider text-brown-400 uppercase mb-2">
              URL
            </label>
            <div className="flex items-stretch gap-3">
              <div className="code-block flex-1 truncate">{fullUrl}</div>
              <CopyButton text={fullUrl} label="Copy" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
