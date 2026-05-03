import { getTranslations } from "next-intl/server";
import { AppBackground } from "@/shared/ui/AppBackground/AppBackground";
import { NotFoundSection } from "@/views/not-found/NotFoundSection";

export default async function AppNotFound() {
  const t = await getTranslations("notFound");

  return (
    <>
      <AppBackground />
      <NotFoundSection title={t("title")} backHome={t("backHome")} />
    </>
  );
}
