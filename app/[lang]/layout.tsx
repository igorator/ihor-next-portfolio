import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/shared/state/providers/theme-provider";
import { ThemeSetup } from "@/shared/components/features/Theme/ThemeSetup";
import { Navbar } from "@/shared/components/widgets/Navbar/Navbar";
import { AppBackground } from "@/shared/components/layout/AppBackground/AppBackground";
import { NextIntlClientProvider } from "next-intl";
import type { Locale } from "next-intl";

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

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return (
      <html lang={locale} suppressHydrationWarning>
        <body className={`${fontHeading.variable} ${fontText.variable}`}>
          <NextIntlClientProvider locale={locale}>
            <ThemeProvider>
              <ThemeSetup />
              <AppBackground />
              <Navbar />
              <main className="page-wrapper">
                <div className="content">{children}</div>
              </main>
            </ThemeProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    );
  }
}
