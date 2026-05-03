"use client";

import { ErrorSection } from "@/views/error/ErrorSection";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorSection reset={reset} />;
}
