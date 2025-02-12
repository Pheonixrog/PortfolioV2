import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/ui/Navbar/navbar";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';
import Footer from "../components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rishabh | Full-Stack Developer",
  description: "Portfolio of Rishabh, a skilled MERN stack and Next.js developer.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className={inter.className}>
        <Navbar   />

        {children}
        <Footer/>
        <Analytics />
        <SpeedInsights />

      </body>
    </html>
  );
}
