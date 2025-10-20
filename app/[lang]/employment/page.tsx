import { getEmployment } from "@/server/services/employment.service";
import { EmploymentSection } from "@/shared/components/pages/Employment/Employment";

export default async function Employment({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const employmentHistory = await getEmployment(lang);

  return <EmploymentSection employmentHistory={employmentHistory} />;
}
