import './globals.css';
import type { Metadata } from 'next';
import { Fredoka } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Providers } from './providers';

const fredoka = Fredoka({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka'
});

export const metadata: Metadata = {
  title: 'MoodJukebox - Music for Your Mood',
  description: 'Discover music tailored to your current mood',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fredoka.variable} font-fredoka`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow flex flex-col">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}