export const getTechnologies = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/technologies`);
  if (!res.ok) throw new Error("Failed to fetch technologies");
  return res.json();
};
