import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';
import { Montserrat, Playfair_Display } from 'next/font/google';
import './globals.css';
import { NavWrapper } from '@/app/components/NavWrapper';
import { ChatAssistant } from '@/app/components/ChatAssistant';
import { common } from '@/content/en/common';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: '400',
});

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair-display',
  subsets: ['latin'],
  weight: '400',
});

const playfairDisplayItalic = Playfair_Display({
  variable: '--font-playfair-display-italic',
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
});

export const metadata: Metadata = {
  title: common.siteTitle,
  description: common.siteDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${montserrat.variable} ${playfairDisplay.variable} ${playfairDisplayItalic.variable} antialiased min-h-screen bg-surface text-black font-sans`}
      >
        <Suspense fallback={null}>
          <NavWrapper />
        </Suspense>
        <main className="pt-20">{children}</main>
        <ChatAssistant />
        <Analytics />
      </body>
    </html>
  );
}
