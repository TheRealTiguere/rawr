import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'RAWRAGENCY - Agence Web Créative',
    short_name: 'RAWRAGENCY',
    description: 'Agence web spécialisée dans la création de sites web modernes, e-commerce et applications web sur mesure.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f0f14',
    theme_color: '#f59e0b',
    icons: [
      {
        src: '/logo-rawr.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
    categories: ['business', 'productivity'],
    lang: 'fr',
    dir: 'ltr',
  }
}
