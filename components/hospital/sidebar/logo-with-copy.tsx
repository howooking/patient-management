import Image from "next/image";
import logoWithCopy from "@/public/logos/logo2.png";

export default function LogoWithCopy() {
  return (
    <Image
      src={logoWithCopy}
      alt="logo with copy"
      height={48}
      priority
      quality={10}
      sizes="179px"
    />
  );
}
