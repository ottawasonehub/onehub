import type { Metadata } from 'next';
import Link from 'next/link';
import { about } from '@/content/en/about';

export const metadata: Metadata = {
  title: about.meta.title,
  description: about.meta.description,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
          {about.heading}
        </h1>
        <p className="text-lg text-slate-700 leading-relaxed">{about.intro}</p>
        <p className="mt-6 text-slate-700 leading-relaxed">{about.mission}</p>
        <p className="mt-8 text-slate-600">
          {about.cta}{' '}
          <Link href="/add" className="text-brand font-medium hover:text-brand-hover transition-colors">
            Add your business
          </Link>
        </p>
      </div>
    </div>
  );
}
