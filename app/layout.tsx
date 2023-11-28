import { Nanum_Gothic } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const font = Nanum_Gothic({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Vetterhands",
  description: "수의사 전문 웹차트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "antialiased bg-background text-foreground",
          font.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />

          <main className="pt-12 container min-h-screen flex flex-col">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
