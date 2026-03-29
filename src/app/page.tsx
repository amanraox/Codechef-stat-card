import ConfigForm from "@/components/ConfigForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-16 px-6">
        {/* Decorative background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              var(--brown-600) 0,
              var(--brown-600) 1px,
              transparent 0,
              transparent 50%
            )`,
            backgroundSize: "12px 12px",
          }}
        />

        <div className="relative max-w-2xl mx-auto text-center">
          {/* Badge */}
          <div className="animate-slide-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brown-200 bg-white/60 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono text-xs text-brown-500 tracking-wide">
              Open Source
            </span>
          </div>

          {/* Title */}
          <h1 className="animate-slide-up stagger-1 font-serif text-5xl md:text-6xl text-brown-800 leading-[1.1] mb-4">
            CodeChef
            <br />
            <span className="relative">
              Stats Card
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-amber" viewBox="0 0 200 12" preserveAspectRatio="none">
                <path d="M0 8 Q50 0 100 6 Q150 12 200 4" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="animate-slide-up stagger-2 text-lg text-brown-400 max-w-lg mx-auto leading-relaxed mt-6">
            Generate beautiful, embeddable SVG cards for your CodeChef profile.
            Drop them into GitHub READMEs, portfolios, or anywhere that renders images.
          </p>

          {/* Usage example */}
          <div className="animate-slide-up stagger-3 mt-10 text-left max-w-lg mx-auto">
            <div className="code-block">
              <span className="text-brown-400">{"<!-- "}</span>
              <span className="text-brown-300">Add to your README</span>
              <span className="text-brown-400">{" -->"}</span>
              <br />
              <span className="text-amber-light">{"![CodeChef Stats]"}</span>
              <span className="text-brown-300">{"(https://your-domain/api/"}</span>
              <span className="text-amber">username</span>
              <span className="text-brown-300">{")"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-2xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-brown-200 to-transparent" />
      </div>

      {/* Config Section */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="animate-slide-up font-serif text-2xl text-brown-700 mb-2">
            Configure your card
          </h2>
          <p className="animate-slide-up stagger-1 text-brown-400 text-sm mb-8">
            Customize themes, extensions, and visible fields. Copy the URL or markdown when you&apos;re happy.
          </p>

          <ConfigForm />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6 bg-brown-50/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl text-brown-700 text-center mb-12">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
                title: "27+ Themes",
                desc: "Light & dark gradients, solid themes — with full custom theme builder, color overrides + background images.",
              },
              {
                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                title: "Heatmap & Charts",
                desc: "Submission heatmap and contest rating history extensions.",
              },
              {
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                title: "Edge-cached",
                desc: "Served via Vercel CDN with smart caching. Fast everywhere.",
              },
            ].map((feat) => (
              <div
                key={feat.title}
                className="p-5 bg-white rounded-xl border border-brown-100 hover:border-brown-200 hover:shadow-lg hover:shadow-brown-100/50 transition-all duration-300"
              >
                <svg className="w-6 h-6 text-brown-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={feat.icon} />
                </svg>
                <h3 className="font-semibold text-brown-700 mb-1">{feat.title}</h3>
                <p className="text-sm text-brown-400 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl text-brown-700 mb-8 text-center">
            API Reference
          </h2>
          <div className="code-block text-sm leading-loose">
            <span className="text-brown-400">GET</span>{" "}
            <span className="text-amber-light">/api/&#123;username&#125;</span>
            <br />
            <br />
            <span className="text-brown-400">{"// Query parameters"}</span>
            <br />
            <span className="text-amber">?theme</span>
            <span className="text-brown-300">=light|dark|...|gradient-sunset|gradient-ocean|gradient-neon|...</span>
            <br />
            <span className="text-amber">?ext</span>
            <span className="text-brown-300">=heatmap|contest</span>
            <br />
            <span className="text-amber">?hide</span>
            <span className="text-brown-300">=currentRating,globalRank,...</span>
            <br />
            <span className="text-amber">?width</span>
            <span className="text-brown-300">=300..800 (default: 500)</span>
            <br />
            <span className="text-amber">?font</span>
            <span className="text-brown-300">=roboto|roboto mono|fira code|jetbrains mono|source code pro|inter|poppins|...</span>
            <br />
            <br />
            <span className="text-brown-400">{"// Color overrides"}</span>
            <br />
            <span className="text-amber">?bg</span>
            <span className="text-brown-300">=ff0000</span>
            {" "}
            <span className="text-amber">?title</span>
            <span className="text-brown-300">=ffffff</span>
            {" "}
            <span className="text-amber">?text</span>
            <span className="text-brown-300">=cccccc</span>
            {" "}
            <span className="text-amber">?accent</span>
            <span className="text-brown-300">=00ff00</span>
            <br />
            <br />
            <span className="text-brown-400">{"// Background image"}</span>
            <br />
            <span className="text-amber">?bg_image</span>
            <span className="text-brown-300">=https://example.com/image.jpg</span>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
