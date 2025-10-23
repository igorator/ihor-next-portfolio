import { type Locale, NextIntlClientProvider } from "next-intl";
import { ThemeSetup } from "@/shared/components/widgets/ThemeSwitcher/ThemeSetup";
import { AppBackground } from "@/shared/components/layout/AppBackground/AppBackground";
import { Navbar } from "@/shared/components/widgets/Navbar/Navbar";
import { ThemeProvider } from "@/shared/state/providers/theme-provider";

export default async function LocaleLayout({
  children,
  params, // <-- Promise
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params; // <-- обязательно await

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider>
        <ThemeSetup />
        <AppBackground />
        <Navbar />
        <main className="page-wrapper">
          <div className="content">{children}</div>
        </main>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
