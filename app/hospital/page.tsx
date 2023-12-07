import OptionButton from "@/components/hospital/new-hospital/option-button";
import { FaMagnifyingGlass, FaHospital, FaHospitalUser } from "react-icons/fa6";

export default async function SpacePage() {
  return (
    <div className="mt-40 flex justify-center items-center mx-auto gap-10">
      {ADD_OPTIONS.map((option) => (
        <OptionButton
          key={option.title}
          title={option.title}
          desc={option.desc}
          icon={option.icon}
          query={option.query}
        />
      ))}
    </div>
  );
}

const ADD_OPTIONS = [
  {
    icon: FaMagnifyingGlass,
    title: "병원 검색",
    desc: "기존 병원에 수의사로 참가",
    query: "search",
  },
  {
    icon: FaHospital,
    title: "병원 등록",
    desc: "새로운 병원을 등록",
    query: "real",
  },
  {
    icon: FaHospitalUser,
    title: "가상 병원 생성",
    desc: "나만의 가상 병원을 생성",
    query: "virtual",
  },
];
