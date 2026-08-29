import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return {
    name: '感染制御クイズ',
    short_name: '感染制御クイズ',
    description: '感染制御認定士講座の試験対策4択クイズ',
    start_url: `${basePath}/`,
    display: 'standalone',
    background_color: '#f5f1e8',
    theme_color: '#0b5967',
    orientation: 'portrait',
    lang: 'ja',
    icons: [
      {
        src: `${basePath}/icon-192.png`,
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: `${basePath}/icon-512.png`,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
