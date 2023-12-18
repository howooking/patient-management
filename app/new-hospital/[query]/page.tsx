import Attraction from "@/components/common/attraction";
import FormTabs from "@/components/hospital/new-hospital/form-tabs";

export default async function NewHospital({
  params,
}: {
  params: { query: "search" | "real" | "virtual" };
}) {
  return (
    <div className="flex w-full h-screen">
      <Attraction />
      <FormTabs query={params.query} />
    </div>
  );
}
