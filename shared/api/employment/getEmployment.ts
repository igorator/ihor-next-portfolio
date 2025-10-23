import type { Locale } from "next-intl";

export const getEmployment = async (locale: Locale = "en") => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/employment?locale=${locale}`,
  );
  if (!res.ok) throw new Error("Failed to fetch employment data");
  return res.json();
};
