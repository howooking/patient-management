import Link from "next/link";

import AvatarDropdown from "./avatar-dropdown";
import { ToggleTheme } from "./toggle-theme";
import { Button } from "../ui/button";
import SigninSignupDialog from "./signin-signup-dialog";
import Logo from "../common/logo";
import createSupabaseServerClient from "@/lib/supabase/server";

export default async function Navbar() {
  const supabase = await createSupabaseServerClient();

  const { data: vet } = await supabase
    .from("vets")
    .select("vet_email, vet_name, license_approved, default_hos_id, avatar_url")
    .single();

  return (
    <header className="fixed w-full">
      <nav className="container flex items-center justify-between h-16">
        <Logo link />
        <div className="flex items-center gap-2">
          {vet ? (
            <>
              {vet.license_approved && (
                <AvatarDropdown
                  fallback={vet.vet_name.slice(0, 2)}
                  src={vet.avatar_url}
                  email={vet.vet_email}
                />
              )}
            </>
          ) : (
            <>
              {NAV_PAGES.map((page) => (
                <Button key={page.title} asChild variant="ghost">
                  <Link href={page.href}>{page.title}</Link>
                </Button>
              ))}
              <SigninSignupDialog signin />
              <SigninSignupDialog />
            </>
          )}
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
