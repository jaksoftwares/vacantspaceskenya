// app/(agent)/not-found.tsx
'use client';

import Link from 'next/link';
import { MapPin, PlusCircle, ClipboardList, ArrowLeft } from 'lucide-react';

export default function AgentNotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 p-8">
      <div className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-gray-100/60 dark:border-gray-800/60 p-10">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Agent area — not found</h1>
            <p className="mt-3 text-slate-600 dark:text-slate-300">We can&apos;t find that page in the agent dashboard.</p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link href="/agent" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-100 dark:bg-slate-800 font-medium">
                <ArrowLeft size={16} /> Agent Home
              </Link>

              <Link href="/agent/listings" className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-slate-200 dark:border-slate-700 font-medium">
                <ClipboardList size={16} /> My Listings
              </Link>

              <Link href="/agent/listings/new" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-white font-medium">
                <PlusCircle size={16} /> Add listing
              </Link>
            </div>

            <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">If you believe this should exist, check that you have correct permissions or contact support.</p>
          </div>

          <div className="w-44 h-44 flex-shrink-0 rounded-xl bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center border border-gray-100/60 dark:border-gray-800/60">
            {/* small illustrative icon */}
            <MapPin size={54} className="text-primary" />
          </div>
        </div>
      </div>
    </main>
  );
}
