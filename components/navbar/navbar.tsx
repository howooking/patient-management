import Link from "next/link";

import { ToggleTheme } from "./toggle-theme";
import { Button } from "../ui/button";
import SigninSignupDialog from "./signin-signup-dialog";
import Logo from "../common/logo";

export default async function Navbar() {
  return (
    <header className="fixed w-full">
      <nav className="container flex items-center justify-between h-16">
        <Logo link />
        <div className="flex items-center gap-2">
          <>
            {NAV_PAGES.map((page) => (
              <Button key={page.title} asChild variant="ghost">
                <Link href={page.href}>{page.title}</Link>
              </Button>
            ))}
            <SigninSignupDialog signin />
            <SigninSignupDialog />
          </>
          <ToggleTheme />
        </div>
      </nav>
    </header>
  );
}

const NAV_PAGES = [
  { title: "상품", href: "/products" },
  { title: "요금제", href: "/pricing" },
  { title: "Contact", href: "/contact" },
];
