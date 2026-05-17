'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { nav } from '@/content/en/nav';
import { common } from '@/content/en/common';

const linkClass =
  'text-brand hover:text-brand-hover px-3 py-2 text-sm font-medium transition-all duration-200';
const linkClassActive =
  'text-brand px-3 py-2 text-sm font-semibold border-b-2 border-brand transition-all duration-200';

function normalizePath(path: string): string {
  const p = (path ?? '').replace(/#.*$/, '').replace(/\/+$/, '') || '/';
  return p || '/';
}

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const currentPath = normalizePath(pathname ?? '');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const params = new URLSearchParams(window.location.search);
    setSearchQuery(params.get('q') ?? '');
  }, [mounted, pathname]);

  const isActive = (item: (typeof nav.links)[number]) => {
    const matchPath = normalizePath('path' in item ? (item as { path: string }).path : item.href);
    return currentPath === matchPath;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    setMobileOpen(false);
    if (q) {
      router.push(`/?q=${encodeURIComponent(q)}#businesses`);
    } else {
      router.push('/');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-surface/90 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center gap-4">
          <Link
            href="/"
            className="group flex items-baseline text-2xl tracking-tight text-ink hover:opacity-80 transition-opacity py-2 px-1 -mx-1 rounded focus:outline-none focus:ring-2 focus:ring-brand/30"
            aria-label={common.logo.ariaLabel}
            onClick={() => setMobileOpen(false)}
          >
            <span className="logo-wordmark-one">{common.logo.one}</span>
            <span className="logo-wordmark-hub">{common.logo.hub}</span>
          </Link>

          {/* Search — desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden sm:flex flex-1 max-w-xs lg:max-w-sm mx-4"
            role="search"
          >
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={nav.search.placeholder}
              className="w-full px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand text-sm"
              aria-label={nav.search.ariaLabel}
            />
            <button
              type="submit"
              className="ml-2 p-2 rounded-full bg-brand text-white hover:bg-brand-hover transition-colors shrink-0"
              aria-label={nav.search.submitAriaLabel}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>

          {/* Desktop nav */}
          <div key={currentPath} className="hidden lg:flex items-center gap-2">
            {nav.links.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={active ? linkClassActive : linkClass}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href={nav.cta.href}
              className="ml-2 px-4 py-2 text-sm font-semibold rounded-full bg-brand text-white hover:bg-brand-hover transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {nav.cta.label}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-brand hover:bg-brand/10 transition-colors"
            aria-label={nav.mobileToggleAriaLabel}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile panel */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-200 ease-out ${
            mobileOpen ? 'max-h-[320px] opacity-100' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!mobileOpen}
        >
          <div key={currentPath} className="py-4 border-t border-slate-200 flex flex-col gap-1">
            <form onSubmit={handleSearch} className="pb-3 border-b border-slate-200" role="search">
              <div className="flex gap-2">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={nav.search.placeholder}
                  className="flex-1 px-4 py-2.5 rounded-full border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/30 text-sm"
                  aria-label={nav.search.ariaLabel}
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-full bg-brand text-white hover:bg-brand-hover transition-colors shrink-0"
                  aria-label={nav.search.submitAriaLabel}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
            {nav.links.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={(active ? linkClassActive : linkClass) + ' block py-3'}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href={nav.cta.href}
              className="mt-2 block text-center px-4 py-3 text-sm font-semibold rounded-full bg-brand text-white hover:bg-brand-hover transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {nav.cta.label}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
