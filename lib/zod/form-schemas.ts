import {
  DRUG_PRODUCT_TYPE,
  FEED_TYPE,
  TEST_CATEGORY,
  TEST_TYPE,
} from "@/constants/selects";
import * as z from "zod";

export const signupFormSchema = z.object({
  vetName: z.string().min(2, {
    message: "2자 이상 실명을 입력해주세요.",
  }),
  licenseNumber: z.string().refine((data) => /^\d{5}$/.test(data), {
    message: "면허번호는 5자리 숫자입니다.",
  }),
  agree: z
    .boolean()
    .refine((data) => data, { message: "약관에 동의해주세요." }),
});

export const newHospitalFormSchema = z.object({
  name: z.string({ required_error: "병원 이름을 입력해주세요." }),
  businessNumber: z
    .string({ required_error: "사업자 번호를 입력해주세요." })
    .refine((data) => !data.includes("-"), {
      message: "- 없이 숫자만 입력해주세요",
    })
    .refine((data) => /^\d{10}$/.test(data), {
      message: "사업자 등록번호는 10자리 숫자 입니다.",
    }),
  address: z.string({ required_error: "병원 주소를 입력해주세요." }),
  phoneNumber: z
    .string({ required_error: "병원 전호번호를 입력해주세요." })
    .refine((data) => !data.includes("-"), {
      message: "- 없이 숫자만 입력해주세요",
    }),
});

export const virtualHospitalFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "병원 이름은 두글자 이상으로 만들어주세요." }),
});

export const addAndEditPetFormSchema = z.object({
  name: z.string({ required_error: "이름을 입력해주세요." }),
  hospitalPetId: z.string({ required_error: "환자 번호를 입력해주세요." }),
  species: z.enum(["canine", "feline"], {
    required_error: "종을 선택해주세요.",
  }),
  breed: z.string({ required_error: "품종을 선택해주세요." }),
  gender: z.enum(["cm", "sf", "im", "if", "un"], {
    required_error: "성별을 선택헤주세요.",
  }),
  birth: z.date({ required_error: "출생일을 선택해주세요." }),
  color: z.string().optional(),
  microchipNumber: z.string().optional(),
  memo: z.string().optional(),
});

export const addTestFormSchema = z.object({
  type: z.enum(TEST_TYPE, {
    required_error: "검사 타입을 선택해주세요.",
  }),
  category: z.enum(TEST_CATEGORY, {
    required_error: "검사 카테고리를 선택해주세요.",
  }),
  name: z.string({ required_error: "원내검사명을 입력해주세요." }),
  original_name: z.string({ required_error: "본래의 검사명을 입력해주세요." }),
  unit: z.string().optional(),
  tag: z.string().optional(),

  multiRange: z.array(
    z.object({
      species: z.enum(["canine", "feline", "both"]),
      age_min: z.string().optional(),
      age_max: z.string().optional(),
      reference_range: z.string().optional(),
      ranges: z.array(
        z.object({
          ge: z.string().optional(),
          gt: z.string().optional(),
          lt: z.string().optional(),
          le: z.string().optional(),
          interpretation: z.string().optional(),
          diagnosis: z.string().optional(),
          description: z.string().optional(),
        })
      ),
    })
  ),

  multiSelect: z.array(
    z.object({
      species: z.enum(["canine", "feline", "both"]),
      age_min: z.string().optional(),
      age_max: z.string().optional(),
      reference_range: z.string().optional(),
      selects: z.array(
        z.object({
          select_value: z.string().optional(),
          interpretation: z.string().optional(),
          diagnosis: z.string().optional(),
          description: z.string().optional(),
        })
      ),
    })
  ),

  description: z.string().optional(),
});

export const addDrugFormSchema = z.object({
  name: z.string({ required_error: "약품명을 입력해주세요." }),
  tag: z.string().optional(),
  indication: z.string().optional(),
  description: z.string().optional(),
  side_effect: z.string().optional(),
  classification: z.string().optional(),

  drug_doses: z.array(
    z.object({
      dose_unit: z.string().optional().nullable(),
      bw_unit: z.string().optional().nullable(),
      cri_unit: z.string().optional().nullable(),
      default_dose: z.string().optional().nullable(),
      min_dose: z.string().optional().nullable(),
      max_dose: z.string().optional().nullable(),
      route: z.string({ required_error: "투약 경로를 입력해주세요." }),
      species: z.enum(["canine", "feline", "both"], {
        required_error: "종을 선택해주세요.",
      }),
      description: z.string().optional().nullable(),
    })
  ),
});

