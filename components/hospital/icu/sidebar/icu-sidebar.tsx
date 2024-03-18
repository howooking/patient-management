import IcuPatientsList from "./icu-patients-list";

export default async function IcuSidebar() {
  return (
    <div className="w-32 h-[calc(100vh-48px)] border-r border-input fixed">
      <IcuPatientsList />
    </div>
  );
}
