import type { Metadata } from "next";
import { Exo } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import MySession from "@/components/MySession/MySession";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

const exo = Exo({ subsets: ["latin"], variable: "--font-exo" });

export const metadata: Metadata = {
  title: "Fresh Cart",
  description: "Fresh Cart - Your online grocery store",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", exo.variable)}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased flex flex-col min-h-screen" suppressHydrationWarning>
        <Toaster />
        <MySession>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </MySession>
        <SpeedInsights />
      </body>
    </html>
  );
}
