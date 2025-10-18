import { getEmployment } from "@/server/services/employment.service";
import { EmploymentSection } from "@/shared/components/pages/Employment/Employment";

export default async function Employment() {
  const employmentHistory = await getEmployment();

  return <EmploymentSection employmentHistory={employmentHistory} />;
}
