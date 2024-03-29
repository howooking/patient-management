export const NAV_MENUS = [
  { title: "상품", href: "/products" },
  { title: "요금제", href: "/pricing" },
  { title: "Contact", href: "/contact" },
];

import {
  FaClipboardCheck,
  FaHospital,
  FaListCheck,
  FaMaskFace,
  FaStethoscope,
} from "react-icons/fa6";

export const SIDEBAR_NAV_MENUS = [
  {
    title: "병원홈",
    href: "/",
    icon: <FaHospital size={20} />,
    ready: true,
  },
  {
    title: "입원실",
    href: "icu",
    icon: <FaClipboardCheck size={20} />,
    ready: true,
  },
  {
    title: "진료실",
    href: "diagnose",
    icon: <FaStethoscope size={20} />,
    ready: true,
  },
  {
    title: "수술실",
    href: "surgery",
    icon: <FaMaskFace size={20} />,
    ready: true,
  },
  {
    title: "건강검진",
    icon: <FaListCheck size={20} />,
    href: "healthCheck",
    ready: false,
  },
];

export const SIDEBAR_NAV_MENUS_TRANSLATOR: { [key: string]: string } = {
  icu: "입원실",
  diagnose: "진료실",
  surgery: "수술실",
  healthCheck: "건강검진",
};

export const SETTINGS = [
  {
    title: "사용자 설정",
    href: "user",
    // icon: <PiUserFill />,
  },
  {
    title: "검사 설정",
    href: "test",
    // icon: <PiTestTubeFill />,
  },
  {
    title: "약물 설정",
    href: "drug",
    // icon: <PiPillFill />,
  },
  {
    title: "식이 설정",
    href: "nutrient",
    // icon: <PiBowlFoodFill />,
  },
] as const;
