"use client";

import Image from "next/image";
import { Link, Button, useOverlayState } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/config/site.config";
import { layoutConfig } from "@/config/layout.config";
import RegistrationModal from "../modals/registration.modal";
import LoginModal from "../modals/login.modal";
import { useAuthStore } from "@/store/auth.store";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const registrationState = useOverlayState();
  const loginState = useOverlayState();
  const pathName = usePathname();

  const { data: session, status } = useSession();
  const isAuth = status === "authenticated";
  const { setAuthState } = useAuthStore();
  const router = useRouter();

  const handleSignOut = async () => {
    setAuthState("unauthenticated", null);
    await signOut({ redirect: false });
    router.refresh();
  }

  const authContent = isAuth ? (
    <>
      <p>Welcome, {session?.user?.email}!</p>
      <Button onPress={handleSignOut}>Log Out</Button>
    </>
  ) : (
    <>
      <Button onPress={loginState.open}>Log In</Button>
      <Button onPress={registrationState.open}>Sign Up</Button>
    </>
  );

  const getNavItems = () => {
    return siteConfig.navItems
      .filter((item) => {
        if (item.href === "/ingredients") {
          return isAuth;
        }
        return true;
      })
      .map((item) => {
        const isActive = pathName === item.href;
        return (
          <li key={item.href}>
            <Link href={item.href} className={`px-3 py-1
                  ${isActive ? "text-blue-500" : "text-foreground"}
                  border border-transparent rounded-md
                  hover:text-blue-300 hover:border-blue-300
                  transition-colors
                  duration-200
                  no-underline
                `}>
              {item.label}
            </Link>
          </li>
        );
      });
  };

  return (
    <nav
      style={{ height: layoutConfig.headerHeight }}
      className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <div className="mx-auto flex h-full items-center px-6">
        <div className="flex items-center gap-4 mr-2.5">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-1">
              <Image
                src="/logo.png" alt={`${siteConfig.title} logo`}
                width={225}
                height={357}
                className="h-8 w-8"
                priority />
              <p className="font-bold">{siteConfig.title}</p>
            </Link>
          </div>
        </div>

        <ul className="hidden items-center gap-4 md:flex">
          {getNavItems()}
        </ul>
        <div className="hidden items-center gap-4 ml-auto md:flex">
          {status === 'loading' ? <p>Loading...</p> : authContent}
        </div>
      </div>
      <RegistrationModal state={registrationState} />
      <LoginModal state={loginState} />
    </nav>
  );
};

export default Header;
