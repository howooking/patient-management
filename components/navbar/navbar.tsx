import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { createClient } from "@/utils/supabase/server";
import AvatarDropdown from "./avatar-dropdown";
import { ToggleTheme } from "./toggle-theme";
import { Button } from "../ui/button";

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
    return redirect("/login");
  };

  if (sessionError) {
    throw new Error(sessionError.message);
  }

  return (
    <header className="bg-muted h-12 fixed w-full">
      <nav className="container flex items-center justify-between h-12">
        <Link href="/" className="hover:scale-[0.98] transition">
          홈
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
            <Link href="/login">
              <Button size="sm">로그인</Button>
            </Link>
          )}
          <ToggleTheme />
        </div>
      </nav>
    </header>
  );
}
