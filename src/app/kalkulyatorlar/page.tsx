"use client";

import { useEffect, useState, type ReactNode } from "react";
import { PageHero, Badge, Card } from "@/components/ui";
import { Icon } from "@/components/Icons";

function Num({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-[13px]">
        <span className="font-bold text-ink/75 dark:text-soft/75">{label}</span>
        <span className="rounded-md bg-emerald/10 px-2 py-0.5 font-bold text-emerald-deep dark:text-emerald">
          {value.toLocaleString()} {unit ?? ""}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full"
      />
    </div>
  );
}

function ResultRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-3 rounded-lg px-3.5 py-2.5 ${highlight ? "bg-emerald/10" : "bg-beige/50 dark:bg-ink3"}`}>
      <span className="text-[13px] font-semibold text-ink/70 dark:text-soft/70">{label}</span>
      <span className={`font-display text-[15px] font-bold ${highlight ? "text-emerald-deep dark:text-emerald" : ""}`}>{value}</span>
    </div>
  );
}

function CalcShell({
  id,
  icon,
  title,
  note,
  children,
  results,
  formula,
}: {
  id: string;
  icon: string;
  title: string;
  note: string;
  children: ReactNode;
  results: ReactNode;
  formula: string;
}) {
  return (
    <div id={id} className="scroll-mt-24 grid gap-5 lg:grid-cols-2">
      <Card className="p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
            <Icon name={icon} className="h-5.5 w-5.5" />
          </span>
          <div>
            <h3 className="font-display text-lg font-bold">{title}</h3>
            <p className="text-[12px] text-ink/55 dark:text-soft/55">{note}</p>
          </div>
        </div>
        <div className="mt-6 grid gap-5">{children}</div>
      </Card>
      <Card className="flex flex-col p-6">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald">Natija</span>
          <Badge tone="warn">Taxminiy hisob</Badge>
        </div>
        <div className="mt-4 grid flex-1 gap-2">{results}</div>
        <div className="mt-4 rounded-lg border border-line bg-beige/40 p-3 dark:border-linedark dark:bg-ink3">
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/45 dark:text-soft/45">Ochiq formula</div>
          <code className="mt-1 block text-[12px] font-semibold leading-relaxed text-ink/70 dark:text-soft/70">{formula}</code>
        </div>
      </Card>
    </div>
  );
}

function WaterCalc() {
  const [people, setPeople] = useState(3);
  const [shower, setShower] = useState(6);
  const [lpm, setLpm] = useState(10);
  const [laundry, setLaundry] = useState(3);
  const [garden, setGarden] = useState(20);
  const daily = people * (shower * lpm) + (laundry * 60) / 7 + garden / 7;
  const minDaily = people * 20;
  return (
    <CalcShell
      id="cal-suv-istemo-li"
      icon="droplet"
      title="Suv iste’moli kalkulyatori"
      note="Xonadon kunlik suv sarfini baholaydi"
      formula="Kunlik L = odamlar × (dush daqiqasi × litr/daq) + yuvish×60 l/7 + bog'/7"
      results={
        <>
          <ResultRow label="Kunlik iste’mol (taxminan)" value={`${daily.toFixed(0)} l`} highlight />
          <ResultRow label="Oylik (30 kun)" value={`${(daily * 30).toFixed(0)} l`} />
          <ResultRow label="Yillik" value={`${(daily * 365 / 1000).toFixed(1)} m³`} />
          <ResultRow label="WHO minimal zaruriy daraja" value={`${minDaily.toFixed(0)} l/kun (20 l/odam)`} />
          <ResultRow label="10% tejash — yillik foyda" value={`${((daily * 365) / 10 / 1000).toFixed(1)} m³`} highlight />
        </>
      }
    >
      <Num label="Xonadonda yashovchilar" value={people} onChange={setPeople} min={1} max={10} unit="odam" />
      <Num label="Dush vaqti" value={shower} onChange={setShower} min={1} max={30} unit="daqiqa" />
      <Num label="Dush oqimi" value={lpm} onChange={setLpm} min={4} max={20} unit="l/daqiqa" />
      <Num label="Yuvish mashinasi (haftasiga)" value={laundry} onChange={setLaundry} min={0} max={14} step={1} unit="marta" />
      <Num label="Bog‘ / tashqi sug‘orish (haftasiga)" value={garden} onChange={setGarden} min={0} max={200} step={5} unit="l" />
    </CalcShell>
  );
}

function EnergyCalc() {
  const [lights, setLights] = useState(2);
  const [fridge, setFridge] = useState(1);
  const [tv, setTv] = useState(0.8);
  const [ac, setAc] = useState(4);
  const [other, setOther] = useState(1);
  const daily = lights + fridge + tv + ac + other;
  const year = daily * 365;
  const [tariff, setTariff] = useState(1.4);
  const ledSave = lights * 0.8 * 365;
  return (
    <CalcShell
      id="cal-elektr-energiyasi"
      icon="calculator"
      title="Elektr energiyasi kalkulyatori"
      note="O‘rtacha xonadon sarfi va tejash imkoniyatlari"
      formula="Kunlik kWh = yoritish + pishloqxonasi + TV + konditsioner + boshqa; TO'LOV = kWh × tarif"
      results={
        <>
          <ResultRow label="Kunlik iste’mol" value={`${daily.toFixed(1)} kWh`} highlight />
          <ResultRow label="Yillik" value={`${year.toFixed(0)} kWh`} />
          <ResultRow label={`Oylik to‘lov (${tariff} so‘m/kWh)`} value={`${((daily * 30) * tariff).toLocaleString()} so‘m`} />
          <ResultRow label="CO2 (0,5 kg/kWh — taxmin)" value={`${(year * 0.5).toFixed(0)} kg/yil`} />
          <ResultRow label="LED o‘tkazish: yillik tejash" value={`${ledSave.toFixed(0)} kWh (≈ ${(ledSave * tariff).toLocaleString()} so‘m)`} highlight />
        </>
      }
    >
      <Num label="Yoritish (kuniga)" value={lights} onChange={setLights} min={0} max={10} step={0.5} unit="kWh" />
      <Num label="Pishloqxonasi (kuniga)" value={fridge} onChange={setFridge} min={0} max={4} step={0.5} unit="kWh" />
      <Num label="Televizor / internet (kuniga)" value={tv} onChange={setTv} min={0} max={4} step={0.2} unit="kWh" />
      <Num label="Konditsioner (kuniga, o‘rtacha fasl)" value={ac} onChange={setAc} min={0} max={16} step={0.5} unit="kWh" />
      <Num label="Boshqa texnika (kuniga)" value={other} onChange={setOther} min={0} max={6} step={0.5} unit="kWh" />
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-bold text-ink/75 dark:text-soft/75">Tarif (so‘m/kWh)</span>
        <input
          type="number"
          value={tariff}
          onChange={(e) => setTariff(Number(e.target.value) || 0)}
          min={0}
          step={0.1}
          className="w-28 rounded-lg border border-line bg-white px-3 py-2 text-right text-[13px] font-bold outline-none focus:border-emerald dark:border-linedark dark:bg-ink3"
        />
      </div>
    </CalcShell>
  );
}

function CarbonCalc() {
  const [car, setCar] = useState(400);
  const [publicKm, setPublicKm] = useState(150);
  const [flights, setFlights] = useState(0);
  const [elec, setElec] = useState(150);
  const [meat, setMeat] = useState(2);
  const total = car * 0.17 + publicKm * 0.05 * 12 + flights * 250 + elec * 0.5 * 12 + meat * 25 * 52;
  const trees = total / 22;
  return (
    <CalcShell
      id="cal-uglerod-izi"
      icon="cloud"
      title="Uglerod izi kalkulyatori"
      note="Shaxsiy yillik CO2e byudjeti (xalqaro o‘rtacha koeffitsiyentlar)"
      formula="CO2 = km_mashina×0,17 + km_jamoat×0,05 + parvoz×250 + kWh×0,5 + go'sht_kg×25 (kg/yil)"
      results={
        <>
          <ResultRow label="Yillik CO2e (taxminan)" value={`${total.toFixed(0)} kg`} highlight />
          <ResultRow label="Tonnda" value={`${(total / 1000).toFixed(2)} t/yil`} />
          <ResultRow label="O‘zbekiston o‘rtacha aholiga taqqoslash" value={total > 2000 ? "o‘rtachadan yuqori" : "o‘rtacha darajada yoki past"} />
          <ResultRow label="Bitta yilni neytrallash uchun (22 kg/daraxt)" value={`≈ ${Math.ceil(trees)} daraxt`} highlight />
        </>
      }
    >
      <Num label="Avtomobilda masofa (oyiga)" value={car} onChange={setCar} min={0} max={3000} step={50} unit="km" />
      <Num label="Jamoat transporti (oyiga)" value={publicKm} onChange={setPublicKm} min={0} max={2000} step={25} unit="km" />
      <Num label="Xalqaro parvozlar (yiliga)" value={flights} onChange={setFlights} min={0} max={12} unit="ta" />
      <Num label="Elektr (oyiga)" value={elec} onChange={setElec} min={0} max={1500} step={10} unit="kWh" />
      <Num label="Go‘sht ekinlari (haftasiga)" value={meat} onChange={setMeat} min={0} max={10} step={0.5} unit="kg" />
    </CalcShell>
  );
}

function WasteCalc() {
  const [family, setFamily] = useState(4);
  const [perPerson, setPerPerson] = useState(2);
  const [recyclable, setRecyclable] = useState(20);
  const week = family * perPerson;
  const year = week * 52;
  const recY = (year * recyclable) / 100;
  const co2 = recY * 0.8;
  return (
    <CalcShell
      id="cal-chiqindilar-hajmi"
      icon="recycle"
      title="Chiqindilar hajmi kalkulyatori"
      note="Xonadon yillik chiqindi hajmi va qayta ishlash foydasi"
      formula="Yillik kg = oila × kg/hafta × 52; CO2 tejash = qayta ishlanadigan kg × 0,8"
      results={
        <>
          <ResultRow label="Haftalik chiqindi" value={`${week.toFixed(1)} kg`} />
          <ResultRow label="Yillik chiqindi" value={`${year.toFixed(0)} kg`} highlight />
          <ResultRow label="Saralansa, qayta ishlanadi" value={`${recY.toFixed(0)} kg/yil`} />
          <ResultRow label="CO2 tejash (taxminan)" value={`${co2.toFixed(0)} kg/yil`} highlight />
          <ResultRow label="Tasodifiy solishtirish" value={`${Math.ceil(year / 12)} ta 12 kg lik chelik`} />
        </>
      }
    >
      <Num label="Oila a’zolari" value={family} onChange={setFamily} min={1} max={10} unit="odam" />
      <Num label="Birlashgan chiqindi (odam/hafta)" value={perPerson} onChange={setPerPerson} min={0.5} max={5} step={0.5} unit="kg" />
      <Num label="Siraladigan ulush (plastik, oyna, qog‘oz)" value={recyclable} onChange={setRecyclable} min={0} max={100} step={5} unit="%" />
    </CalcShell>
  );
}

function TreeCalc() {
  const [trees, setTrees] = useState(50);
  const [years, setYears] = useState(10);
  const [survival, setSurvival] = useState(70);
  const matureFactor = Math.min(1, years / 10);
  const alive = Math.round(trees * (survival / 100));
  const yearCo2 = alive * 22 * matureFactor;
  const totalCo2 = yearCo2 * years * 0.7;
  return (
    <CalcShell
      id="cal-daraxt-ekish-ta-siri"
      icon="leaf"
      title="Daraxt ekishning taxminiy ekologik ta’siri"
      note="Faqat haqiqiy ekilgan va parvarish qilingan daraxtlar uchun"
      formula="CO2/yil = tirik daraxtlar × 22 kg × min(1, yosh/10); jami = yillik × yillar × 0,7 (o'sish orttacha)"
      results={
        <>
          <ResultRow label={`Tirik daraxtlar (${survival}% omon qolish)`} value={`${alive} ta`} />
          <ResultRow label="Joriy yil CO2 so‘rish (taxmin)" value={`${yearCo2.toFixed(0)} kg`} highlight />
          <ResultRow label={`${years} yilda jami (taxmin)`} value={`${(totalCo2 / 1000).toFixed(2)} t`} highlight />
          <ResultRow label="Shuningdek" value="harorat pasayishi, havo tozalash, chang to‘siqi" />
        </>
      }
    >
      <Num label="Ekilgan daraxtlar" value={trees} onChange={setTrees} min={1} max={1000} step={5} unit="ta" />
      <Num label="Daraxtlar yoshi (parvarish)" value={years} onChange={setYears} min={1} max={30} unit="yil" />
      <Num label="Omon qolish darajasi (parvarish bilan)" value={survival} onChange={setSurvival} min={30} max={100} step={5} unit="%" />
    </CalcShell>
  );
}

const TABS = [
  { id: "cal-suv-istemo-li", label: "Suv", icon: "droplet" },
  { id: "cal-elektr-energiyasi", label: "Elektr", icon: "calculator" },
  { id: "cal-uglerod-izi", label: "Uglerod izi", icon: "cloud" },
  { id: "cal-chiqindilar-hajmi", label: "Chiqindilar", icon: "recycle" },
  { id: "cal-daraxt-ekish-ta-siri", label: "Daraxtlar", icon: "leaf" },
];

export default function CalculatorsPage() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = Number(params.get("t"));
    if (Number.isInteger(t) && t >= 0 && t < TABS.length) setActive(t);
  }, []);

  return (
    <main>
      <PageHero
        kicker="Eco kalkulyatorlar"
        title="O‘z ta’siringizni ochiq formulalar bilan hisoblang"
        lead="Barcha kalkulyatorlar ochiq formulalar va xalqaro ilmiy tashkilotlar tomonidan ishlatiladigan koeffitsiyentlar asosida ishlaydi. Natijalar taxminiy hisobdir — bu har bir natijada aniq belgilanadi."
      />
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-8 flex flex-wrap gap-2">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-bold transition-colors ${
                active === i
                  ? "border-emerald bg-emerald text-soft"
                  : "border-line text-ink/60 hover:border-emerald hover:text-emerald dark:border-linedark dark:text-soft/60"
              }`}
            >
              <Icon name={t.icon} className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>

        <div key={active} className="animate-fade-up">
          {active === 0 && <WaterCalc />}
          {active === 1 && <EnergyCalc />}
          {active === 2 && <CarbonCalc />}
          {active === 3 && <WasteCalc />}
          {active === 4 && <TreeCalc />}
        </div>

        <div className="mt-10 flex items-start gap-3 rounded-xl border border-line bg-beige/60 p-5 dark:border-linedark dark:bg-ink2">
          <Icon name="info" className="mt-0.5 h-5 w-5 shrink-0 text-emerald" />
          <p className="text-[13px] leading-relaxed text-ink/70 dark:text-soft/70">
            <strong>Chiziqlar haqida:</strong> koeffitsiyentlar — FAO, WHO, Global Carbon Project va xalqaro
            ekologik hisobotlarda keng ishlatiladigan o‘rtacha qiymatlar (masalan: avtomobil 0,17 kg CO2/km,
            jamoat transporti 0,05 kg/km, elektr 0,5 kg CO2/kWh, o‘sib yetilgan daraxt ~22 kg CO2/yil). Bu
            qiymatlar mintaqaga, tur va foydalanish odatlariga qarab farq qiladi — natijalarni aniqlashtirish
            uchun professional energiya/suv auditidan foydalaning.
          </p>
        </div>
      </div>
    </main>
  );
}
