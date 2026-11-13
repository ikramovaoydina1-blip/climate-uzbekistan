export type MetricKey = "temperature" | "precipitation" | "water" | "drought" | "air";

export type RegionMetric = {
  value: string;
  severity: 0 | 1 | 2 | 3; // 0 — past, 1 — o'rtacha, 2 — yuqori, 3 — juda yuqori
  scope: "hudud" | "milliy";
  source: string;
  year?: number;
};

export type Region = {
  key: string;
  name: string;
  short: string;
  polygon?: string;
  circle?: { cx: number; cy: number; r: number };
  label: { x: number; y: number };
  data: Partial<Record<MetricKey, RegionMetric | null>>;
  risks: string[] | null;
};

export const METRICS: { key: MetricKey; label: string }[] = [
  { key: "temperature", label: "Harorat dinamikasi" },
  { key: "precipitation", label: "Yog‘ingarchilik" },
  { key: "water", label: "Suv resurslari" },
  { key: "drought", label: "Qurg‘oqchilik xavfi" },
  { key: "air", label: "Havo sifati" },
];

export const SEVERITY_LABELS = ["Past", "O‘rtacha", "Yuqori", "Juda yuqori"];
export const SEVERITY_COLORS = ["#16866A", "#C99A2E", "#B4552D", "#8C3B1E"];
export const MISSING_COLOR = "#AFC0B9";

const NATIONAL_TEMP: RegionMetric = {
  value: "+1,5 °C (1960-yillardan beri, milliy o‘rtacha)",
  severity: 2,
  scope: "milliy",
  source: "UNDP O‘zbekiston",
  year: 2021,
};

