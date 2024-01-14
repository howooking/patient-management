export const TEST_CATEGORY = [
  "혈액",
  "소변",
  "대변",
  "바이탈",
  "신체검사",
  "관절검사",
  "신경계검사",
  "안과",
  "치과",
  "방사선",
  "복부초음파",
  "심장초음파",
  "세포",
  "병리",
  "조영검사",
  "CT",
  "MRI",
] as const;
export type TestCategory = (typeof TEST_CATEGORY)[number];

export const TEST_TYPE = ["범위", "선택", "다중선택", "서술"] as const;
export type TestType = (typeof TEST_TYPE)[number];

export const ROUTES = ["IV", "SC", "IM", "ID", "PO", "patch", "etc"] as const;
export type RoutesType = (typeof ROUTES)[number];
