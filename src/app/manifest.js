export default function manifest() {
  return {
    name: 'Kardeşler Kebap & Pide',
    short_name: 'Kardeşler',
    description: 'Authentic Turkish cuisine in the heart of Cihangir.',
    start_url: '/',
    display: 'standalone',
    background_color: '#181009',
    theme_color: '#181009',
    icons: [
      {
        src: '/logo.webp', // Using the existing logo
        sizes: '192x192 512x512',
        type: 'image/webp',
      },
    ],
  }
}
