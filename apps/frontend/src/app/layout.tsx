import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import { env } from '@/env';

import '@/styles/globals.css';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  preload: false,
  display: 'swap',
  fallback: ['Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'sans-serif'],
});

export const metadata: Metadata = {
  title: '●●●●●',
  description: '●●●●●',
  keywords: ['●●●●●', '●●●●●', '●●●●●'],
  openGraph: {
    title: '●●●●●',
    description: '●●●●●',
    url: '●●●●●',
    siteName: '●●●●●',
  },
  robots: {
    index: !env.DEBUG, // falseでnoindex
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html
    lang="ja"
    className={notoSansJP.className}
  >
    <body>{children}</body>
  </html>
);

export default RootLayout;
