import { GoogleAnalytics } from "@next/third-parties/google";
import { Noto_Sans_JP } from "next/font/google";

import { cn } from "@repo/ui/lib/utils";

import { Footer } from "@/components/base/footer";
import { Header } from "@/components/base/header";
import { getInfo } from "@/features/profile/lib/get-info";
import SheetProvider from "@/providers/sheet-provider";
import { ThemeProvider } from "@/providers/theme-provider";

import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const generateMetadata = () => {
  const info = getInfo();

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
    title: info.portfolio.title,
    description: info.portfolio.description,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      title: info.portfolio.title,
      description: info.portfolio.description,
    },
  };
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
      <head>
        <link
          rel="alternate"
          type="application/xml"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/feed.xml`}
        />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "undefined"} />
      </head>
      <body
        suppressHydrationWarning
        className={cn(notoSansJP.className, "antialiased")}
      >
        <ThemeProvider>
          <SheetProvider />
          <div className="min-h-screen">
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
