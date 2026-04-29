"use client";

import { siteConfig } from "@/config/site.config";
import { usePathname } from "next/navigation";

export const Title = () => {
  const pathname = usePathname();

  const pageContent = siteConfig.pagesContent[pathname as keyof typeof siteConfig.pagesContent];

  const pageTitle = pageContent ? pageContent.title : siteConfig.title;

  return (
    <div className="w-full flex justify-center my-6">
      <h1 className="text-3xl font-bold">{pageTitle}</h1>
    </div>
  );
};