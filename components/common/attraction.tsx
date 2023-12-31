import Image from "next/image";

import logo from "@/public/logos/logo3.jpg";

export default function Attraction() {
  return (
    <section className="relative w-1/2">
      <Image
        src={logo}
        priority
        alt="vetter hands logo with copy"
        fill
        className="object-cover"
        sizes="50vw"
      />
    </section>
  );
}
