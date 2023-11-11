import Link from "next/link";
import { Button } from "../ui/button";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import mainLogo from "@/public/vetter hands.png";
import AvatarDropdown from "./avatar-dropdown";
import { CiLogout } from "react-icons/ci";

export default async function Navbar() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return (
    <header className="bg-muted border-b-2">
      <div className="px-10 max-w-7xl mx-auto flex items-center justify-between h-12">
        <Link href="/" className="hover:scale-[0.98] transition">
          <Image src={mainLogo} alt="main logo" width={150} priority />
        </Link>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <AvatarDropdown
                fallback={user.user_metadata.name.slice(0, 2)}
                src={user?.user_metadata.avatar_url}
                email={user?.email ?? ""}
              />
              <form action={signOut}>
                <Button variant="outline" size="icon" className="rounded-full">
                  <CiLogout />
                </Button>
              </form>
            </>
          ) : (
            <Link href="/login">
              <Button size="sm">로그인</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
