import "dotenv/config";
import { randomUUID } from "crypto";
import { db } from "./index";
import {
  users,
  projects,
  regionData,
  sources,
  goals,
  actions,
  projectSupports,
} from "./schema";
import { hashPassword } from "@/lib/auth";
import { eq } from "drizzle-orm";

const day = (n: number) => new Date(Date.now() - n * 86400000);

async function main() {
  const [admin] = await db.select().from(users).where(eq(users.email, "admin@climate.uz")).limit(1);
  if (admin) {
    console.log("Seed allaqachon bajarilgan — o'tkazib yuborildi.");
    return;
  }

  const adminId = randomUUID();
  const demoId = randomUUID();

  await db.insert(users).values([
    {
      id: adminId,
      name: "Administrator",
      email: "admin@climate.uz",
      passwordHash: hashPassword("admin1234"),
      role: "admin",
    },
    {
      id: demoId,
      name: "Dilnoza Karimova",
      email: "user@demo.uz",
      passwordHash: hashPassword("demo1234"),
      role: "user",
    },
  ]);

  await db.insert(sources).values([
    { id: randomUUID(), name: "IPCC", url: "https://www.ipcc.ch/", category: "Global iqlim ilmi", note: "Iqlim o‘zgarishi bo‘yicha hukumatlararo panel" },
    { id: randomUUID(), name: "NASA Climate", url: "https://climate.nasa.gov/", category: "Global iqlim ilmi", note: "Iqlim vitalsigns monitoringi" },
    { id: randomUUID(), name: "WMO", url: "https://wmo.int/", category: "Ob-havo va iqlim", note: "Birlashgan Millatlar Tashkiloti Jahon meteorologiya tashkiloti" },
    { id: randomUUID(), name: "UNEP", url: "https://www.unep.org/", category: "Ekologiya", note: "BMT Atrof-muhit dasturi" },
    { id: randomUUID(), name: "FAO", url: "https://www.fao.org/", category: "Qishloq xo‘jaligi", note: "BMT Oziq-ovqat va qishloq xo‘jaligi tashkiloti" },
    { id: randomUUID(), name: "World Bank", url: "https://www.worldbank.org/en/country/uzbekistan", category: "Iqtisodiyot", note: "Jahon banki — O‘zbekiston" },
    { id: randomUUID(), name: "UNDP O‘zbekiston", url: "https://www.uzbekistan.undp.org/", category: "O‘zbekiston", note: "BMT taraqqiyot dasturi — mamlakat hisobotlari" },
    { id: randomUUID(), name: "UNFCCC", url: "https://www4.unfccc.int/ndc/", category: "Emissiyalar", note: "Iqlim bo‘yicha doimiy konferensiya — NDC" },
    { id: randomUUID(), name: "WHO", url: "https://www.who.int/", category: "Salomatlik", note: "Jahon sog‘liqni saqlash tashkiloti" },
    { id: randomUUID(), name: "IQAir", url: "https://www.iqair.com/", category: "Havo sifati", note: "Shaharlar havo sifati reytingi" },
  ]);

  await db.insert(projects).values([
    {
      id: randomUUID(),
      title: "Orol sohilida himoya yog‘ochlari belgisi (10 ha)",
      category: "tabiat",
      region: "Qoraqalpog‘iston Respublikasi",
      description:
        "Aral dengizi pastang‘ida 10 gektar maydonda himoya yog‘ochlari belgisi tashkil etish: qayrag‘och va novvoy ko‘chatlari ekish, 3 yillik sug‘orish va parvarish rejasini ishlab chiqish. Lazer rangi tuzli-chang bo‘ronlariga qarshi tabiiy to‘siq vazifasini bajaradi. Jamoaga biologiya yo‘nalishi talabalari va mahalliy fermerlar jalb etiladi.",
      orgName: "Xiva tabiat jamiyati",
      authorName: "Aziz Allamurodov",
      status: "approved",
      isDemo: true,
      likes: 24,
      createdAt: day(42),
    },
    {
      id: randomUUID(),
      title: "Toshkent maktablarida chiqindilarni saralash dasturi",
      category: "targ'ibot",
      region: "Toshkent shahri",
      description:
        "12 ta maktabda chiqindilarni saralash dasturini joriy etish: sarlavha konteynerlari, oquv darslari va oylig 'toza hovli' raqobat. Natija — poligonga tushadigan chiqindi hajmini 20% ga kamaytirish (demo maqsad).",
      orgName: "Ekologik ta'lim jamg'armasi",
      authorName: "Malika Yusupova",
      status: "approved",
      isDemo: true,
      likes: 18,
      createdAt: day(25),
    },
    {
      id: randomUUID(),
      title: "Tomchilatib sug'orish sinov maydonchasi",
      category: "suv",
      region: "Farg‘ona viloyati",
      description:
        "Farg‘ona viloyatidagi 2 gektar sinov maydonchasida tomchilatib sug‘orish va qovurilgan sug‘orishni solishtirma tahlil qilish: suv sarfi, hosil va tuproq tuzlanishi ko‘rsatkichlari. Natijalar mahalliy fermerlarga ochiq taqdim etiladi.",
      orgName: "Farg‘ona davlat agrar universiteti",
      authorName: "Jasur Rahimov",
      status: "approved",
      isDemo: true,
      likes: 15,
      createdAt: day(14),
    },
    {
      id: randomUUID(),
      title: "Shahar issiq oroli monitoringi (mikro sensorlar)",
      category: "texnologiya",
      region: "Toshkent shahri",
      description:
        "Toshkentning 8 ta hududida arzon harorat namlik sensorlarini o‘rnatish va harorat harakatlanishini ochiq platformada nashr etish. Maqsad — shahar issiq oroli xaritasini yaratish va yashil hududlarni rejalashtirishda ishlatish (demo).",
      orgName: "Open Climate Uz jamoasi",
      authorName: "Sardor Abdullayev",
      status: "approved",
      isDemo: true,
      likes: 11,
      createdAt: day(6),
    },
    {
      id: randomUUID(),
      title: "O‘rta maktab o‘quvchilari uchun iqlim maktabi",
      category: "targ'ibot",
      region: "Namangan viloyati",
      description:
        "Namangan shahridagi o‘rta maktab o‘quvchilari uchun 12 shabraklik iqlim o‘qitish dasturi: iqlim asoslari, suv va energiya tejash, kichik tajribalar. Ustozlar uchun uslubiy qo‘llanma tayyorlanadi (demo).",
      orgName: "Namangan pedagogika instituti",
      authorName: "Gulnora Ismoilova",
      status: "pending",
      isDemo: true,
      likes: 3,
      createdAt: day(2),
    },
  ]);

  await db.insert(goals).values([
    { id: randomUUID(), userId: demoId, type: "water", targetValue: 1500, unit: "l", createdAt: day(30) },
    { id: randomUUID(), userId: demoId, type: "energy", targetValue: 80, unit: "kWh", createdAt: day(30) },
  ]);

  await db.insert(actions).values([
    { id: randomUUID(), userId: demoId, type: "water", value: 60, unit: "l", note: "Dush vaqtini qisqartirdim", createdAt: day(12) },
    { id: randomUUID(), userId: demoId, type: "water", value: 45, unit: "l", note: "Yuvish mashinasini to'liq yuk bilan ishlattim", createdAt: day(9) },
    { id: randomUUID(), userId: demoId, type: "energy", value: 12, unit: "kWh", note: "LED o'tkazish", createdAt: day(8) },
    { id: randomUUID(), userId: demoId, type: "waste", value: 2.4, unit: "kg", note: "Oyna va plastikni saraladim", createdAt: day(5) },
    { id: randomUUID(), userId: demoId, type: "tree", value: 3, unit: "daraxt", note: "Ko'chada yangi ekilgan daraxtlarni suv berdik (parvarish)", createdAt: day(3) },
    { id: randomUUID(), userId: demoId, type: "water", value: 80, unit: "l", note: "Gul zara sug'orishni tomchilatib qildim", createdAt: day(1) },
  ]);

  await db.insert(projectSupports).values([
    { id: randomUUID(), projectId: (await db.select().from(projects).limit(1))[0].id, userId: demoId, role: "member", createdAt: day(10) },
  ]);

  await db.insert(regionData).values([
    {
      id: randomUUID(),
      regionKey: "toshkent-shahri",
      metric: "air",
      value: "Qishda PM2.5 piklari — mintaqadagi eng iflos shaharlardan biri",
      severity: 2,
      scope: "hudud",
      source: "IQAir",
      year: 2023,
      isDemo: false,
    },
    {
      id: randomUUID(),
      regionKey: "fargona",
      metric: "water",
      value: "Farg‘ona vodiysining suv eng yetishmaydigan qismi",
      severity: 3,
      scope: "hudud",
      source: "UNDP / FAO",
      isDemo: false,
    },
    {
      id: randomUUID(),
      regionKey: "jizzax",
      metric: "drought",
      value: "Namuna qator: admin paneldan boshqariladigan demo ma'lumot",
      severity: 1,
      scope: "hudud",
      source: "Platforma demo",
      isDemo: true,
    },
  ]);

  console.log("Seed muvaffaqiyatli yakunlandi.");
  console.log("Admin: admin@climate.uz / admin1234");
  console.log("Demo foydalanuvchi: user@demo.uz / demo1234");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => process.exit(0));
