import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";

import { cn } from "@repo/ui/lib/utils";

import { Footer } from "@/components/base/footer";
import { Header } from "@/components/base/header";
import { SheetProvider } from "@/providers/sheet-provider";
import { ThemeProvider } from "@/providers/theme-provider";

import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  title: "Azuma-ya's Calendar",
  description: "自分の予定をリンクで公開することができます。",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: "Azuma-ya's Calendar",
    description: "自分の予定をリンクで公開することができます。",
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
          <div className="flex flex-col min-h-screen">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
