import type { Metadata, Viewport } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/site.loader";

import "./globals.css";

const fontSans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const fontSerif = Fraunces({
  subsets: ["latin"],
  variable: "--font-accent",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.site.name,
    template: `%s | ${siteConfig.site.name}`,
  },
  description: siteConfig.site.description,
  metadataBase: new URL(siteConfig.site.domain),
  openGraph: {
    title: siteConfig.site.name,
    description: siteConfig.site.description,
    url: siteConfig.site.domain,
    siteName: siteConfig.site.name,
    locale: siteConfig.site.language,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.site.themeColor,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const brandStyles = {
    ...(siteConfig.brand.primaryColor
      ? { "--brand-primary": siteConfig.brand.primaryColor }
      : {}),
    ...(siteConfig.brand.accentColor
      ? { "--brand-accent": siteConfig.brand.accentColor }
      : {}),
  } as React.CSSProperties;

  return (
    <html
      lang={siteConfig.site.language}
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontSerif.variable}`}
    >
      <body
        className="min-h-screen bg-background font-sans text-foreground antialiased"
        style={brandStyles}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
