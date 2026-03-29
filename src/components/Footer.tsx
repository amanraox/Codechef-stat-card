export default function Footer() {
  return (
    <footer className="mt-auto pt-16 pb-8 text-center">
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
        <a
          href="https://github.com/amanraox/codechef-card"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-brown-500 transition-colors"
        >
          GitHub
        </a>
        <span>·</span>
        <span>Not affiliated with CodeChef</span>
      </div>
    </footer>
  );
}
