import { type Locale, NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/shared/state/providers/theme-provider";
import { ThemeSetup } from "@/shared/components/features/Theme/ThemeSetup";
import { Navbar } from "@/shared/components/widgets/Navbar/Navbar";
import { AppBackground } from "@/shared/components/layout/AppBackground/AppBackground";

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
