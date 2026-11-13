import { PROBLEMS, getProblem } from "./data/problems";
import { SOLUTIONS, getSolution } from "./data/solutions";
import { getRegion, REGIONS, METRICS } from "./data/regions";
import { RESEARCH } from "./data/research";

export type AiMessage = { role: "user" | "assistant"; content: string };
export type AiContext = { problem?: string; region?: string };
export type AiReply = {
  answer: string;
  sources: { name: string; url?: string }[];
  mode: "model" | "offline";
  disclaimer: string;
};

const SYSTEM_PROMPT = `Siz "CLIMATE UZBEKISTAN" platformasining iqlim yordamchisisiz — O'zbekiston va Markaziy Osiyo iqlimi bo'yicha professional maslahatchi.
Qat'iy qoidalar:
1. JAVOBLARNI FAQAT BIRINCHI BLOKDA BERILGAN ILMIY MA'LUMOTLAR VA ISHONCHLI MANBALARGA ASOSLANIB BERING.
2. O'ylab topilgan raqamlar, faktlar yoki kuzatishlarni HAOCHDA KIRITMANG. Ma'lumot yetarli bo'lmasa, "Ma'lumot mavjud emas" deb ochiq ayting.
3. Har bir muhim da'voning orqasida manbani qavs ichida ko'rsating (masalan: (UNDP, 2021)).
4. Tavsiyalarni har doim ularning cheklovlari bilan birga bering.
5. O'zbek tilida, lotin yozuvida, qisqa va tuzilgan jumladan javob bering.
6. Hisob-kitoblar va bashoratlar taxminiy ekanini har doim eslatib turing.`;

function buildGrounding(ctx: AiContext): string {
  const parts: string[] = [];
  const p = ctx.problem ? getProblem(ctx.problem) : undefined;
  if (p) {
    parts.push(
      `MUAMMO: ${p.title}\nIlmiy asos: ${p.science.join(" ")}\nSabablar: ${p.causes.join("; ")}\nO'zbekistonga ta'siri: ${p.uzImpact.join("; ")}\nStatistika: ${p.stats
        .map((s) => `${s.label} = ${s.value} (${s.source})`)
        .join("; ")}`
    );
  }
  const r = ctx.region ? getRegion(ctx.region) : undefined;
  if (r) {
    const rows = METRICS.map((m) => {
      const d = r.data[m.key];
      return d ? `${m.label}: ${d.value} [${d.scope}, ${d.source}${d.year ? ", " + d.year : ""}]` : `${m.label}: ma'lumot mavjud emas`;
    }).join("\n");
    parts.push(
      `HUDUD: ${r.name}\n${rows}\nEkologik xavflar: ${r.risks ? r.risks.join("; ") : "ma'lumot mavjud emas"}`
    );
  }
  if (!p && !r) {
    parts.push(
      `PLATFORMA MUAMMOLARI: ${PROBLEMS.map((x) => x.title).join("; ")}\nYECHIMLAR: ${SOLUTIONS.map((x) => x.title).join("; ")}\nHUDUDLAR: ${REGIONS.map((x) => x.short).join("; ")}`
    );
  }
  return "BIRINCHI BLOK (ilmiy ma'lumotlar, ular tashqarisida fakt kiritmang):\n" + parts.join("\n\n");
}

