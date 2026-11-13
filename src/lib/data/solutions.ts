export type Solution = {
  slug: string;
  title: string;
  direction: "suv" | "energiya" | "qishloq" | "shahar";
  solves: string;
  solvesSlugs: string[];
  how: string[];
  who: string;
  resources: string[];
  benefit: string[];
  limits: string[];
  source?: string;
};

export const DIRECTION_LABELS: Record<Solution["direction"], string> = {
  suv: "Suv resurslari",
  energiya: "Energiya",
  qishloq: "Qishloq xo‘jaligi",
  shahar: "Shahar ekologiyasi",
};

export const SOLUTIONS: Solution[] = [
  // SUV
  {
    slug: "tomchilatib-sugorish",
    title: "Tomchilatib sug‘orish tizimi",
    direction: "suv",
    solves: "Suv tanqisligi va sug‘orish samaradorligi",
    solvesSlugs: ["suv-tanqisligi", "ishqlarga-ta'sir", "oral-inqirozi"],
    how: [
      "Suv maxsus tor va tomchilatish chiziqlari orqali to‘g‘ridan-to‘g‘ri ekin ildizlariga yetkaziladi.",
      "Qovurilgan sug‘orish bilan solishtirganda suv sarfi 30–50% gacha kamayadi, buxarlanish va oqib ketish yo‘qotishlari minimal.",
    ],
    who: "Dehqon xo‘jaliklari, fermer xo‘jaliklari, sug‘orish tizimlarini boshqaruvchi tashkilotlar",
    resources: ["Tomchilatish tizimi (noriqar, pompalar)", "Eksplotatsiya va filtratsiya", "Ekinlarga mos texnik o‘qituv"],
    benefit: ["30–50% suv tejash", "G‘ovakli tuproqda hosil o‘sishi", "Tuzlanishning kamayishi (suvning aniq yetkazilishi)"],
    limits: ["Boshlang‘ich kapital sarf", "Filtratsiya talab etadi", "Kichik fermerlar uchun moliyaviy qiyinlik"],
    source: "FAO — Irriqatsiya texnologiyalari",
  },
  {
    slug: "suv-qaytaishlatish",
    title: "Suvni qayta ishlatish",
    direction: "suv",
    solves: "Suv tanqisligi va shahar chiqindi suvi",
    solvesSlugs: ["suv-tanqisligi", "havo-ifloslanishi"],
    how: [
      "Chiqindi suvlar tozalash tizimlarida ko‘p bosqichli tozalanib, sug‘orish va sanoat maqsadlarida qayta ishlatiladi.",
      "Toshkentda joylashgan chiqindi suvi tozalash tizimi o‘z oqim bo‘yicha dunyodagi eng kattalardan biri hisoblanadi (430 000 m³/gun) va tozalangan suv sug‘orishda ishlatiladi.",
    ],
    who: "Shahar suv xo‘jaligi tizimlari, sanoat korxonalar, viloyat hokimiyatlari",
    resources: ["Chiqindi suvi tozalash tizimi", "Qayta foydalanish kanallari", "Suv sifati nazorati"],
    benefit: ["Yangi suv resursining shakllanishi", "Daryo va yer osti suvlariga ifloslanishning kamayishi", "Sug‘orish suvi bosimining kamayishi"],
    limits: ["Yuqori kapital sarf", "Suv sifati standartlarini nazorat qilish", "Aholi orasida idrok masalalari"],
    source: "Toshkent chiqindi suvi tozalash tizimi (ochiq manbalar)",
  },
  {
    slug: "suv-yoqotish",
    title: "Suv yo‘qotishlarini kamaytirish",
    direction: "suv",
    solves: "Ta’minot tizimidagi suv yo‘qotishlari",
    solvesSlugs: ["suv-tanqisligi"],
    how: [
      "Ta’minot tizimlaridagi eskirgan quvurlarni almashtirish, nuqsonli bog‘lanishlarni aniqlash va ta’mirlash.",
      "Avtomatlashtirilgan monitoring (hisoblagichlar, bosim nazorati) orqali yo‘qotishlar real vaqtda kuzatiladi.",
    ],
    who: "Suv ta’minoti tashkilotlari, kommunal xizmatlar",
    resources: ["Yangi quvurlar va anjomlar", "SCADA monitoring tizimlari", "Texnik xizmat jamoasi"],
    benefit: ["Yo‘qotishlarning 10–30% gacha kamayishi (tizim holatiga bog‘liq)", "Tizim bosimi barqarorlashadi", "Uzoq muddatli ta’mirlash xarajatlari kamayadi"],
    limits: ["Shahar ostidagi ishlarning qiymati", "Aholiga vaqtiyat ta’minot kesishlari", "Eski tizimlarning audit talabi"],
  },
  {
    slug: "suv-tejovchi",
    title: "Suvni tejovchi texnologiyalar",
    direction: "suv",
    solves: "Xonadon va sanoatda suv iste’moli",
    solvesSlugs: ["suv-tanqisligi", "oral-inqirozi"],
    how: [
      "Xonadonda: qayta ishlatilgan suv qurilmalari, qisqa vaqtli dush rejimi, oqim cheklovchilar.",
      "Sanoatda: yopiq sikl (suvin qayta ishlash) va isish vaqti tahlil orqali sarflarni kamaytirish.",
    ],
    who: "Xonadon egalari, binolar boshqaruvi, sanoat korxonalar",
    resources: ["Arzon anjomlar (oqim cheklovchilar, qayta ishlatilgan suv qurilmalari)", "Energetika monitoring", "Jamoatchilik ta’limi"],
    benefit: ["Xonadonda 20–40% suv tejash", "Hudud suv resurslariga bosimning kamayishi", "O‘rta va uzoq muddatli to‘lovlarning kamayishi"],
    limits: ["Odatlarni o‘zgartirish talab etadi", "Eski binolarda o‘rnatish qiyinligi"],
  },
  // ENERGIYA
  {
    slug: "quyosh-energiyasi",
    title: "Quyosh energiyasi",
    direction: "energiya",
    solves: "Issiqxona gazlari va energiya tizimining gazga bog‘liqligi",
    solvesSlugs: ["chiqindilar-igg", "global-isish", "havo-ifloslanishi"],
    how: [
      "KPV (solar) panelari quyosh energiyasini elektr energiyasiga aylantiradi: xonadon tizimlari, sanoat tizimlari, quyosh stantsiyalari.",
      "O‘zbekiston quyosh resurslari bo‘yicha dunyodagi eng boy mintaqalardan biri hisoblanadi va 2030-yilga qadar yangi energiya quvvatini oshirish dasturlari amalga oshirilmoqda.",
    ],
    who: "Xonadon egalari, biznes, davlat energetika tizimi, xalqaro investorlar",
    resources: ["KPV panelari va inverterlar", "O‘rnatish va ulanish", "Energetika subvensiyalari / imtiyozli kreditlar"],
    benefit: ["0 issiqxona gazlari (ishlatish davrida)", "Elektr to‘lovlarining 50–80% gacha kamayishi (xonadon tizimida)", "Yerli ish o‘rinlari"],
    limits: ["Kunduzgi ishlash — saqlash (akbator) talab etadi", "Boshlang‘ich kapital sarf", "Panel sifati va issiqlik stressiga moslik"],
    source: "UNDP / Xalqaro energetika agentligi (IEA) mintaqaviy baholari",
  },
  {
    slug: "shamol-energiyasi",
    title: "Shamol energiyasi",
    direction: "energiya",
    solves: "Energetika tizimining diversifikatsiyasi va emissiya",
    solvesSlugs: ["chiqindilar-igg", "global-isish"],
    how: [
      "Shamol stantsiyalari o‘rtacha shamol tezligi yuqori hududlarda (tog‘o‘tloq va vodiy chiquvchilar) o‘rnatiladi.",
      "O‘zbekistonda shamol energetikasi bo‘yicha dasturiy rejalashtirish bor, bir nechta loyiha bosqichlarida.",
    ],
    who: "Energetika tizimi, xalqaro investorlar, moliyaviy institutlar",
    resources: ["Shamol turbinlari", "Sayanlash va ta’mirlash", "Tranzit va ulash tarmoqlari"],
    benefit: ["Issiqxona gazlari kamayishi", "Energetika tizimining barqarorligi", "Yuz yillik muddatga qadar xizmat qilish"],
    limits: ["Hududiy shamol resursiga bog‘liq", "Yuqori boshlang‘ich kapital", "Shovqin va landshaftga ta’sir"],
  },
  {
    slug: "energetik-samarador-binolar",
    title: "Energetika samarador binolar",
    direction: "energiya",
    solves: "Binolarda elektr va issiqlik iste’moli",
    solvesSlugs: ["chiqindilar-igg", "havo-ifloslanishi"],
    how: [
      "Issiq izolyatsiya, energosamarador derazalar, LED chiroqlar va samarador konditsioner tizimlari binoda energiya sarfini kamaytiradi.",
      "Yangi binolarda standartlar, eski binolarda esa bosqichma-bosqich renovatsiya amalga oshiriladi.",
    ],
    who: "Binolar egasi, qurilish kompaniyalari, davlat bino standartlari",
    resources: ["Izolyatsiya materiallari", "Energetika audit jamoasi", "LED va samarador anjomlar"],
    benefit: ["Ishlab turish energiyasining 30–60% gacha tejash", "Qulay mikro muhitning yaxshilanishi", "Uzoq muddatli to‘lovlarning kamayishi"],
    limits: ["Eski binolarda qurilish xarajati", "Izolyatsiya materiallari sifati nazorati"],
  },
  {
    slug: "elektr-tejash",
    title: "Elektr energiyasini tejash",
    direction: "energiya",
    solves: "Energiya iste’moli va emissiya",
    solvesSlugs: ["chiqindilar-igg", "global-isish"],
    how: [
      "Odatlari: LED chiroqlar, energosamarador texnika, to‘g‘ri konditsioner rejimi (24–26 °C), keraksiz rejimlarini o‘chirish.",
      "Tashkilotlarda: energiya monitoringi, jamoat binolarida avtomatlashtirilgan boshqaruv.",
    ],
    who: "Har bir xonadon, tashkilot, do‘kon va idora",
    resources: ["LED chiroqlar", "Energosamarador texnika (A sinfi)", "Smart hisoblagichlar"],
    benefit: ["Xonadonda 15–30% elektr tejash (odatlar + LED)", "Issiqxona gazlarining kamayishi", "To‘g‘in to‘lovlarning kamayishi"],
    limits: ["Odatlarni o‘zgartirishning vaqt talabi", "Eski texnikani almashtirish xarajati"],
  },
  // QISHLOQ XO‘JALIGI
  {
    slug: "iqlimga-mos-ekinlar",
    title: "Iqlimga mos ekinlar va navlari",
    direction: "qishloq",
    solves: "Hosilning iqlim xavflariga chidamli bo‘lishi",
    solvesSlugs: ["qurg'oqchilik", "global-isish", "ishqlarga-ta'sir"],
    how: [
      "Issiqlik va qurg‘oqchilikka chidamli bug‘doy, guruch, paxta navlari o‘qitiladi va tarqatiladi.",
      "O‘sish davri qisqa bo‘lgan va kam suv iste’mol qadil ekinlar (masalan, ba’zi shakarqalam, gilos, ba‘zi leguminalar) jadvalga kiritiladi.",
    ],
    who: "Agrotexnologiya tizimi, dehqonlar, ilmiy markazlar",
    resources: ["Nav o‘qitish dasturlari", "Sipari shakllantirish (demonstratsiya maydonchalari)", "Dehqonlar bilan qo‘llab-quvvatlash"],
    benefit: ["Hosil barqarorligining oshishi", "Suv va o‘g‘it sarfining kamayishi", "Iqlim xavflariga chidamli bo‘lish"],
    limits: ["Navlarni sinov va tarqatish vaqti", "Bozor ijobiy qabul qilishi"],
  },
  {
    slug: "tuproq-saqlash",
    title: "Tuproq namligini saqlash",
    direction: "qishloq",
    solves: "Tuproq namligi va cho‘llanish",
    solvesSlugs: ["chollanish", "qurg'oqchilik", "muzliklar"],
    how: [
      "Tuproqni qoplamli (mulch) saqlash, qoldiqdan foydalanish va ekinlarni qoldiq bilan qoplamoqda buxarlanish kamayadi.",
      "Qatliysiz ishlov (no-till) texnologiyasi tuproq tuzilmasi va suv qabul qilishni saqlab qoladi.",
    ],
    who: "Dehqon xo‘jaliklari, fermer xo‘jaliklari",
    resources: ["Mulch materiallari yoki ekin qoldiqlari", "No-till texnika", "Agro o‘qituv"],
    benefit: ["Tuproq namligining 20–30% gacha ko‘proq saqlanishi", "Buxarlanishning kamayishi", "Tuproq eroziyasining kamayishi"],
    limits: ["Boshlang‘ich moslashuv davri", "Ba’zi texnik talablarga qo‘shilish"],
  },
  {
    slug: "barqaror-dehqonchilik",
    title: "Barqaror dehqonchilik",
    direction: "qishloq",
    solves: "Tuproq salomatligi va kimyoviy yuki",
    solvesSlugs: ["chollanish", "bioxilma-xillik", "ishqlarga-ta'sir"],
    how: [
      "Ekin rotatsiyasi, yashil o‘g‘itlar va organik moddalar tuproq unurliligini tiklaydi.",
      "Kombinatsiyalashgan zararkunandaga qarshi kurash (IPM) kimyoviy moddalarni kamaytiradi, foydali hasharotlar asosiy himoya vazifasini bajaradi.",
    ],
    who: "Dehqon xo‘jaliklari, fermer xo‘jaliklari, agroekologiya tashkilotlari",
    resources: ["Agroekologik bilim", "Yerli urug‘ va navlar", "Jamoa hamkorligi"],
    benefit: ["Tuproq unurliligi va bioturg‘unlikning oshishi", "Kimyoviy sarflar va xarajatlarining kamayishi", "Eko xizmatlar (changlatuvchilar, tuproq mikroflorasi)"],
    limits: ["O‘zgarish natijasi uzoq muddatli", "Boshlang‘ich fasonliligi (rotatsiya davrda)"],
  },
  {
    slug: "sugorish-samaradorligi",
    title: "Sug‘orish samaradorligi",
    direction: "qishloq",
    solves: "Sug‘orish suvi samaradorligi",
    solvesSlugs: ["suv-tanqisligi", "muzliklar", "ishqlarga-ta'sir"],
    how: [
      "Sug‘oriladigan maydonlarni nazorat qilish: suv sarfi va hosil nisbatini kuzatish, quruq sug‘orish vaqtini o‘zgartirish.",
      "Doimiy sug‘orish va bosim bilan boshqariladigan zaxiralarni muvofiqlashtirish (kanallar tizimida).",
    ],
    who: "Sug‘orish tizimlarini boshqaruvchi tashkilotlar, viloyatlar, dehqon xo‘jaliklari",
    resources: ["Monitoring va o‘lchash", "Reja tizimi", "Moliyaviy resurslar tizimi"],
    benefit: ["Bir birligi suvga hosilning oshishi", "Daryo va suv omborlarida bosimning kamayishi", "Uzoq muddatli suv xavfsizligi"],
    limits: ["Tizim bosimida ko‘p tomonlama boshqaruv talab etadi", "Ma’lumotlar infratuzilmasi kerak"],
  },
  // SHAHAR
  {
    slug: "yashil-hududlar",
    title: "Yashil hududlar",
    direction: "shahar",
    solves: "Shahar issiqligi va havo sifati",
    solvesSlugs: ["havo-ifloslanishi", "global-isish", "qurg'oqchilik"],
    how: [
      "Park, bog‘ va yashil zonalar shahar haroratini pastga tushiradi (sovuq orol effekti), chang zarralarni tutadi va yog‘in suvlari yutishini yaxshilaydi.",
      "Mavjud hududlarni ta’mirlash va yangi mikro hududlarda yashil zonalarni rejali joylash.",
    ],
    who: "Shahar boshqaruvi, kommunal tizim, jamoat tashabbuslari",
    resources: ["Reja maydonchalari", "Urug‘ va ko‘chatlar", "Parvarish jamoasi (suv, kirib chiqish)"],
    benefit: ["Lokal haroratning bir necha gradusgacha pastga tushishi", "Havo sifati va aholi salomatligining yaxshilanishi", "Jamoatchilik qulay muhiti"],
    limits: ["Shahar maydonining cheklanganligi", "Davomiy parvarish va sug‘orish talab etadi"],
  },
  {
    slug: "daraxt-ekish",
    title: "Daraxt ekish va parvarish",
    direction: "shahar",
    solves: "CO2 so‘rishi, harorat va cho‘llanishga qarshi himoya",
    solvesSlugs: ["chollanish", "global-isish", "havo-ifloslanishi", "oral-inqirozi"],
    how: [
      "Hudud iqlimiga mos turlar (qarag‘ay, novvoy, terak, qayrag‘och) ekiladi va birinchi 3–5 yil parvarish qilinadi.",
      "Orol dengizi sohilida himoya yog‘ochlari belgisi — tuzli-chang bo‘ronlariga qarshi tabiiy to‘siq vazifasini bajaradi.",
      "O‘zbekiston dunyoning 1 milliard daraxt ekish dasturiga qo‘shilib, 2030-yilgacha 1 milliard daraxt ekish maqsadini e’lon qilgan.",
    ],
    who: "Jamoatchilik, maktablar, tashkilotlar, munitsipalitetlar",
    resources: ["Ko‘chatlar (yerli turlar)", "Ko‘chat o‘rnatish va sug‘orish", "Parvarish rejalari va monitoring"],
    benefit: ["O‘sib yetilgan daraxtlar yiliga ~20–25 kg CO2 so‘ra oladi (taxmin)", "Harorat pastga tushadi, havo tozalaydi", "Cho‘llanishga qarshi himoya to‘siqlari"],
    limits: ["Natija uzoq muddatli (o‘sish va o‘lim darajasini kuzatish kerak)", "Suv resurslariga bog‘liq", "Faqat ekish emas — parvarish hal qiluvchi"],
    source: "O‘zbekiston 1 milliard daraxt dasturi (ochiq manbalar)",
  },
  {
    slug: "jamoat-transporti",
    title: "Jamoat transporti",
    direction: "shahar",
    solves: "Transport emissiyasi va shahar havo sifati",
    solvesSlugs: ["havo-ifloslanishi", "chiqindilar-igg"],
    how: [
      "Metro, avtobus va elektr trolleybus tarmoqlarini kengaytirish; yo‘lovchi raqamini oshirish.",
      "O‘zbekistonda avtobus floti gaz va elektr texnika tomoniga ko‘chmoqda, metro tizimi faol rivojlanmoqda.",
    ],
    who: "Shahar transport boshqaruvi, munitsipalitetlar",
    resources: ["Elektr/gaz tashuvchi texnika", "Tranzit infratuzilma", "Bilet tizimining raqamlashtirilishi"],
    benefit: ["Bir kelish uchun emissiyaning sezilarli kamayishi", "Shahar havo sifati yaxshilanadi", "Tibbiyot va shovqin kamayadi"],
    limits: ["Katta kapital sarf", "Yo‘lovchi odatlarini o‘zgartirish", "Tarmoq samaradorligi nazorati"],
  },
  {
    slug: "chiqindi-saralash",
    title: "Chiqindilarni saralash",
    direction: "shahar",
    solves: "Chiqindi poligonlari va qayta ishlab chiqarish",
    solvesSlugs: ["chiqindilar-igg", "bioxilma-xillik"],
    how: [
      "Xonadon va tashkilotlarda chiqindilar qayta ishlanadigan (plastik, oyna, qog‘oz, metal) va qoldiq qismlarga saralanadi.",
      "Samarador saralash orqali qayta ishlab chiqarish oqimi oshadi va poligonga tushadigan hajm kamayadi.",
    ],
    who: "Xonadonlar, maktablar, tashkilotlar, kommunal tizim",
    resources: ["Sarlavha konteynerlar", "Jamoatchilik ta’limi", "Qayta ishlash nuqtalari"],
    benefit: ["Poligon hajmning kamayishi (metan emissiya bilan)", "Ikkilamchi xom asbob manbai", "Ekologik madaniyat shakllanadi"],
    limits: ["Qayta ishlab chiqarish zanjirining yetishmasligi", "Doimiy saralash odatiga muhtoj"],
  },
  {
    slug: "yashil-qurilish",
    title: "Yashil qurilish",
    direction: "shahar",
    solves: "Qurilishda ekologik yuki va resurslar",
    solvesSlugs: ["chiqindilar-igg", "havo-ifloslanishi"],
    how: [
      "Energo samarador dizayn, yerli va qayta ishlangan materiallar, suv tejovchi sanitar-texnik tizimlar.",
      "Yashil tomlar va devorlar issiq izolyatsiya va havo sifati vazifalarini birga bajaradi.",
    ],
    who: "Qurilish kompaniyalari, arxitektorlar, shahar boshqaruvi",
    resources: ["Yashil qurilish standartlari", "Materiallarga eksport", "Texnik o‘qituv"],
    benefit: ["Qurilish xarajatlarining kamayishi", "Issiqlik va suv sarfining kamayishi", "Bino umrining uzayishi"],
    limits: ["Materiallar narxi yuqoriroq", "Sifat nazorati talab etadi", "Mos texnik kadrlar"],
  },
];

export function getSolution(slug: string) {
  return SOLUTIONS.find((s) => s.slug === slug);
}
