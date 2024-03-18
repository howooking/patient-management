export const DEFAULT_ICU_CHART = [
  {
    todoName: "체온(T)",
    todoMemo: "직장체온",
    dataType: "checklist",
  },
  {
    todoName: "심박수(P)",
    todoMemo: "분당 심박수",
    dataType: "checklist",
  },
  {
    todoName: "호흡수(R)",
    todoMemo: "①기침 ②맑은콧물 ③화농성콧물",
    dataType: "checklist",
  },
  {
    todoName: "혈압(BP)",
    todoMemo: "도플러 혈압계",
    dataType: "checklist",
  },
  {
    todoName: "활력",
    todoMemo: "①양호 ②저하 ③불량",
    dataType: "checklist",
  },
  {
    todoName: "구토",
    todoMemo: "①위액 ②음식물 ③혈액 ④거품 ⑤기타",
    dataType: "checklist",
  },
  {
    todoName: "배변",
    todoMemo: "①정상 ②약간무름 ③무름 ④설사 ⑤혈액 ⑥점액",
    dataType: "checklist",
  },
  {
    todoName: "배뇨",
    todoMemo: "①정상뇨 ②옅은뇨 ③진한뇨 ④혈뇨",
    dataType: "checklist",
  },
  {
    todoName: "수액",
    todoMemo: "",
    dataType: "injection",
  },
  {
    todoName: "사료",
    todoMemo: "",
    dataType: "feed",
  },
] as const;
