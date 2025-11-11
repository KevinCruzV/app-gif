import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GIF Explorer',
  description: 'Picnic recruitment task implementation built with Next.js'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>
          <div className="container">{children}</div>
        </main>
      </body>
    </html>
  );
}