export const addDrugProductFormSchema = z.object({
  drug_id: z.string({ required_error: "약물원료를 선택해주세요." }),
  name: z.string({ required_error: "제품명을 입력해주세요." }),
  tag: z.string().optional(),
  volume: z.string().optional(),
  unit: z.string().optional(),
  mass_unit: z.string().optional(),
  price: z.string().optional(),
  type: z.enum(DRUG_PRODUCT_TYPE, {
    required_error: "제품타입을 선택해주세요",
  }),
  description: z.string().optional(),
  company: z.string().optional(),
});

export const addFeedFormSchema = z.object({
  name: z.string({ required_error: "사료명을 입력해주세요." }),
  price: z.string().optional(),
  tag: z.string({ required_error: "사료명을 입력해주세요." }),
  type: z.enum(FEED_TYPE, {
    required_error: "사료명을 입력해주세요.",
  }),
  calory: z.string({ required_error: "칼로리를 입력해주세요." }),
  volume: z.string({ required_error: "사료 용량을 입력해주세요." }),
  unit: z.string({ required_error: "사료단위를 입력해주세요." }),
  species: z.enum(["canine", "feline", "both"], {
    required_error: "사료명을 입력해주세요.",
  }),
  description: z.string().optional(),
});

export const positionListFormSchema = z.object({
  positionList: z.array(z.object({ position: z.string() })),
});

export const groupListFormSchema = z.object({
  groupList: z.array(z.object({ group: z.string() })),
});

export const addIcuChartFormSchema = z.object({
  tag: z.string({ required_error: "입원사유를 #로 입력해주세요" }),
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
  main_vet: z.string({ required_error: "주치의를 선택해주세요." }),
  sub_vet: z.string().optional(),
  group: z.string({ required_error: "그룹을 선택해주세요." }),
});

// icu chart form
export const icuChartCautionFormSchema = z.object({
  caution: z
    .string({
      required_error: "주의사항을 입력해주세요.",
    })
    .min(1, { message: "주의사항을 입력해주세요." }),
});

export const icuChartGroupFormSchema = z.object({
  group: z.string({ required_error: "주치의를 선택해주세요." }),
});

export const icuChartIoDateFormSchema = z.object({
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

export const icuChartTagFormSchema = z.object({
  tag: z
    .string({
      required_error: "입원사유를 입력해주세요.",
    })
    .min(1, { message: "입원사유를 입력해주세요." }),
});

export const icuChartVetFormSchema = z.object({
  main_vet: z.string({ required_error: "주치의를 선택해주세요." }),
  sub_vet: z.string().optional(),
});

export const chartTxFormSchema = z.object({
  todo_name: z
    .string({
      required_error: "처치를 입력해주세요.",
    })
    .min(1, { message: "처치를 입력해주세요." }),
  todo_memo: z.string().optional(),
  data_type: z.string({ required_error: "처치타입을 선택해주세요." }),
  todo_1: z.boolean().default(false),
  todo_2: z.boolean().default(false),
  todo_3: z.boolean().default(false),
  todo_4: z.boolean().default(false),
  todo_5: z.boolean().default(false),
  todo_6: z.boolean().default(false),
  todo_7: z.boolean().default(false),
  todo_8: z.boolean().default(false),
  todo_9: z.boolean().default(false),
  todo_10: z.boolean().default(false),
  todo_11: z.boolean().default(false),
  todo_12: z.boolean().default(false),
  todo_13: z.boolean().default(false),
  todo_14: z.boolean().default(false),
  todo_15: z.boolean().default(false),
  todo_16: z.boolean().default(false),
  todo_17: z.boolean().default(false),
  todo_18: z.boolean().default(false),
  todo_19: z.boolean().default(false),
  todo_20: z.boolean().default(false),
  todo_21: z.boolean().default(false),
  todo_22: z.boolean().default(false),
  todo_23: z.boolean().default(false),
  todo_24: z.boolean().default(false),
});
