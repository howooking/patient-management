import Image from "next/image";
import Link from "next/link";

import logo from "@/public/logos/logo1.png";

export default function Logo({ link }: { link?: boolean }) {
  const imageComponent = <Image src={logo} alt="vetterhands logo" width={48} />;

  return (
    <>{link ? <Link href="/">{imageComponent}</Link> : { imageComponent }}</>
  );
}
