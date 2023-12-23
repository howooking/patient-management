import { usePathname } from "next/navigation";

export default function useCurrentHospitalId() {
  const pathname = usePathname();
  const hospitalId = pathname.split("/")[2];

  return hospitalId;
}
