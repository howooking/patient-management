import { TestSet } from "@/types/type";
import { type ClassValue, clsx } from "clsx";
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

type SelectItem = {
  description: string;
  diagnosis: string;
  interpretation: string;
  select_value: string;
};

type GroupedData = {
  [key: string]: SelectItem[];
};

type MappedDataItem = {
  species: "canine" | "feline" | "both";
  age: string;
  selects: SelectItem[];
  reference_range: string;
};

export function groupMultiSelectTests(testDetail: TestSet[]) {
  const groupedData: GroupedData = testDetail.reduce(
    (result: GroupedData, item) => {
      const key = `${item.species}-${item.age}-${item.reference_range}`;
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
  const mappedData: MappedDataItem[] = Object.entries(groupedData).map(
    ([key, values]) => {
      const [species, age, reference_range] = key.split("-");
      return {
        species: species as "canine" | "feline" | "both",
        age,
        reference_range,
        selects: values,
      };
    }
  );
  return mappedData;
}
