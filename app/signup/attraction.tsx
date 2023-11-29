import Image from "next/image";
import logo from "@/public/logos/logo3.jpg";

export default function Attraction() {
  return (
    <section className="relative w-1/2">
      <Image src={logo} alt="vetter hands logo" fill className="object-cover" />
    </section>
  );
}
