import OptionButton from "@/components/hospital/new-hospital/option-button";
import { FaMagnifyingGlass, FaHospital, FaHospitalUser } from "react-icons/fa6";

export default function SpacePage() {
  return (
    <div className="h-screen flex justify-center items-center mx-auto gap-8">
      {ADD_OPTIONS.map((option) => (
        <OptionButton
          key={option.title}
          title={option.title}
          desc={option.desc}
          icon={option.icon}
        />
      ))}
    </div>
  );
}

const ADD_OPTIONS = [
  {
    icon: FaMagnifyingGlass,
    title: "병원 검색",
    desc: "이미 등록되어 있는 병원에 등록됩니다.",
  },
  {
    icon: FaHospital,
    title: "병원 등록",
    desc: "새로운 병원을 등록합니다.",
  },
  {
    icon: FaHospitalUser,
    title: "가상 병원 생성",
    desc: "나만의 가상 병원을 생성합니다.",
  },
];
