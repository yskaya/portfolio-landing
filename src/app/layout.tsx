import type { Metadata } from "next";
import "./globals.css";
import { DataProvider } from "./context/DataContext";
import { NavProvider } from "./components/Nav/NavContext";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kanapatskaya.me';
const siteName = "Portfolio. Yulia Kanapatskaya";
const siteDescription = "Full-stack web engineering with deep Frontend expertise, focused on building scalable platforms and shared systems through hands-on execution and long-term technical ownership";

export const metadata: Metadata = {
  title: siteName,
  description: siteDescription,
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: siteUrl,
    siteName: siteName,
    images: [
      {
        url: `${siteUrl}/T__08280.JPG`,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
    images: [`${siteUrl}/T__08280.JPG`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DataProvider>
          <NavProvider>{children}</NavProvider>
        </DataProvider>
      </body>
    </html>
  );
}
