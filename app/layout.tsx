import type { Metadata } from 'next';
import { I18nProvider } from '@/i18n/I18nProvider';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Client Dashboard | Portfolio-Projekt',
    template: '%s | Client Dashboard',
  },
  description:
    'Professionelles Client-Dashboard als Portfolio-Projekt. Entwickelt mit Next.js 14, React 18, TypeScript und CSS Modules. Demonstration moderner Frontend-Entwicklung.',
  keywords: [
    'Next.js',
    'React',
    'TypeScript',
    'Dashboard',
    'Portfolio',
    'Frontend Development',
    'CSS Modules',
  ],
  authors: [{ name: 'Daniel' }],
  creator: 'Daniel',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    title: 'Client Dashboard - Portfolio-Projekt',
    description: 'Modernes Client-Dashboard entwickelt mit Next.js, React und TypeScript',
    siteName: 'Client Dashboard',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress external extension errors
              window.addEventListener('error', function(e) {
                if (e.filename && (e.filename.includes('extension') || e.filename.includes('chrome-extension'))) {
                  e.preventDefault();
                }
              });
              window.addEventListener('unhandledrejection', function(e) {
                if (e.reason && e.reason.message && e.reason.message.includes('checkout')) {
                  e.preventDefault();
                }
              });
            `,
          }}
        />
      </head>
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
