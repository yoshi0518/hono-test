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
  title: 'Hono Test',
  description: 'hono test',
  keywords: ['next', 'hono'],
  // openGraph: {
  //   title: '●●●●●',
  //   description: '●●●●●',
  //   url: '●●●●●',
  //   siteName: '●●●●●',
  // },
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
    <body>
      <div className="p-4">
        <h1 className="mb-4 text-3xl font-bold underline">Hono Test</h1>
        <div>{children}</div>
      </div>
    </body>
  </html>
);

export default RootLayout;
