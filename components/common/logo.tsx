import Image from "next/image";
import Link from "next/link";

import logo from "@/public/logos/logo1.png";

export default function Logo({ link }: { link?: boolean }) {
  return (
    <>
      {link ? (
        <Link href="/">
          <Image src={logo} alt="vetterhands logo" width={48} />
        </Link>
      ) : (
        <Image src={logo} alt="vetterhands logo" width={48} />
      )}
    </>
  );
}
