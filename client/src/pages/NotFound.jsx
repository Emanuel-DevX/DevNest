import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <h1 className="text-8xl font-bold text-transparent bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 bg-clip-text animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 text-8xl font-bold text-teal-400/20 blur-sm">
            404
          </div>
        </div>

        {/* Error message */}
        <h2 className="text-2xl font-semibold text-gray-200 mb-3">
          Oops! Page not found
        </h2>
        <p className="text-zinc-400 mb-8 leading-relaxed">
          The page you're looking for seems to have wandered off into the
          digital void. Don't worry, it happens to the best of us.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            href="/dashboard"
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-teal-500/25"
          >
            <Home size={18} />
            Back to Dashboard
          </a>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-gray-200 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 border border-zinc-700 hover:border-zinc-600"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        {/* Decorative elements */}
        <div className="mt-12 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-teal-400/50 to-transparent"></div>
          <p className="text-xs text-zinc-500 mt-4">
            Lost? Try checking the URL or contact support if the problem
            persists.
          </p>
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-teal-400/30 rounded-full animate-ping"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-emerald-400/40 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-cyan-400/30 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
