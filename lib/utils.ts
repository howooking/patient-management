import { toast } from "@/components/ui/use-toast";
import { type TestSet } from "@/types/type";
import { clsx, type ClassValue } from "clsx";
import { differenceInDays, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateAge(inputDate: string) {
  const birthDate = new Date(inputDate);
  const currentDate = new Date();

  const timeDifference = currentDate.getTime() - birthDate.getTime();
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  let months = currentDate.getMonth() - birthDate.getMonth();
  const years = currentDate.getFullYear() - birthDate.getFullYear();

  if (days < 30) {
    return `${days}일`;
  }

  if (currentDate.getDate() < birthDate.getDate()) {
    months--;
  }

  months += months < 0 ? 12 : 0;

  const ageString = `${years > 0 ? `${years}년` : ""}${
    months > 0 ? ` ${months}개월` : ""
  }`;

  return ageString;
}

type Select = {
  description: string;
  diagnosis: string;
  interpretation: string;
  select_value: string;
};
type SelectGroupedData = {
  [key: string]: Select[];
};
type SelectMappedData = {
  species: "canine" | "feline" | "both";
  age_min: string;
  age_max: string;
  reference_range: string;
  selects: Select[];
};

type Range = {
  description: string;
  diagnosis: string;
  interpretation: string;
  gt: string;
  ge: string;
  lt: string;
  le: string;
};
type RangeGroupedData = {
  [key: string]: Range[];
};
type RangeMappedData = {
  species: "canine" | "feline" | "both";
  age_min: string;
  age_max: string;
  reference_range: string;
  ranges: Range[];
};

export function groupMultiSelectTests(testDetail: TestSet[]) {
  const groupedData: SelectGroupedData = testDetail.reduce(
    (result: SelectGroupedData, item) => {
      const key = `${item.species}-${item.age_min}-${item.age_max}-${item.reference_range}`;
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push({
        description: item.description!,
        diagnosis: item.diagnosis!,
        interpretation: item.interpretation!,
        select_value: item.select_value!,
      });
      return result;
    },
    {}
  );
  const mappedData: SelectMappedData[] = Object.entries(groupedData).map(
    ([key, values]) => {
      const [species, age_min, age_max, reference_range] = key.split("-");
      return {
        species: species as "canine" | "feline" | "both",
        age_max,
        age_min,
        reference_range,
        selects: values,
      };
    }
  );
  return mappedData;
}

export function groupMultiRangeTests(testDetail: TestSet[]) {
  const groupedData: RangeGroupedData = testDetail.reduce(
    (result: RangeGroupedData, item) => {
      const key = `${item.species}-${item.age_min}-${item.age_max}-${item.reference_range}`;
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push({
        description: item.description!,
        diagnosis: item.diagnosis!,
        interpretation: item.interpretation!,
        ge: item.ge!,
        gt: item.gt!,
        lt: item.lt!,
        le: item.le!,
      });
      return result;
    },
    {}
  );
  const mappedData: RangeMappedData[] = Object.entries(groupedData).map(
    ([key, values]) => {
      const [species, age_min, age_max, reference_range] = key.split("-");
      return {
        species: species as "canine" | "feline" | "both",
        age_min,
        age_max,
        reference_range,
        ranges: values,
      };
    }
  );
  return mappedData;
}

// 입원시 나이 계산
export function calculateDaysFromNow(birth: string) {
  const birthToISO = parseISO(birth);
  const daysFromNow = differenceInDays(new Date(), birthToISO);
  return daysFromNow;
}

export function convertDaysToYearsMonths(days?: number | null) {
  if (!days) {
    return null;
  }

  const years = Math.floor(days / 365);

  const remainingDays = days % 365;

  const months = Math.floor(remainingDays / 30);

  let result = "";
  if (years > 0) {
    result += `${years}Y `;
  }
  if (months > 0) {
    result += `${months}M`;
  }

  return result;
}

// 품종이 너무 긴경우 ... 으로 줄이기
export function truncateBreed(breed?: string) {
  if (!breed) {
    return "";
  }
  if (breed.length > 11) {
    return breed.substring(0, 11) + "...";
  } else {
    return breed;
  }
}

// 다음날 차트 삽입
export async function addNextDayChart(
  supabase: any,
  io_id: number,
  hos_id: string,
  pet_id: number,
  main_vet: string,
  sub_vet: string | undefined,
  target_date: string,
  target_weight: string | null
) {
  const { error: icuChartNextError } = await supabase.from("icu_chart").insert({
    io_id,
    hos_id,
    pet_id,
    main_vet,
    sub_vet,
    target_date,
    target_weight,
    isNext: true,
  });

  if (icuChartNextError) {
    toast({
      variant: "destructive",
      title: icuChartNextError.message,
      description: "관리자에게 문의하세요",
    });
    return;
  }
}
