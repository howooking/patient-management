import Image from "next/image";
import logo from "@/public/logos/logo1.png";

export default function LoadingLogo() {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col animate-pulse">
      <Image src={logo} alt="loading" width={40} />
      <p className="text-primary font-bold text-sm">Loading...</p>
    </div>
  );
}
