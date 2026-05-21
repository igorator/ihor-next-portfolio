import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { MobileHiddenMenuButton } from "@/widgets/mobile-hidden-menu/MobileHiddenMenuButton/MobileHiddenMenuButton";
import { Navbar } from "@/widgets/navbar/Navbar";
import { ScrollToTop } from "@/widgets/scroll-to-top/ScrollToTop";
import { NotFoundSection } from "@/views/not-found/NotFoundSection";

export default async function AppNotFound() {
  const t = await getTranslations("notFound");

  return (
    <NextIntlClientProvider>
      <MobileHiddenMenuButton />
      <Navbar />
      <ScrollToTop />
      <main className="page-wrapper">
        <NotFoundSection title={t("title")} />
      </main>
    </NextIntlClientProvider>
  );
}
