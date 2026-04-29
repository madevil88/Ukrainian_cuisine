import { FC } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth/auth";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

const ProtectedLayout: FC<ProtectedLayoutProps> = async ({ children }) => {
  const session = await auth();

  if (!session) {
    redirect("/error?message=Insufficient+permissions");
  }

  return <>{children}</>;
};

export default ProtectedLayout;
