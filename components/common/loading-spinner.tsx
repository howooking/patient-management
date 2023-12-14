import Image from "next/image";
import loadingSpinner from "@/public/loading-spinner.svg";

export default function LoadingSpinner() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Image
        src={loadingSpinner}
        unoptimized
        alt="loading spinner"
        width={60}
      />
    </div>
  );
}
