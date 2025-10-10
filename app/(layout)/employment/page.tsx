import { EmploymentSection } from "@/components/sections/Employment/Employment";
import { getEmployment } from "@/shared/api/services/employment";

export default async function Employment() {
  // getEmployment возвращает массив, поэтому просто сохраняем его в переменную
  const employmentHistory = await getEmployment();

  return <EmploymentSection employmentHistory={employmentHistory} />;
}
