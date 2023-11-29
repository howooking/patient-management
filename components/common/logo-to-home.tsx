import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logos/logo1.png";

export default function LogoToHome() {
  return (
    <Link href="/">
      <Image src={logo} alt="vetterhands logo" width={48} />
    </Link>
  );
}
