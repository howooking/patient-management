import { Nanum_Gothic } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";

const font = Nanum_Gothic({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "입원환자관리",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={font.className}>
      <body className="bg-background text-foreground">
        <Navbar />
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
