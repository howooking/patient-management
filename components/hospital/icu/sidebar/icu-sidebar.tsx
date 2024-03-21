import SelectedDatePatientList from "./selected-date-patients-list";

export default function IcuSidebar() {
  return (
    <div className="w-32 h-[calc(100vh-48px)] border-r border-input fixed">
      <SelectedDatePatientList />
    </div>
  );
}