async function callModel(messages: AiMessage[], ctx: AiContext): Promise<string | null> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  const base = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 45000);
  try {
    const res = await fetch(`${base}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model,
        temperature: 0.3,
        messages: [
          { role: "system", content: SYSTEM_PROMPT + "\n\n" + buildGrounding(ctx) },
          ...messages.slice(-10),
        ],
      }),
      signal: controller.signal,
    });
    if (!res.ok) return null;
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content;
    return typeof text === "string" && text.trim() ? text : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function sourceList(ctx: AiContext) {
  const out: { name: string; url?: string }[] = [];
  const p = ctx.problem ? getProblem(ctx.problem) : undefined;
  p?.sources.forEach((s) => out.push(s));
  if (ctx.region) out.push({ name: "UNDP O‘zbekiston — hudud tahlilari", url: "https://www.uzbekistan.undp.org/" });
  if (out.length === 0)
    out.push(
      { name: "IPCC AR6", url: "https://www.ipcc.ch/report/ar6/wg1/" },
      { name: "UNDP O‘zbekiston", url: "https://www.uzbekistan.undp.org/" }
    );
  return out.slice(0, 5);
}

const LIMITS =
  "Cheklov: bu javob ta'limiy xarakterga ega bo'lib, ochiq ilmiy manbalarga asoslangan. Aniq raqamlar va so'nggi ko'rsatkichlar uchun birinchi manbalarga murojaat qiling.";

function offlineAnswer(question: string, ctx: AiContext): AiReply {
  const q = question.toLowerCase();
  const lines: string[] = [];
  const used: { name: string; url?: string }[] = [];

  const problemByKeywords: [RegExp, string][] = [
    [/isish|harorat|global/, "global-isish"],
    [/suv|tanqislik|ko'ch|qurib/, "suv-tanqisligi"],
    [/cho['‘]?llanish|degradatsiya|tuzlanish|yer/, "chollanish"],
    [/aral|oral/, "oral-inqirozi"],
    [/havo|iflos|pm2|tutun/, "havo-ifloslanishi"],
    [/muzlik|glatsiyer|glatsier/, "muzliklar"],
    [/biologik|xilma|tur|hayvon|o'simlik/, "bioxilma-xillik"],
    [/qurg['‘]?oq|ekstremal|issiqlik tolqini|sel/, "qurg'oqchilik"],
    [/qishloq|dehqon|ekin|hosil|paxta|bug'doy/, "ishqlarga-ta'sir"],
    [/chiqindi|issiqxona|emissiya|co2|uglerod/, "chiqindilar-igg"],
  ];
  const matched = problemByKeywords.find(([re]) => re.test(q));
  const p = matched ? getProblem(matched[1]) : ctx.problem ? getProblem(ctx.problem) : undefined;
  const r = ctx.region ? getRegion(ctx.region) : REGIONS.find((x) => q.includes(x.short.toLowerCase()));

  if (p) {
    lines.push(`## ${p.title}`);
    lines.push(...p.science.map((s) => `• ${s}`));
    lines.push("Asosiy sabablar:");
    lines.push(...p.causes.map((c) => `• ${c}`));
    lines.push("O‘zbekiston uchun ta’siri:");
    lines.push(...p.uzImpact.map((u) => `• ${u}`));
    lines.push("Kalij ko‘rsatkichlar:");
    lines.push(...p.stats.map((s) => `• ${s.label}: ${s.value} (${s.source})`));
    used.push(...p.sources);
  }

  if (r) {
    lines.push(`## ${r.name} — monitoring ma'lumotlari`);
    METRICS.forEach((m) => {
      const d = r.data[m.key];
      lines.push(d ? `• ${m.label}: ${d.value} [${d.scope}${d.year ? ", " + d.year : ""}, ${d.source}]` : `• ${m.label}: ma'lumot mavjud emas`);
    });
    lines.push(
      `Ekologik xavflar: ${r.risks ? r.risks.join(", ") : "ma'lumot mavjud emas"}`
    );
  }

  const wantPlan = /reja|rejalashtir|nima qilish|kechada|haftalik/.test(q);
  const wantProject = /loyiha|g'?oya|tadbirkor|lo'yha/.test(q);

  if (wantPlan && !p && !r) {
    lines.push("## Individual ekologik harakat rejasi (umumiy)");
  }
  if (wantPlan) {
    const base = p ? `${p.title} yo'nalishida` : r ? `${r.name} bo'yicha` : "umumiy";
    lines.push(`## ${base} — haftalik harakat rejası`);
    lines.push("• 1-2 kun: uyda suv iste'molini o'lchash (dush, yuvish vaqtlari) va 10% qisqartirish maqsadi.");
    lines.push("• 3-kun: yoritishni LED ga o'tkazish audit, keraksiz rejimlarni o'chirish.");
    lines.push("• 4-kun: chiqindilarni saralash — plastmas, oyna, qog'oz uchun alohida idish.");
    lines.push("• 5-kun: yopiq hududga piyoda yurish yoki jamoat transporti (2 ta sayr).");
    lines.push("• 6-kun: mahalliy daraxtlarga parvarish yoki mahalliy tadbir haqida ma'lumot to'plash.");
    lines.push("• 7-kun: natijalarni platformada qayd etish va keyingi hafta maqsadlarini belgilash.");
    lines.push("Bu reja boshlang'ich darajada; harakatlar platforma 'Harakatlar' bo'limida ro'yxatga olinadi va izlanadi.");
  }

  if (wantProject) {
    lines.push("## Ekologik loyiha g'oyalari (platforma asosida)");
    const sols = p
      ? SOLUTIONS.filter((s) => p.solutionSlugs.includes(s.slug)).slice(0, 2)
      : SOLUTIONS.slice(0, 2);
    sols.forEach((s) => {
      lines.push(`• ${s.title}: ${s.how[0]} Boshqaruvchilar: ${s.who}. Asosiy cheklov: ${s.limits[0]}.`);
    });
    lines.push("Loyiha 'Loyihalar' bo'limida joylashtiriladi, moderatsiyadan o'tgach e'lon qilinadi.");
  }

  if (/suv/.test(q) && !p) {
    lines.push("## Suv tejash — amaliy qoidalar");
    lines.push("• WHO minimal darajasi 20 l/odam/kun; shahar xo'jaligida o'rtacha 100+ l/odam/kun (milliy odatlar bo'yicha).");
    lines.push("• Dushni 5 daqiqa qisqartirish kunga 50–80 l tejashadi (taxmin).");
    lines.push("• Tomchilatib sug'orish qovurilgan sug'orishga nisbatan 30–50% suv tejaydi (FAO).");
    lines.push("• Katta tizim: Toshkent chiqindi suvi tozalash tizimi tozalangan suvni sug'orishda qayta ishlatadi — bu milliy amaliyot namunasidir.");
    used.push({ name: "FAO — Land and Water", url: "https://www.fao.org/land-water/" });
  }
  if (/energiya|elektr/.test(q) && !p) {
    lines.push("## Energiya tejash — amaliy qoidalar");
    lines.push("• LED chiroqlar chiziqli (noriqar) chiroqlarga nisbatan 80% gacha kamroq energiya sarflaydi.");
    lines.push("• Konditsioner 24–26 °C rejimida samarali ishlaydi; har +1 °C sarfni oshiradi.");
    lines.push("• O'zbekistonda xonadon tariflar past, lekin iste'mol o'sishi tarmoq bosimini oshiradi — tejash umumiy foyda beradi.");
    lines.push("• Quyosh energiyasi mintaqada kuchli resurs; xonadon tizimlari uchun imtiyozli kredit dasturlari mavjud (UNDP/IEA).");
  }
  if (/uglerod|co2|iz/.test(q) && !p) {
    lines.push("## Uglerod izi — aniq chiziqlar");
    lines.push("• Avtomobil (bensin) ~0,17 kg CO2/km; jamoat transporti ~0,05 kg/km (xalqaro o'rtacha koeffitsiyentlar).");
    lines.push("• O'zbekiston tarmog'idagi elektr ~0,5 kg CO2/kWh (tarmoq strukturasiga qarab taxmin).");
    lines.push("• Aniq shaxsiy hisob uchun platforma 'Uglerod izi kalkulyatori'ni ishlating — koeffitsiyentlar va formulalar ochiq.");
    used.push({ name: "Global Carbon Project", url: "https://www.globalcarbonproject.org/" });
  }
  if (/daraxt/.test(q) && !p) {
    lines.push("## Daraxtlar haqida aniq chiziqlar");
    lines.push("• O'sib yetilgan daraxt o'rtacha yiliga ~20–25 kg CO2 so'rashi mumkin (tur va iqlimga bog'liq — taxmin).");
    lines.push("• O'zbekiston '1 milliard daraxt' dasturiga qo'shildi (2030 maqsadi).");
    lines.push("• Muhimi — ekish emas, parvarish: birinchi 3–5 yilda sug'orish va nazorat o'lim darajasini kamaytiradi.");
  }

  if (lines.length === 0) {
    lines.push("## Men sizga qanday yordam bera olaman");
    lines.push("• Istalgan iqlim muammosini (masalan, 'Aral dengizi haqida so'rang', 'havo ifloslanishi nima uchun kuchaydi') ilmiy asos va statistika bilan tushuntirib beraman.");
    lines.push("• Hududga (13 viloyat) mos monitoring ma'lumotlarini va tavsiyalarni beraman.");
    lines.push("• Suv, energiya, uglerod izi bo'yicha amaliy qoidalar va hisob-kitoblar taklif etaman.");
    lines.push("• Individual harakat rejası yoki loyiha g'oyasi tuzishga yordam beraman.");
    lines.push("Ma'lumotlar uchun: IPCC, UNDP, WMO, UNEP, FAO, WHO, World Bank ochiq hisobotlaridan foydalanaman. Aniq manba bo'lmagan raqamlarni kiritmayman.");
    used.push(...RESEARCH.slice(0, 3).map((x) => ({ name: `${x.org} — ${x.title}`, url: x.url })));
  }

  lines.push("Manbalar:");
  used.forEach((s) => lines.push(`— ${s.name}${s.url ? ` (${s.url})` : ""}`));
  lines.push(LIMITS);

  return { answer: lines.join("\n"), sources: used, mode: "offline", disclaimer: LIMITS };
}

export async function askAssistant(
  messages: AiMessage[],
  ctx: AiContext = {}
): Promise<AiReply> {
  const last = messages[messages.length - 1];
  if (!last || !last.content.trim()) {
    return {
      answer: "Iltimos, savol yozing.",
      sources: [],
      mode: "offline",
      disclaimer: LIMITS,
    };
  }
  const modelText = await callModel(messages, ctx);
  if (modelText) {
    return { answer: modelText, sources: sourceList(ctx), mode: "model", disclaimer: LIMITS };
  }
  return offlineAnswer(last.content, ctx);
}
