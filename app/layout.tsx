import type { Metadata } from "next";
import { Murecho } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Header from "@/components/original/layout/Header";
import { Toaster } from "@/components/shadcn-ui/toaster";
import { Suspense } from "react";
import { Loader } from "lucide-react";

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
          <div className="absolute inset-0 flex items-start justify-center overflow-auto">
            <Suspense fallback={<Loader className="animate-spin"/>}>
              {children}
            </Suspense>
          </div>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