export const REGIONS: Region[] = [
  {
    key: "qoraqalpogiston",
    name: "Qoraqalpog‘iston Respublikasi",
    short: "Qoraqalpog‘iston",
    polygon: "140,60 320,28 540,42 650,95 632,176 442,196 212,214 95,172",
    label: { x: 350, y: 120 },
    data: {
      temperature: NATIONAL_TEMP,
      precipitation: null,
      water: {
        value: "Aral dengizi havzasi: maydon 68 000 dan ~5 300 km² gacha kamaygan",
        severity: 3,
        scope: "hudud",
        source: "UNEP / World Bank",
      },
      drought: {
        value: "Yuqori xavf — milliy moslashish dasturining (NAPA) afzallikli hududi",
        severity: 3,
        scope: "hudud",
        source: "UNDP",
        year: 2021,
      },
      air: {
        value: "Tuzli chang bo‘ronlari — salomatlik uchun tushuncha",
        severity: 2,
        scope: "hudud",
        source: "UNEP / WHO mintaqaviy tahlili",
      },
    },
    risks: ["Aral dengizi qurishi", "Tuproqlarning tuzlanishi", "Chang bo‘ronlari", "Baliqchilik tizimining yo‘qolishi"],
  },
  {
    key: "xorazm",
    name: "Xorazm viloyati",
    short: "Xorazm",
    polygon: "95,172 212,214 202,306 85,316",
    label: { x: 148, y: 248 },
    data: {
      temperature: NATIONAL_TEMP,
      precipitation: null,
      water: {
        value: "Aral dengizi havzasi; suv sifati kamayish tendensiyasi",
        severity: 2,
        scope: "hudud",
        source: "World Bank",
      },
      drought: { value: "Yuqori xavf", severity: 3, scope: "hudud", source: "UNDP", year: 2021 },
      air: null,
    },
    risks: ["Aral dengizi qurishi", "Tuproq tuzlanishi", "Suv tanqisligi"],
  },
  {
    key: "navoiy",
    name: "Navoiy viloyati",
    short: "Navoiy",
    polygon: "212,214 442,196 478,312 424,432 302,482 202,306",
    label: { x: 330, y: 340 },
    data: {
      temperature: NATIONAL_TEMP,
      precipitation: null,
      water: {
        value: "Hududda suv taqsimoti (UNDP suv tahlili)",
        severity: 2,
        scope: "hudud",
        source: "UNDP",
      },
      drought: null,
      air: {
        value: "Sanoat (qazib-chiqarish, metallurgiya) emissiyalari",
        severity: 2,
        scope: "hudud",
        source: "Milliy havo monitoringi",
      },
    },
    risks: ["Sanoat emissiyalari", "Suv taqsimoti"],
  },
  {
    key: "toshkent-shahri",
    name: "Toshkent shahri",
    short: "Toshkent sh.",
    circle: { cx: 706, cy: 178, r: 17 },
    label: { x: 706, y: 138 },
    data: {
      temperature: {
        value: "+1,5 °C (milliy) + shahar issiq orol effekti",
        severity: 3,
        scope: "hudud",
        source: "UNDP / IQAir",
      },
      precipitation: null,
      water: {
        value: "Ichimlik suvi Chirchiq va Koktash ko‘limlaridan olinadi",
        severity: 1,
        scope: "hudud",
        source: "Shahar suv xo‘jaligi",
      },
      drought: null,
      air: {
        value: "Qishda PM2.5 piklari — mintaqadagi eng iflos shaharlardan biri",
        severity: 2,
        scope: "hudud",
        source: "IQAir",
        year: 2023,
      },
    },
    risks: ["Havo ifloslanishi", "Shahar issiq oroli", "Transport emissiyalari"],
  },
  {
    key: "toshkent-viloyati",
    name: "Toshkent viloyati",
    short: "Toshkent vil.",
    polygon: "650,95 782,132 772,242 642,252 632,176",
    label: { x: 700, y: 212 },
    data: {
      temperature: NATIONAL_TEMP,
      precipitation: null,
      water: null,
      drought: null,
      air: {
        value: "Shahar va transport emissiyalari (Toshkent aglomeratsiyasi)",
        severity: 1,
        scope: "hudud",
        source: "Milliy havo monitoringi",
      },
    },
    risks: ["Tez urbanizatsiya", "Yer resurslariga bosim"],
  },
  {
    key: "namangan",
    name: "Namangan viloyati",
    short: "Namangan",
    polygon: "642,252 772,242 758,322 645,332",
    label: { x: 700, y: 292 },
    data: {
      temperature: NATIONAL_TEMP,
      precipitation: null,
      water: {
        value: "Farg‘ona vodiysi — aholiga to‘g‘ashgan suv resurslari past",
        severity: 2,
        scope: "hudud",
        source: "UNDP",
        year: 2021,
      },
      drought: null,
      air: null,
    },
    risks: ["Suv tanqisligi", "Zich sug‘oriladigan yerlar"],
  },
  {
    key: "andijon",
    name: "Andijon viloyati",
    short: "Andijon",
    polygon: "772,242 834,278 802,348 758,322",
    label: { x: 793, y: 300 },
    data: {
      temperature: NATIONAL_TEMP,
      precipitation: null,
      water: {
        value: "Farg‘ona vodiysi suv taqsimoti",
        severity: 2,
        scope: "hudud",
        source: "UNDP",
      },
      drought: null,
      air: null,
    },
    risks: ["Suv tanqisligi", "Zich aholi", "Issiqlik xavfi"],
  },
  {
    key: "fargona",
    name: "Farg‘ona viloyati",
    short: "Farg‘ona",
    polygon: "782,132 848,168 842,244 834,278 772,242",
    label: { x: 806, y: 196 },
    data: {
      temperature: NATIONAL_TEMP,
      precipitation: null,
      water: {
        value: "Farg‘ona vodiysining suv eng yetishmaydigan qismi",
        severity: 3,
        scope: "hudud",
        source: "UNDP / FAO",
      },
      drought: { value: "Yuqori xavf", severity: 2, scope: "hudud", source: "UNDP", year: 2021 },
      air: null,
    },
    risks: ["Kuchli suv taqsimoti", "Sug‘orish bosimi"],
  },
  {
    key: "sirdaryo",
    name: "Sirdaryo viloyati",
    short: "Sirdaryo",
    polygon: "645,332 758,322 802,348 782,432 644,424",
    label: { x: 716, y: 385 },
    data: {
      temperature: NATIONAL_TEMP,
      precipitation: null,
      water: {
        value: "Sirdaryo havzasi — daryo oqimining kamayishi",
        severity: 2,
        scope: "hudud",
        source: "UNDP",
        year: 2021,
      },
      drought: null,
      air: null,
    },
    risks: ["Suv yetishmasligi", "Glatsiyer erishi kamayishi"],
  },
  {
    key: "jizzax",
    name: "Jizzax viloyati",
    short: "Jizzax",
    polygon: "442,196 632,176 642,252 602,330 478,312",
    label: { x: 540, y: 248 },
    data: {
      temperature: NATIONAL_TEMP,
      precipitation: null,
      water: null,
      drought: null,
      air: null,
    },
    risks: ["Qurg‘oqchilik xavfi", "Sug‘orish suvi talabi"],
  },
  {
    key: "samarqand",
    name: "Samarqand viloyati",
    short: "Samarqand",
    polygon: "644,424 782,432 742,512 566,556 548,448 640,426",
    label: { x: 668, y: 482 },
    data: {
      temperature: NATIONAL_TEMP,
      precipitation: null,
      water: {
        value: "Zarafshan havzasi — qishloq xo‘jaligi suv talabi",
        severity: 1,
        scope: "hudud",
        source: "UNDP",
      },
      drought: null,
      air: null,
    },
    risks: ["Qishloq xo‘jaligiga suv bosimi", "Sel xavfi (2020-yil hodisasi)"],
  },
  {
    key: "buxoro",
    name: "Buxoro viloyati",
    short: "Buxoro",
    polygon: "478,312 602,330 640,426 548,448 426,434",
    label: { x: 522, y: 386 },
    data: {
      temperature: NATIONAL_TEMP,
      precipitation: null,
      water: {
        value: "Suv yetishmaydigan hudud (UNDP suv tahlili)",
        severity: 2,
        scope: "hudud",
        source: "UNDP",
      },
      drought: { value: "Yuqori xavf", severity: 2, scope: "hudud", source: "UNDP", year: 2021 },
      air: null,
    },
    risks: ["Suv yetishmasligi", "Qurg‘oqchilik"],
  },
  {
    key: "qashqadaryo",
    name: "Qashqadaryo viloyati",
    short: "Qashqadaryo",
    polygon: "426,434 548,448 566,556 520,648 400,640 356,540",
    label: { x: 462, y: 545 },
    data: {
      temperature: NATIONAL_TEMP,
      precipitation: null,
      water: {
        value: "Aral dengizi havzasi — tuzlanish va suv sifati xavfi",
        severity: 2,
        scope: "hudud",
        source: "World Bank",
      },
      drought: null,
      air: null,
    },
    risks: ["Tuzlanish", "Suv yetishmasligi"],
  },
  {
    key: "surxondaryo",
    name: "Surxondaryo viloyati",
    short: "Surxondaryo",
    polygon: "566,556 742,512 700,604 520,648",
    label: { x: 630, y: 574 },
    data: {
      temperature: NATIONAL_TEMP,
      precipitation: null,
      water: {
        value: "Amudaryo havzasi; qishloq xo‘jaligiga bog‘liq suv iste’moli",
        severity: 2,
        scope: "hudud",
        source: "UNDP",
      },
      drought: null,
      air: null,
    },
    risks: ["Suv bosimi", "Havzasalararo suv boshqaruvi"],
  },
];

// Milliy tendensiyalar (grafiklar uchun) — manbalar bilan birga ko'rsatiladi
export const TEMP_TREND = [
  { year: 1961, delta: -0.1 },
  { year: 1971, delta: 0.1 },
  { year: 1981, delta: 0.3 },
  { year: 1991, delta: 0.55 },
  { year: 2001, delta: 0.8 },
  { year: 2011, delta: 1.1 },
  { year: 2021, delta: 1.5 },
];

export const ARAL_AREA = [
  { year: 1960, area: 68000 },
  { year: 1970, area: 43000 },
  { year: 1980, area: 26000 },
  { year: 1990, area: 17000 },
  { year: 2000, area: 7300 },
  { year: 2005, area: 4800 },
  { year: 2010, area: 3900 },
  { year: 2018, area: 5300 },
];

export function getRegion(key: string) {
  return REGIONS.find((r) => r.key === key);
}
