import {
  FaStethoscope,
  FaClipboardCheck,
  FaMaskFace,
  FaListCheck,
} from "react-icons/fa6";

export const SIDEBAR_NAV_MENUS = [
  {
    title: "입원실",
    path: "icu",
    icon: <FaClipboardCheck size={20} />,
    ready: true,
  },
  {
    title: "진료실",
    path: "diagnose",
    icon: <FaStethoscope size={20} />,
    ready: true,
  },
  {
    title: "수술실",
    path: "surgery",
    icon: <FaMaskFace size={20} />,
    ready: true,
  },
  {
    title: "건강검진",
    icon: <FaListCheck size={20} />,
    path: "healthCheck",
    ready: false,
  },
];

export const SIDEBAR_NAV_MENUS_TRANSLATOR: { [key: string]: string } = {
  icu: "입원실",
  diagnose: "진료실",
  surgery: "수술실",
  healthCheck: "건강검진",
};
