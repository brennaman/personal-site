import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { HomeRainOverlay } from "@/components/home-rain-overlay";
import { HomeWeather } from "@/components/home-weather";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal Site",
  description: "A personal site built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <ThemeProvider>
          <HomeRainOverlay />
          <header className="border-b border-border">
            <nav className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <HomeWeather compact />
                <Link href="/" className="font-medium hover:text-muted-foreground transition-colors">
                  Home
                </Link>
              </div>
              <div className="flex items-center gap-6">
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
                <Link href="/lab" className="text-muted-foreground hover:text-foreground transition-colors">
                  Lab
                </Link>
                <ThemeToggle />
              </div>
            </nav>
          </header>
          <main className="max-w-3xl mx-auto px-6 py-12">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
