import type { Metadata, Viewport } from 'next';
import './globals.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: '感染制御クイズ',
  description: '感染制御認定士講座の試験対策4択クイズ',
  applicationName: '感染制御クイズ',
  manifest: `${basePath}/manifest.webmanifest`,
  icons: {
    icon: [
      { url: `${basePath}/favicon-32.png`, sizes: '32x32', type: 'image/png' },
      { url: `${basePath}/favicon-48.png`, sizes: '48x48', type: 'image/png' },
      { url: `${basePath}/icon-192.png`, sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: `${basePath}/apple-touch-icon.png`, sizes: '180x180', type: 'image/png' }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '感染制御クイズ',
  },
  openGraph: {
    title: '感染制御クイズ',
    description: '講義資料の重要ポイントを4択で反復できる試験対策クイズ',
    type: 'website',
    locale: 'ja_JP',
    images: [{ url: `${basePath}/og.png`, width: 1734, height: 911, alt: '感染制御クイズ' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '感染制御クイズ',
    description: '講義資料の重要ポイントを4択で反復できる試験対策クイズ',
    images: [`${basePath}/og.png`],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0b4f5f',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
