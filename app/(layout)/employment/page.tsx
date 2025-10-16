import { EmploymentSection } from "@/components/sections/Employment/Employment";
import { getEmployment } from "@/lib/data";

export default async function Employment() {
  const employmentHistory = await getEmployment();

  return <EmploymentSection employmentHistory={employmentHistory} />;
}
