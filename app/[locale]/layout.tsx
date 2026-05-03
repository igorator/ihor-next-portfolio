import { type Locale, NextIntlClientProvider } from "next-intl";
import { AppBackground } from "@/shared/ui/AppBackground/AppBackground";
import { MobileHiddenMenuButton } from "@/widgets/mobile-hidden-menu/MobileHiddenMenuButton/MobileHiddenMenuButton";
import { Navbar } from "@/widgets/navbar/Navbar";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AppBackground />
      <MobileHiddenMenuButton />
      <Navbar />
      <main className="page-wrapper">
        <div className="content">{children}</div>
      </main>
    </NextIntlClientProvider>
  );
}
