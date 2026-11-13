export type ActionType = {
  type: string;
  label: string;
  unit: string;
  factor?: number;
  impact?: string;
};

export const ACTION_TYPES: ActionType[] = [
  {
    type: "water",
    label: "Suv tejash",
    unit: "l",
    impact: "Tejaladigan suv miqdori (litr)",
  },
  {
    type: "energy",
    label: "Energiya tejash",
    unit: "kWh",
    factor: 0.5,
    impact: "Taxminan 1 kWh ≈ 0,5 kg CO2 (tarmoq strukturasiga qarab)",
  },
  {
    type: "waste",
    label: "Chiqindilarni saralash",
    unit: "kg",
    impact: "Qayta ishlanadigan chiqindi hajmi",
  },
  {
    type: "tree",
    label: "Daraxt ekish yoki parvarish",
    unit: "daraxt",
    impact: "Faqat haqiqiy ekilgan/parvarish qilingan daraxtlarni qayd eting",
  },
  {
    type: "event",
    label: "Mahalliy ekologik tadbir",
    unit: "tadbir",
    impact: "Qatnashilgan tadbirlar (tozalash, daraxt ekish va h.k.)",
  },
  {
    type: "education",
    label: "Ekologik targ‘ibot",
    unit: "marta",
    impact: "Suhbat, dars, do‘stlarga ma’lumot yetkazish",
  },
];

export function actionType(type: string) {
  return ACTION_TYPES.find((a) => a.type === type);
}
