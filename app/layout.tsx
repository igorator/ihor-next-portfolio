import "./globals.css";
import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Inter, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing } from "@/i18n/routing";
import { AppPortal } from "@/shared/portals/AppPortal";
import { AppBackground } from "@/shared/ui/Background/AppBackground";
import { siteConfig } from "@/shared/config/site";

type ThemeSetting = "light" | "dark" | "system";
const THEME_COOKIE = "theme";

const fontHeading = Manrope({
  variable: "--font-headings",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});
const fontText = Inter({
  variable: "--font-text",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    images: [{ url: siteConfig.og.image }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.og.image],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value ?? routing.defaultLocale;
  const theme =
    (cookieStore.get(THEME_COOKIE)?.value as ThemeSetting) ?? "system";

  const htmlAttrs =
    theme === "system" ? {} : ({ "data-theme": theme } as const);

  return (
    <html lang={locale} {...htmlAttrs} suppressHydrationWarning>
      <body className={`${fontHeading.variable} ${fontText.variable}`}>
        <AppBackground />
        <Analytics />
        <SpeedInsights />
        {children}
        <AppPortal />
      </body>
    </html>
  );
}
