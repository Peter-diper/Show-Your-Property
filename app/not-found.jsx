import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen px-5 bg-gradient-to-br from-gray-900 via-gray-950 to-black flex items-center justify-center">
      <div className="bg-white/5 backdrop-blur-xl border max-w-200 w-full border-white/10 rounded-2xl p-10 text-center shadow-xl">
        <h1 className="text-6xl font-bold text-white mb-2">404 :)</h1>
        <p className="text-white/40 text-sm mb-6">Dude there is nothing here</p>
        <Link
          href="/"
          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
