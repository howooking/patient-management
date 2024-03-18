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
export type TestCategoryEnum = (typeof TEST_CATEGORY)[number];

export const TEST_TYPE = ["범위", "선택", "다중선택", "서술"] as const;
export type TestTypeEnum = (typeof TEST_TYPE)[number];

export const DRUG_PRODUCT_TYPE = [
  "vial",
  "ample",
  "tablet",
  "capsule",
  "liquid",
  "powder",
  "bottle",
] as const;
export type DrugProductTypeEnum = (typeof DRUG_PRODUCT_TYPE)[number];

export const FEED_TYPE = ["wet", "dry", "liquid", "half-dry"] as const;
export type FeedTypeEnum = (typeof FEED_TYPE)[number];

export const SPECIES = ["canine", "feline", "both"] as const;
export type SpeciesTypeEnum = (typeof SPECIES)[number];
