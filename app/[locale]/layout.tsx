import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { MobileHiddenMenuButton } from "@/widgets/mobile-hidden-menu/MobileHiddenMenuButton/MobileHiddenMenuButton";
import { Navbar } from "@/widgets/navbar/Navbar";
import { ScrollToTop } from "@/widgets/scroll-to-top/ScrollToTop";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return (
    <NextIntlClientProvider>
      <MobileHiddenMenuButton />
      <Navbar />
      <ScrollToTop />
      <main className="page-wrapper">{children}</main>
    </NextIntlClientProvider>
  );
}
