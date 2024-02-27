import { Nanum_Gothic } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/common/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import TanstackProvider from "@/components/common/tanstack-provider";

const font = Nanum_Gothic({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Vetterhands",
  description: "수의사 전문 웹차트 서비스",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning className="!scroll-smooth">
      <body
        className={cn(
          "antialiased bg-background text-foreground",
          font.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TanstackProvider>{children}</TanstackProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
