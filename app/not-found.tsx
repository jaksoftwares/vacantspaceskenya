// app/not-found.tsx
'use client';

import Link from 'next/link';
import { Search, Home, LayoutDashboard } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 p-6">
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Illustration + short message */}
        <section className="flex flex-col items-start gap-6">
          <div className="rounded-3xl bg-gradient-to-tr from-primary/10 to-transparent p-8 shadow-lg border border-gray-100/60 dark:border-gray-800/60">
            {/* Inline simple SVG illustration — easily replace with your brand SVG */}
            <svg width="420" height="220" viewBox="0 0 420 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="block">
              <rect x="10" y="30" width="180" height="120" rx="12" fill="url(#g1)"/>
              <rect x="230" y="20" width="170" height="160" rx="12" fill="url(#g2)"/>
              <circle cx="80" cy="90" r="36" fill="white" opacity="0.75"/>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#E8F8FF"/>
                  <stop offset="1" stopColor="#DFF6FF"/>
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#FFF7ED"/>
                  <stop offset="1" stopColor="#FFF1E6"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div>
            <h1 className="text-6xl font-extrabold leading-tight tracking-tighter text-slate-900 dark:text-white">404</h1>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300 max-w-lg">
              We couldn’t find that page. It may have been removed, renamed, or never existed.
            </p>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Try searching for listings or go back home.
            </p>
          </div>

        </section>

        {/* Right: actions */}
        <aside className="flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-gray-100/60 dark:border-gray-800/60">
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">Search listings</label>
            <div className="flex items-center gap-2">
              <input
                aria-label="Search listings"
                className="flex-1 rounded-md border px-4 py-3 text-sm bg-transparent placeholder:text-slate-400 border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="e.g. warehouse in Nairobi, retail space in Westlands"
              />
              <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white font-medium">
                <Search size={16} /> Search
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-gray-100/60 dark:border-gray-800/60 flex flex-col gap-3">
            <span className="text-sm text-slate-500 dark:text-slate-400">Quick links</span>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/" className="flex-1 inline-flex items-center justify-center gap-2 rounded-md py-3 px-4 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-medium">
                <Home size={16} /> Home
              </Link>

              <Link href="/browse" className="flex-1 inline-flex items-center justify-center gap-2 rounded-md py-3 px-4 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium">
                <Search size={16} /> Browse spaces
              </Link>
            </div>

            <Link href="/dashboard" className="mt-3 inline-flex items-center gap-2 text-sm text-primary font-semibold">
              <LayoutDashboard size={14} /> Go to my dashboard
            </Link>
          </div>

          <p className="mt-4 text-xs text-slate-400">If you think this is an error, contact <a href="mailto:support@vacantspaces.kenya" className="text-primary underline">support</a>.</p>
        </aside>
      </div>
    </main>
  );
}
