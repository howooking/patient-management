import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { createClient } from "@/utils/supabase/server";
import AvatarDropdown from "./avatar-dropdown";
import { ToggleTheme } from "./toggle-theme";
import { Button } from "../ui/button";
import logo from "@/public/logos/logo1.png";
import Image from "next/image";
import LoginDialog from "./login-dialog";
import SignupDialog from "./signup-dialog";

export default async function Navbar() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  const { data: vet } = await supabase
    .from("vets")
    .select("vet_id, vet_name, license_approved, default_hos_id, avatar_url")
    .eq("vet_id", session?.user.email)
    .single();

  const signOut = async () => {
    "use server";
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/");
  };

  if (sessionError) {
    throw new Error(sessionError.message);
  }

  return (
    <header className="fixed w-full">
      <nav className="container flex items-center justify-between h-16">
        <Link href="/">
          <Image src={logo} alt="vetterhands logo" width={48} />
        </Link>
        <div className="flex items-center gap-2">
          {vet ? (
            <>
              {vet.license_approved && (
                <AvatarDropdown
                  fallback={vet.vet_name.slice(0, 2)}
                  src={vet.avatar_url}
                  email={vet.vet_id}
                  signOut={signOut}
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
              <LoginDialog navbar />
              <SignupDialog navbar />
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
