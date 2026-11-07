import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '../context/AppContext';

export const metadata: Metadata = {
  title: 'CrateCraft — Curated Monthly Grocery & Mindful Ritual Crates',
  description: 'Curate your monthly ritual crate with single-origin coffees, rare mountain teas, organic pantry staples, raw forest honeys, and restorative botanicals. 100% zero single-use plastic.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23283E2E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z'/><path d='m3.3 7 8.7 5 8.7-5'/><path d='M12 22V12'/></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F8F9FA] text-[#111827] antialiased selection:bg-[#FF5B26] selection:text-white min-h-screen flex flex-col font-sans">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
