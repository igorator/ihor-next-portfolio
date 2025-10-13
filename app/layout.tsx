import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { ThemeSetup } from "@/components/theme/theme-setup";
import "./globals.css";
import { Navbar } from "@/components/common/Navbar/Navbar";
import { ThemeProvider } from "@/shared/state/providers/theme-provider";
import { AppBackground } from "@/components/layout/AppBackground/AppBackground";

const fontHeading = Manrope({
  variable: "--font-headings",
  subsets: ["latin"],
});

const fontText = Inter({
  variable: "--font-text",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ihor's Portfolio",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontHeading.variable} ${fontText.variable}`}>
        <ThemeProvider>
          <ThemeSetup />
          <AppBackground />
          <Navbar />
          <main className="page-wrapper">
            <div className="content">{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
