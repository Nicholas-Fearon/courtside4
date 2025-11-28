import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "My Dashboard",
  description: "My Personal Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Navigation Bar */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo/Brand */}
              <Link
                href="/"
                className="flex items-center gap-2 text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
                NBA Dashboard
              </Link>

              {/* Navigation Links */}
              <div className="flex items-center gap-8">
                <Link
                  href="/"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Home
                </Link>
                {<Link 
                  href="/about" 
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  About
                </Link>}
                {<Link 
                  href="/contact" 
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Contact
                </Link>}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        {children}
      </body>
    </html>
  );
}
