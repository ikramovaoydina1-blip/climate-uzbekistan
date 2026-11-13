export type ResearchEntry = {
  id: string;
  title: string;
  org: string;
  year: number;
  url: string;
  category: string;
  summary: string;
};

export const RESEARCH: ResearchEntry[] = [
  {
    id: "ipcc-ar6-wgi",
    title: "Climate Change 2021: The Physical Science Basis (AR6 WGI)",
    org: "IPCC",
    year: 2021,
    url: "https://www.ipcc.ch/report/ar6/wg1/",
    category: "Global iqlim ilmi",
    summary:
      "Markaziy Osiyo qit‘asi global o‘rtachadan taxminan 2 barobar tezroq isyapti; issiqlik tolqinlari va qurg‘oqchilik chastotasi ortmoqda. Iqlim ilmining asosiy xulosa hisoboti.",
  },
  {
    id: "nasa-vital-signs",
    title: "NASA Vital Signs — Global Climate Change",
    org: "NASA",
    year: 2024,
    url: "https://climate.nasa.gov/vital-signs/",
    category: "Global iqlim ilmi",
    summary:
      "Harorat, muz qoplami, dengiz darajasi, CO2 konsentratsiyasi bo‘yicha ochiq monitoring ma’lumotlari va vizualizatsiyalari.",
  },
  {
    id: "wmo-2023",
    title: "State of the Global Climate 2023",
    org: "World Meteorological Organization",
    year: 2024,
    url: "https://wmo.int/",
    category: "Global iqlim ilmi",
    summary:
      "2023-yil meteorologik kuzatuvlar bo‘yicha rekord darajada issiq yil bo‘lib tasdiqlandi; ekstremal hodisalar tahlili.",
  },
  {
    id: "copernicus-c3s",
    title: "Copernicus Climate Change Service — harorat tahlili",
    org: "EC / Copernicus",
    year: 2024,
    url: "https://climate.copernicus.eu/",
    category: "Global iqlim ilmi",
    summary:
      "Avropa iqlim monitoring xizmati: 2023–2024 yillar rekord issiqlik darajasi bo‘yicha mustaqil tasdiqlovchi tahlil.",
  },
  {
    id: "undp-uz",
    title: "O‘zbekiston iqlim o‘zgarishi bo‘yicha hisobotlar",
    org: "UNDP O‘zbekiston",
    year: 2021,
    url: "https://www.uzbekistan.undp.org/",
    category: "O‘zbekiston",
    summary:
      "Mamlakat bo‘yicha harorat o‘sishi (~1,5 °C, 1960-yillardan beri), suv resurslari va moslashish dasturlari bo‘yicha asosiy mamlakat hujjatlari.",
  },
  {
    id: "unfccc-ndc",
    title: "Nationally Determined Contributions (NDC) — O‘zbekiston",
    org: "UNFCCC",
    year: 2020,
    url: "https://www4.unfccc.int/ndc/",
    category: "Emissiyalar",
    summary:
      "O‘zbekistonning milliy hissa dasturi: emissiya ~145 Mt CO2e, 2030-yilga shartli dastur bo‘yicha −43% kamaytirish maqsadi.",
  },
  {
    id: "unep-glaciers",
    title: "The World’s Glaciers Are Shrinking",
    org: "UNEP",
    year: 2023,
    url: "https://www.unep.org/",
    category: "Muzliklar",
    summary:
      "Markaziy Osiyo, jumladan Gissor-Alay va Qo‘qon tizmalaridagi glatsiyerlarning o‘tgan o‘n-yilliklarda massasi va maydonining barqaror kamayishi.",
  },
  {
    id: "who-aqg",
    title: "WHO Global Air Quality Guidelines (2021)",
    org: "WHO",
    year: 2021,
    url: "https://www.who.int/publications/i/item/9789240034228",
    category: "Havo sifati",
    summary:
      "PM2.5 uchun yillik o‘rtacha 5 µg/m³ tavsiya etiladigan chegarasi — shahar havo sifati baholashining asosiy me’yori.",
  },
  {
    id: "iqair-waqr",
    title: "World Air Quality Report",
    org: "IQAir",
    year: 2023,
    url: "https://www.iqair.com/",
    category: "Havo sifati",
    summary:
      "Jahon shaharlari bo‘yicha PM2.5 reytingi: Toshkent mintaqadagi eng ko‘p ifloslangan shaharlar qatorida ko‘rsatilgan.",
  },
  {
    id: "fao-land-water",
    title: "Land and Water — qishloq xo‘jaligi va suv",
    org: "FAO",
    year: 2023,
    url: "https://www.fao.org/land-water/",
    category: "Qishloq xo‘jaligi va suv",
    summary:
      "Sug‘orish samaradorligi, cho‘llanish va tuzlanish, iqlimga mos dehqonchilik bo‘yicha ochiq ma’lumotlar va metodika.",
  },
  {
    id: "worldbank-uz",
    title: "Uzbekistan — ma’lumotlar va hisobotlar",
    org: "World Bank",
    year: 2024,
    url: "https://www.worldbank.org/en/country/uzbekistan",
    category: "Iqtisodiyot va iqtisod",
    summary:
      "O‘zbekiston iqtisodiyot ko‘rsatkichlari, suv energetikasi, transport va iqlim loyihalari bo‘yicha bank hisobotlari.",
  },
  {
    id: "worldbank-cac",
    title: "Aral Sea Basin — Central & West Asia",
    org: "World Bank",
    year: 2024,
    url: "https://www.worldbank.org/en/region/cac",
    category: "Orol dengizi",
    summary:
      "Aral dengizi havzasi suv resurslari, tuzlanish va iqlim moslashish loyihalari bo‘yicha mintaqaviy tahlillar.",
  },
  {
    id: "unep-egr",
    title: "Emissions Gap Report 2024",
    org: "UNEP",
    year: 2024,
    url: "https://www.unep.org/resources/report/emissions-gap-report-2024",
    category: "Emissiyalar",
    summary:
      "Jahon emissiya tendensiyalari va 1,5 °C maqsadi uchun kerakli tezyuratli kamaytirish orasidagi farq tahlili.",
  },
  {
    id: "unccd",
    title: "Cho‘llanishga qarshi konvensiya — milliy baholashlar",
    org: "UNCCD",
    year: 2023,
    url: "https://www.unccd.int/",
    category: "Yer resurslari",
    summary:
      "Cho‘llanish va yer degradatsiyasi bo‘yicha global monitoring; O‘zbekiston hududining ~2/3 qismi xavf ostida bahosi.",
  },
  {
    id: "gcp",
    title: "Global Carbon Budget",
    org: "Global Carbon Project",
    year: 2024,
    url: "https://www.globalcarbonproject.org/",
    category: "Emissiyalar",
    summary:
      "Yillik global CO2 byudjeti: fossilit yoqilg‘ilar emissiyasi, okean va yerli so‘rishchilar tahlili.",
  },
];
