// app/(admin)/not-found.tsx
'use client';

import Link from 'next/link';
import { Settings, FileText, Box, ArrowLeft } from 'lucide-react';

export default function AdminNotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 p-8">
      <div className="w-full max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-gray-100/60 dark:border-gray-800/60 p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center gap-6">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white">Admin — page not found</h1>
          <p className="text-slate-600 dark:text-slate-300">
            The admin panel can’t find the page you requested. It may have been removed or you might not have permission.
          </p>

          <div className="flex gap-3 mt-4">
            <Link href="/admin" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-medium">
              <ArrowLeft size={16} /> Admin Home
            </Link>

            <Link href="/admin/listings" className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium">
              <FileText size={16} /> Manage Listings
            </Link>
          </div>

          <div className="mt-6 text-sm text-slate-500 dark:text-slate-400">
            <strong>Need to check logs?</strong> Use the system logs or audit trail to trace recent activity.
          </div>
        </div>

        <aside className="flex flex-col justify-center gap-6">
          <div className="p-6 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/10">
            <h3 className="text-lg font-semibold text-primary dark:text-white">Admin tools</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Quick access for admin tasks</p>

            <ul className="mt-4 grid gap-3">
              <li>
                <Link href="/admin/users" className="flex items-center gap-3 rounded-md p-3 bg-white dark:bg-slate-800 border border-gray-100 dark:border-gray-800">
                  <Settings size={18} /> Manage users
                </Link>
              </li>
              <li>
                <Link href="/admin/reports" className="flex items-center gap-3 rounded-md p-3 bg-white dark:bg-slate-800 border border-gray-100 dark:border-gray-800">
                  <Box size={18} /> Reports & exports
                </Link>
              </li>
            </ul>
          </div>

          <p className="text-xs text-slate-400">If this page should exist, verify routes or rollback recent admin changes.</p>
        </aside>
      </div>
    </main>
  );
}
