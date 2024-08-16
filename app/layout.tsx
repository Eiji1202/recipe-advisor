import type { Metadata } from "next";
import { Murecho } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";
import { Toaster } from "@/components/ui/toaster";

const murecho = Murecho({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteConfig.url,
    title: siteConfig.name,
    siteName: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.authors[0].name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      suppressHydrationWarning
    >
      <body
        className={cn(
          murecho.className,
          "min-h-dvh flex flex-col overflow-hidden"
        )}
      >
        <Header />
        <main className="flex-1 relative">
          <div className="absolute inset-0 bg-wallpaper-auth bg-cover bg-center bg-fixed" />
          <div className="absolute inset-0 flex items-center justify-center overflow-auto min-h-[calc(100vh-64px)]">
            {children}
          </div>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
