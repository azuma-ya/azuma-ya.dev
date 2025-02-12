import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";

import { cn } from "@repo/ui/lib/utils";

import "./globals.css";
import SheetProvider from "@/providers/sheet-provider";
import { ThemeProvider } from "@/providers/theme-provider";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  title: "Azuma-ya's Blog Editor",
  description:
    "Azuma-ya ブログの Web エディターです。github 連携で記事を書くことができます。",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: "Azuma-ya's Blog Editor",
    description:
      "Azuma-ya ブログの Web エディターです。github 連携で記事を書くことができます。",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html
      lang="ja"
      suppressHydrationWarning
      className="scroll-pt-(--header-height) scroll-smooth"
    >
      <body
        suppressHydrationWarning
        className={cn(notoSansJP.className, "antialiased")}
      >
        <ThemeProvider>
          <SheetProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
