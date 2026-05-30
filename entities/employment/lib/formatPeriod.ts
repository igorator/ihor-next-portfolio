import type { Employment } from "../types";

type DateFormatter = (date: Date) => string;

export const formatPeriod = (
  emp: Employment,
  formatDate: DateFormatter,
  present: string,
): string | null => {
  if (emp.period) return emp.period;
  if (!emp.startDate) return null;

  const toDate = (str: string): Date | null => {
    const [year, month] = str.split("-").map(Number);
    if (!year || !month || isNaN(year) || isNaN(month)) return null;
    return new Date(year, month - 1, 1);
  };

  const safeFormat = (str: string): string | null => {
    const date = toDate(str);
    if (!date || isNaN(date.getTime())) return null;
    try {
      return formatDate(date);
    } catch {
      return null;
    }
  };

  const startStr = safeFormat(emp.startDate);
  if (!startStr) return null;
  if (!emp.endDate) return startStr;
  if (emp.endDate === "present") return `${startStr} - ${present}`;
  const endStr = safeFormat(emp.endDate);
  return endStr ? `${startStr} - ${endStr}` : startStr;
};
