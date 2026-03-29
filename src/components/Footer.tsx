export default function Footer() {
  return (
    <footer className="mt-auto pt-16 pb-8">
      {/* Action buttons */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <a
          href="https://github.com/amanraox/Codechef-stat-card/issues/new?labels=bug&template=bug_report.md"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-brown-200
            text-sm text-brown-600 hover:bg-brown-50 hover:border-brown-400 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Report Bug
        </a>
        <a
          href="https://github.com/amanraox/Codechef-stat-card"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-brown-200
            text-sm text-brown-600 hover:bg-brown-50 hover:border-brown-400 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
          Star & Contribute
        </a>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-brown-400 text-sm">
        <span>Built with</span>
        <svg className="w-4 h-4 text-red-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <span>by</span>
        <a
          href="https://amanraox.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brown-600 hover:text-brown-800 transition-colors underline decoration-brown-300 underline-offset-2 hover:decoration-brown-600"
        >
          @amanraox
        </a>
      </div>
      <div className="mt-2 flex items-center justify-center gap-4 text-xs text-brown-300">
        <span>Not affiliated with CodeChef</span>
      </div>
    </footer>
  );
}
