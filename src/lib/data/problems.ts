export type ProblemStat = { label: string; value: string; source: string; year?: number };
export type ProblemSource = { name: string; url: string };
export type Problem = {
  slug: string;
  title: string;
  short: string;
  icon: string;
  accent: string;
  science: string[];
  causes: string[];
  uzImpact: string[];
  sectors: string[];
  stats: ProblemStat[];
  solutionSlugs: string[];
  sources: ProblemSource[];
};

export const PROBLEMS: Problem[] = [
  {
    slug: "global-isish",
    title: "Global isish va harorat o‘sishi",
    short: "O‘zbekistonda o‘rtacha harorat 1960-yillardan beri ~1,5 °C ga oshgan — Markaziy Osiyo global o‘rtachadan 2 barobar tezroq isiyapti.",
    icon: "thermometer",
    accent: "#B4552D",
    science: [
      "Issiqxona effekti natijasida atmosferadagi CO2, CH4 va N2O gazlari Quyosh radiatsiyasini ushlab turadi va Yerni isitadi. IPCC AR6 hisoboti (2021) bo‘yicha Markaziy Osiyo qit‘asi global o‘rtachadan taxlan 2 barobar tezroq isiyapti.",
      "O‘zbekiston uchun UNDP (2021) hisobotiga ko‘ra o‘rtacha yillik harorat 1960-yillardan buyon 1,5 °C atrofida oshgan. Isish eng kuchli yoz mavsumida seziladi: ekstremal issiq kunlar soni ortmoqda.",
    ],
    causes: [
      "Fossilit yoqilg‘ilarni (tebigiy gaz, ko‘mir) kuydirish",
      "Sanoat va transportning issiqxona gazlari",
      "O‘rmon va o‘tloqlarning kamayishi",
      "Intensiv sug‘orish dehqonchiligi va energiya iste’moli",
    ],
    uzImpact: [
      "Yozgi haroratlar oshishi — Toshkentda 40 °C dan yuqori kunlar ko‘paymoqda",
      "Glatsiyerlarning qisqarishi va daryo oqimlarining mavsumiy o‘zgarishi",
      "Qurg‘oqchilik va issiqlik stressi tufayli salomatlik xavfining oshishi",
      "Suv va qishloq xo‘jaligi resurslariga bosimning kuchayishi",
    ],
    sectors: ["Qishloq xo‘jaligi", "Suv resurslari", "Energetika", "Salomatlik", "Shahar xo‘jaligi"],
    stats: [
      { label: "O‘zbekiston harorati o‘sishi (1960-yillardan beri)", value: "≈ +1,5 °C", source: "UNDP O‘zbekiston", year: 2021 },
      { label: "Markaziy Osiyo isish sur‘ati (global o‘rtacha nisbatan)", value: "≈ 2×", source: "IPCC AR6 WGI", year: 2021 },
      { label: "Rekord darajada issiq yillar", value: "2023–2024", source: "WMO / Copernicus", year: 2024 },
    ],
    solutionSlugs: ["quyosh-energiyasi", "elektr-tejash", "iqlimga-mos-ekinlar", "jamoat-transporti"],
    sources: [
      { name: "IPCC AR6 WGI — Climate Change 2021", url: "https://www.ipcc.ch/report/ar6/wg1/" },
      { name: "WMO — State of the Global Climate", url: "https://wmo.int/" },
      { name: "UNDP O‘zbekiston — Iqlim hisobotlari", url: "https://www.uzbekistan.undp.org/" },
    ],
  },
  {
    slug: "suv-tanqisligi",
    title: "Suv tanqisligi",
    short: "Amudaryo va Sirdaryo havzasidagi suv oqimi kamaymoqda, poyabastiga to‘g‘ashgan suv resurslari xalqaro tanqislik chegarasidan past.",
    icon: "droplet",
    accent: "#4A9DB8",
    science: [
      "O‘zbekiston suv resurslari asosan Amudaryo va Sirdaryo daryolariga bog‘liq. UNDP (2021) ma‘lumotlariga ko‘ra Amudaryoning hududga oqimi tarixiy darajaga nisbatan 25–30% ga kamaygan.",
      "Suv taqsimotida qishloq xo‘jaligi ustun o‘ringa ega: iste’molning 75% dan ortig‘i sug‘orishga sarflanadi. Taqsimot tizimida yo‘qotishlar, yer osti suvlarining kamayishi va tuzlanish jarayonlari qo‘shma xavf yaratadi.",
    ],
    causes: [
      "Daryo suvi uchun sug‘orishda haddan tashqari foydalanish",
      "Kundalik suv taqsimoti infrastrukturasining eskirishi va yo‘qotishlar",
      "Qurg‘oqchilik va harorat o‘sishi (buxarlanish ortishi)",
      "Transchegaraviy daryolar bo‘yicha suv taqsimoti muammolari",
    ],
    uzImpact: [
      "Farg‘ona vodiysi, Buxoro va Navoiyda suv taqsimoti",
      "Yer osti suvi darajasining tushishi va sug‘orish kanallarining to‘shib qolishi",
      "Sug‘oriladigan yerlarda tuzlanish oshishi",
      "Ichimlik suvi sifatining Aral dengizi havzasida yomonlashishi",
    ],
    sectors: ["Qishloq xo‘jaligi", "Ichimlik suvi", "Sanoat", "Ekotizimlar"],
    stats: [
      { label: "Suv iste‘molining sug‘orishga to‘g‘ashgan ulushi", value: "≈ 75%+", source: "FAO / UNDP" },
      { label: "Amudaryo oqimining kamayishi (tarixiy daraja bilan)", value: "−25…30%", source: "UNDP O‘zbekiston", year: 2021 },
      { label: "Poyabastiga suv resurslari", value: "Tanqislik chegarasidan past", source: "UNDP O‘zbekiston", year: 2021 },
    ],
    solutionSlugs: ["tomchilatib-sugorish", "suv-qaytaishlatish", "suv-yoqotish", "suv-tejovchi", "sugorish-samaradorligi"],
    sources: [
      { name: "UNDP O‘zbekiston — Iqlim va suv", url: "https://www.uzbekistan.undp.org/" },
      { name: "FAO — Land and Water", url: "https://www.fao.org/land-water/" },
      { name: "World Bank — Central & West Asia", url: "https://www.worldbank.org/en/region/cac" },
    ],
  },
  {
    slug: "chollanish",
    title: "Cho‘llanish va yer degradatsiyasi",
    short: "O‘zbekiston hududining ~2/3 qismi cho‘llanish xavfi ostida; sug‘orish tufayli tuzlanish tuproqlar unurliligi kamayishiga olib kelmoqda.",
    icon: "wind",
    accent: "#78644C",
    science: [
      "Cho‘llanish — suv resurslari, iqlim va inson faoliyati ta’sirida tuproqlar unurliligi yo‘qolish jarayoni. UNCCD milliy baholashlariga ko‘ra O‘zbekiston hududining taxminan 2/3 qismi cho‘llanish xavfi ostida.",
      "Sug‘oriladigan yerlarda tuzlanish (salinitatsiya) keng tarqalgan: yer osti suvi darajasi ko‘tarilganda tuzlar tuproq sirtiga chiqadi va ekin hosilini sezilarli tushiradi.",
    ],
    causes: [
      "O‘rmon va o‘simlik qoplamining yo‘qolishi",
      "Ko‘pcha va o‘tloqlarning haddan tashqari ishlashi",
      "Sug‘orish xatolari tufayli suv qolishi (zabolotnenie) va tuzlanish",
      "Yer osti suvlardan haddan tashqari olish va iqlim o‘zgarishi",
    ],
    uzImpact: [
      "Tuproqlar unurliligi va hosildorligining kamayishi",
      "Aral dengizi pastang‘ida yer resurslarining yo‘qolishi",
      "Tuzli-chang bo‘ronlari va ularning salomatlikka ta’siri",
      "Biologik xilma-xillikning kamayishi",
    ],
    sectors: ["Qishloq xo‘jaligi", "O‘rmon xo‘jaligi", "Salomatlik", "Suv resurslari"],
    stats: [
      { label: "Cho‘llanish xavfi ostidagi hudud", value: "≈ 2/3", source: "UNCCD milliy baholash" },
      { label: "Tuzlanishga uchragan sug‘oriladigan yerlar", value: "20% dan ortiq", source: "FAO" },
    ],
    solutionSlugs: ["barqaror-dehqonchilik", "tuproq-saqlash", "daraxt-ekish", "yashil-hududlar"],
    sources: [
      { name: "UNCCD — Cho‘llanishga qarshi konvensiya", url: "https://www.unccd.int/" },
      { name: "FAO — Land and Water", url: "https://www.fao.org/land-water/" },
    ],
  },
  {
    slug: "oral-inqirozi",
    title: "Orol dengizi inqirozi",
    short: "Orol dengizi maydoni 1960-yildan buyon ~90% ga kamaydi (68 000 → ~5 300 km²) — XX asrning eng katta ekologik ofatlari dan biri.",
    icon: "waves",
    accent: "#4A9DB8",
    science: [
      "Orol dengizi bir vaqtlarda dunyodagi to‘rtinchi yirik hovuz edi. 1960-yillardan boshlab Amudaryo va Sirdaryodan sug‘orish uchun oladigan suvning oshishi natijasida daryoga oqadigan suv kamaydi va dengiz quri boshladi.",
      "Maydon 1960-yildagi ~68 000 km² dan hozirgi ~5 300 km² gacha kamaygan (Jangar ko‘li, Mo‘yliq ko‘li va Shimoliy Orol qismlariga ajralgan). Qoldi suv tuzliligi oshib, baliqchilik majburi to‘xtadi.",
    ],
    causes: [
      "Sug‘orish (asosan paxta) uchun daryo suvidan haddan tashqari olish",
      "Suv resurslarini boshqarishda havzasalararo muvofiqlashtirishning yetishmasligi",
      "Iqlimning quriishi va buxarlanishning oshishi",
    ],
    uzImpact: [
      "Qoraqalpog‘iston va Xorazm hududidagi aholining turmush darajasi va salomatligi",
      "Tuzli chang bo‘ronlari — nafas olish va ko‘rush kasalliklari xavfi",
      "Lokal iqlimning yomonlashishi: yozlar issiqlashmoqda, qishlar sovuqlashmoqda",
      "Balikkiilik va dengiz ekotizimlarining yo‘qolishi",
    ],
    sectors: ["Salomatlik", "Baliqchilik", "Qishloq xo‘jaligi", "Lokal iqlim", "Turizm"],
    stats: [
      { label: "Dengiz maydoni (1960-yil)", value: "≈ 68 000 km²", source: "UNEP / World Bank" },
      { label: "Dengiz maydoni (hozir, taxminan)", value: "≈ 5 300 km²", source: "UNEP" },
      { label: "Maydon kamayishi", value: "≈ 90%", source: "UNEP / World Bank" },
    ],
    solutionSlugs: ["suv-tejovchi", "tomchilatib-sugorish", "daraxt-ekish", "suv-qaytaishlatish"],
    sources: [
      { name: "World Bank — Aral Sea Basin", url: "https://www.worldbank.org/en/region/cac" },
      { name: "UNEP — Iqlim va tabiat", url: "https://www.unep.org/" },
    ],
  },
  {
    slug: "havo-ifloslanishi",
    title: "Havo ifloslanishi",
    short: "Toshkentda qish oylarida PM2.5 darajasi WHO chegarasidan bir necha barobar yuqori — inwersiyalar sanoat va transport chiqindilarini ushlab qoladi.",
    icon: "factory",
    accent: "#78644C",
    science: [
      "Shahar havo ifloslanishining asosiy omili — mayda zarralar (PM2.5), azot oksidlari (NO2) va kükürt dioksidi (SO2). WHO (2021) yillik o‘rtacha PM2.5 uchun tavsiya etiladigan daraja 5 µg/m³.",
      "Toshkentda qishda atrof tog‘lar va termal inwersiyalar havo almashinuvini sekinlashtiradi: yo‘lovchilar, sanoat va qizdirish chiqindilari pastki qatlamda jamlanadi. IQAir ma‘lumotlariga ko‘ra Toshkent mintaqadagi eng ifloslanish shaharlardan biri hisoblanadi.",
    ],
    causes: [
      "Avtomobil transporti emissiyalari",
      "Sanoat (Navoiyda qazib-chiqarish va metallurgiya) emissiyalari",
      "Qishda gaz qizdirish tizimlari va qishloq yoqilg‘ilari",
      "Shahar topografiyasi va inwersiyalar (ifloslanishni ushlab qoladi)",
    ],
    uzImpact: [
      "Nafas olish va yurak-qon tomir kasalliklarining oshishi",
      "Ko‘rinishning yomonlashi (tutun) va umumiy shahar muhitining pasayishi",
      "Og‘ir metallar va zarralarning tuproq va o‘simliklarga tushishi",
    ],
    sectors: ["Salomatlik", "Shahar xo‘jaligi", "Sanoat", "Transport"],
    stats: [
      { label: "WHO PM2.5 tavsiya etiladigan chegarasi (yillik o‘rtacha)", value: "5 µg/m³", source: "WHO", year: 2021 },
      { label: "Toshkent rangi", value: "Mintaqa bo‘yicha eng ifloslanish shaharlardan biri", source: "IQAir", year: 2023 },
    ],
    solutionSlugs: ["jamoat-transporti", "yashil-hududlar", "daraxt-ekish", "energetik-samarador-binolar"],
    sources: [
      { name: "WHO — Air Quality Guidelines", url: "https://www.who.int/publications/i/item/9789240034228" },
      { name: "IQAir — World Air Quality", url: "https://www.iqair.com/" },
    ],
  },
  {
    slug: "muzliklar",
    title: "Muzliklarning qisqarishi",
    short: "Gissor-Alay va Qo‘qon tizmalaridagi glatsiyerlar o‘tgan davrlarda barqaror qisqarmoqda — tog‘ suv resurslariga uzun muddatli xavf.",
    icon: "mountain",
    accent: "#4A9DB8",
    science: [
      "O‘zbekiston glatsiyerlari asosan Gissor-Alay tizmasi va Qo‘qon tizmalarining janubi-g‘arbiy qismida joylashgan. Bu muzliklar Sirdaryo va uning irmoqlarining asosiy suv manbai.",
      "UNEP (2023) hisobotiga ko‘ra, Markaziy Osiyo glatsiyerlari o‘tgan o‘n-yilliklarda doimiy kamaymoqda: massasi va maydoni sezilarli qisqargan. Glatsiyerlarning qisqarishi yozgi oqimning barqarorligiga ta’sir qiladi.",
    ],
    causes: [
      "Global isish (eng asosiy omil)",
      "Aerosollar va chang tushishi (muz sirtini qoraytirib, erishni tezlashtiradi)",
      "Buxarlanishning oshishi va yog‘ingarchilik rejimining o‘zgarishi",
    ],
    uzImpact: [
      "Yozgi glatsiyer erishi kamayishi — sug‘orish faslida suv taqsimoti",
      "Glatsiyer ko‘llari oqimi (GLOF) xavfi va tog‘ hududlaridagi sel xavfi",
      "G‘arbiy qismidagi sug‘oriladigan yerlar uchun uzun muddatli suv xavfi",
    ],
    sectors: ["Suv resurslari", "Qishloq xo‘jaligi", "Tog‘ hududlari", "G‘idrotexnika"],
    stats: [
      { label: "Markaziy Osiyo glatsiyerlari tendensiyasi (o‘tgan o‘n-yilliklar)", value: "Doimiy qisqarish", source: "UNEP", year: 2023 },
      { label: "Glatsiyerlarning ahamiyati", value: "Sirdaryo tizmasining asosiy suv manbai", source: "UNDP" },
    ],
    solutionSlugs: ["sugorish-samaradorligi", "tomchilatib-sugorish", "iqlimga-mos-ekinlar", "tuproq-saqlash"],
    sources: [
      { name: "UNEP — The World’s Glaciers", url: "https://www.unep.org/" },
      { name: "IPCC AR6 WGI", url: "https://www.ipcc.ch/report/ar6/wg1/" },
    ],
  },
  {
    slug: "bioxilma-xillik",
    title: "Biologik xilma-xillikning kamayishi",
    short: "Markaziy Osiyo global biologik xilma-xillik zonalaridan biri — M. Pollos kengushbini, sanga, ura g‘irtish kabi turlar yo‘qolish xavfi ostida.",
    icon: "leaf",
    accent: "#16866A",
    science: [
      "Tog‘-cho‘l mintaqasi dunyodagi biologik xilma-xillik zonalaridan biri hisoblanadi: hududda minglab endemik o‘simlik turlari uchraydi.",
      "O‘zbekistonda M. Pollos kengushbini (Aral qurilishi bilan yo‘qolgan tabiiy areali), sanga, ura g‘irtish, Amudaryo xoshi va boshqa turlar yo‘qolish xavfi ostida. Tabiatni muhofaza qilish uchun Ulug‘beg va Qizilqum zaxiralari (UNESCO butun olam merosi) saqlanib qolgan.",
    ],
    causes: [
      "Yashash joylarining yo‘qolishi (qishloq xo‘jaligi, urbanizatsiya)",
      "Qonunsiz ovlash va savdo",
      "Havo va tuproq ifloslanishi, Aral dengizi inqirozi",
      "Iqlim o‘zgarishi natijasida muhitning o‘zgarishi",
    ],
    uzImpact: [
      "Turlarning yo‘qolishi va genetik resurslar yo‘qotilishi",
      "Ekotizim xizmatlarining pasayishi: changlatish, tabiiy zararkunandalarga nazorat",
      "Muhofaza qilinadigan hududlar bosimi",
    ],
    sectors: ["Qishloq xo‘jaligi (changlatish)", "Turizm", "Salomatlik", "Ilm-fan"],
    stats: [
      { label: "Mintaqa endemik o‘simlik turlari", value: "1 000 dan ortiq", source: "IUCN" },
      { label: "Yo‘qolish xavfi ostidagi turlar", value: "Kishi va butun olam Qizil ro‘yxatlarida", source: "IUCN / Qizil kitob" },
    ],
    solutionSlugs: ["yashil-hududlar", "daraxt-ekish", "barqaror-dehqonchilik", "chiqindi-saralash"],
    sources: [
      { name: "IUCN — Qizil ro‘yxat", url: "https://www.iucnredlist.org/" },
      { name: "UNEP — Tabiat resurslari", url: "https://www.unep.org/" },
    ],
  },
  {
    slug: "qurg'oqchilik",
    title: "Qurg‘oqchilik va ekstremal ob-havo",
    short: "Issiqlik tolqinlari (2010-yilda Farg‘ona vodiysida 48–50 °C) va sel suvlari (2020 — Samarqand) kabi ekstremal hodisalar tez-tez ro‘y bermoqda.",
    icon: "sun",
    accent: "#B4552D",
    science: [
      "Iqlim isishi ekstremal hodisalar chastotasini oshiradi: issiqlik tolqinlari qurg‘oqchilik bilan birgalikda tuproq namligini kamaytiradi, sel va kuchli yog‘inlar esa qisqa muddatli suv bosishiga olib keladi.",
      "O‘zbekistonda 2010-yilda Farg‘ona vodiysida 48–50 °C gacha bo‘lgan rekord issiqlik kuzatilgan; 2020-yilda Samarqand viloyatida katta sel suvi sodir bo‘lgan. UNDP ma‘lumotlariga ko‘ra bunday hodisalar kelajakda ko‘proq va kuchliroq bo‘ladi.",
    ],
    causes: [
      "Global isish (issiqlik tolqinlari va qurg‘oqchilik uchun asosiy omil)",
      "Yog‘ingarchilik rejimining noaniqli o‘zgarishi",
      "O‘rmonlarning yo‘qolishi va yer muhofazasi",
      "Suv resurslari boshqaruvining moslashmasligi",
    ],
    uzImpact: [
      "Ekin va mollar yo‘qotishlari (issiqlik va qurg‘oqchilik)",
      "Sel suvlari: infratuzilma, ko‘priklar va yerlarga zarar",
      "Ichimlik suvi ta‘minotidagi noaniqlik",
      "Aholining issiqlik stressi bilan salomatlik xavfi",
    ],
    sectors: ["Qishloq xo‘jaligi", "G‘idrotexnika", "Infratuzilma", "Shahar xo‘jaligi"],
    stats: [
      { label: "Farg‘ona vodiysi rekord issiqligi", value: "48–50 °C (2010)", source: "Milliy hidrometeorologiya" },
      { label: "Katta sel suvi hodisasi", value: "Samarqand, 2020", source: "Ochik manbalar" },
    ],
    solutionSlugs: ["iqlimga-mos-ekinlar", "tuproq-saqlash", "suv-yoqotish", "yashil-hududlar"],
    sources: [
      { name: "UNDP O‘zbekiston", url: "https://www.uzbekistan.undp.org/" },
      { name: "WMO — Ekstremal hodisalar", url: "https://wmo.int/" },
    ],
  },
  {
    slug: "ishqlarga-ta'sir",
    title: "Qishloq xo‘jaligiga iqlim ta’siri",
    short: "Qishloq xo‘jaligi iqtisodiyotning 15–20% ni tashkil etadi va suvga oshiqqan sug‘orishga asoslangan — iqlim o‘zgarishi to‘g‘ridan-to‘g‘ri hosil va oziq-ovqat xavfsizligiga ta’sir qiladi.",
    icon: "wheat",
    accent: "#78644C",
    science: [
      "O‘zbekiston qishloq xo‘jaligining katta qismi sug‘oriladigan ekinlarga (bug‘doy, paxta, uzum, sabzavot, meva) asoslangan. FAO va World Bank ma‘lumotlariga ko‘ra qishloq xo‘jaligi MDHning 15–20% ni tashkil etadi va aholining sezilarli ulushini band etadi.",
      "Iqlim o‘zgarishi o‘sish mavsumini o‘zgartiradi: issiqlik stressi g‘alla hosilini kamaytiradi, tuzlanish ekin maydonlarini siqadi, suv taqsimoti esa sug‘orish rejimlarini qiyinlashtiradi.",
    ],
    causes: [
      "Sug‘orish suvi taqsimoti (suv tanqisligi bilan bog‘liq)",
      "Issiqlik stressi va issiqlik tolqinlari",
      "Tuproqlarning tuzlanishi va cho‘llanishi",
      "Yog‘ingarchilik noaniqligi va zararkunandalar harakati",
    ],
    uzImpact: [
      "Bug‘doy, paxta va meva ekinlari uchun hosil xavfi",
      "Suv taqsimoti tufayli sug‘oriladigan maydonlar cheklovi",
      "Oziq-ovqat xavfsizligi va dehqon xaridlari bosimi",
    ],
    sectors: ["Qishloq xo‘jaligi", "Oziq-ovqat xavfsizligi", "Suv resurslari", "Bandlik"],
    stats: [
      { label: "Qishloq xo‘jaligining MDH ulushi", value: "15–20%", source: "World Bank" },
      { label: "Suv iste‘molining sug‘orishga ulushi", value: "75% dan ortiq", source: "FAO" },
    ],
    solutionSlugs: ["iqlimga-mos-ekinlar", "barqaror-dehqonchilik", "tomchilatib-sugorish", "sugorish-samaradorligi"],
    sources: [
      { name: "FAO — Qishloq xo‘jaligi va iqlim", url: "https://www.fao.org/" },
      { name: "World Bank — Uzbekistan", url: "https://www.worldbank.org/en/country/uzbekistan" },
    ],
  },
  {
    slug: "chiqindilar-igg",
    title: "Chiqindilar va issiqxona gazlari",
    short: "O‘zbekiston yillik emissiyasi ~145 Mt CO2e (UNFCCC NDC, 2020). NDC maqsadi — 2030-yilga emissiyalarni 43% gacha kamaytirish (shartli dastur).",
    icon: "cloud",
    accent: "#103D32",
    science: [
      "O‘zbekistonning ulangan milliy dasturi (NDC, UNFCCC) bo‘yicha mamlakat emissiyasi taxminan 145 Mt CO2e ni tashkil etadi: energiya, sanoat, transport va qishloq xo‘jaligi asosiy manbalar. Shartli dastur bo‘yicha 2030-yilga emissiyalarni 43% gacha kamaytirish ko‘zda tutilgan.",
      "Shahar xo‘jaligi chiqindilari: xonadon chiqindilari asosan poligonlarda qayta ishlanmaydi; plastik va organik chiqindilarning qisman qayta qayta ishlanishi orqali qo‘shma resurslar va issiqxona gazlari kamaytirilishi mumkin.",
    ],
    causes: [
      "Energetika tizimining tabiiy gaz va ko‘mirdan bog‘liqligi",
      "Transport emissiyalari",
      "Sanoat jarayonlari (azot o‘g‘itlari, metallurgiya)",
      "Chiqindilar boshqaruvidagi qayta ishlashning pastligi",
    ],
    uzImpact: [
      "Issiqxona gazlari va ularning global isishga hissasiga",
      "Shahar havo sifati yomonlashi",
      "Chiqindi poligonlaridan metan emissiyasi va yer resurslariga bosim",
    ],
    sectors: ["Energetika", "Sanoat", "Shahar xo‘jaligi", "Salomatlik"],
    stats: [
      { label: "Yillik emissiya (NDC)", value: "≈ 145 Mt CO2e", source: "UNFCCC", year: 2020 },
      { label: "2030-yil NDC maqsadi (shartli dastur)", value: "−43% emissiya", source: "UNFCCC" },
    ],
    solutionSlugs: ["chiqindi-saralash", "quyosh-energiyasi", "energetik-samarador-binolar", "yashil-qurilish"],
    sources: [
      { name: "UNFCCC — NDC Repository", url: "https://www4.unfccc.int/ndc/" },
      { name: "Global Carbon Project", url: "https://www.globalcarbonproject.org/" },
    ],
  },
];

export function getProblem(slug: string) {
  return PROBLEMS.find((p) => p.slug === slug);
}
