import { cn } from "@repo/ui/lib/utils";
import { Noto_Sans_JP } from "next/font/google";

import { Header } from "@/components/base/header";
import SheetProvider from "@/providers/sheet-provider";
import { ThemeProvider } from "@/providers/theme-provider";

import "./globals.css";
import { Footer } from "@/components/base/footer";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const metadata = {
  title: "Azuma-ya's Portfolio",
  description:
    "Software Engineer Azuma-ya のポートフォリオサイトです。経歴やスキル、作品一覧等を掲載しています。",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ja" suppressHydrationWarning>
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
