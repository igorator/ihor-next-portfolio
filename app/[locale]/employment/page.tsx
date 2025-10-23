import { getEmployment } from "@/shared/api/employment/getEmployment";
import { EmploymentSection } from "@/shared/components/pages/Employment/Employment";

export default async function Employment({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const employmentHistory = await getEmployment(locale);

  return <EmploymentSection employmentHistory={employmentHistory} />;
}
