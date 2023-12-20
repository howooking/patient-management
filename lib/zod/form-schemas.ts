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
