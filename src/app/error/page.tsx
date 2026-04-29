"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

const ErrorMessage = () => {
  const searchParams = useSearchParams();
  const message = searchParams.get("message") || "Unknown error";

  return <p className="text-red-500 text-xl">{message}</p>;
};

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center">
      <Suspense fallback={<p className="text-xl">Loading...</p>}>
        <ErrorMessage />
      </Suspense>
    </div>
  );
};

export default ErrorPage;
