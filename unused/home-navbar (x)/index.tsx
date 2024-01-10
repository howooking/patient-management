import Link from "next/link";
import { Button } from "../../components/ui/button";
import SigninSignupDialog from "./signin-signup-dialog";
import Logo from "../../components/common/logo";
import { NAV_MENUS } from "@/constants/menus";

export default function HomeNavbar() {
  return (
    <header className="fixed w-full">
      <nav className="container flex items-center justify-between h-16">
        <Logo link />
        <div className="flex items-center gap-2">
          {NAV_MENUS.map((menu) => (
            <Button
              key={menu.title}
              asChild
              variant="ghost"
              className="text-sm"
            >
              <Link href={menu.href}>{menu.title}</Link>
            </Button>
          ))}

          {/* 로그인 */}
          <SigninSignupDialog signin />

          {/* 회원가입 */}
          <SigninSignupDialog />
        </div>
      </nav>
    </header>
  );
}
