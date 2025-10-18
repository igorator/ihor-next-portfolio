import "./globals.css";
import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import type { Locale } from "@/shared/config/i18n/config";
import { Navbar } from "@/shared/components/widgets/Navbar/Navbar";
import { ThemeProvider } from "@/shared/state/providers/theme-provider";
import { ThemeSetup } from "@/shared/components/features/Theme/ThemeSetup";
import { AppBackground } from "@/shared/components/layout/AppBackground/AppBackground";

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

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "uk" }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang } = await params;

  return (
    <html lang={lang} suppressHydrationWarning>
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
