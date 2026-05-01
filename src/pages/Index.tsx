import { useState } from "react";
import Icon from "@/components/ui/icon";

const TRUCK_IMAGE = "https://cdn.poehali.dev/projects/89a0b4bd-4d22-4025-802f-4ba001300c9c/files/7e1eea3b-6b23-4245-b739-16f6e997b5e3.jpg";
const STRESSED_IMAGE = "https://cdn.poehali.dev/projects/89a0b4bd-4d22-4025-802f-4ba001300c9c/files/c47b38da-8091-4d79-8a8d-03d142052d8b.jpg";
const WAREHOUSE_IMAGE = "https://cdn.poehali.dev/projects/89a0b4bd-4d22-4025-802f-4ba001300c9c/files/b89ff2f5-da3a-49e7-b798-1c4ad2464f17.jpg";

type Section = "home" | "about" | "services" | "tariffs" | "tracking" | "calculator" | "blog" | "contacts" | "cabinet";

const MOCK_ORDERS = [
  { id: "GM-2024-0341", from: "Екатеринбург", to: "Челябинск", date: "28.04.2026", status: "Доставлен", weight: "450 кг", price: "8 200 ₽" },
  { id: "GM-2024-0298", from: "Тюмень", to: "Екатеринбург", date: "15.04.2026", status: "В пути", weight: "1 200 кг", price: "19 500 ₽" },
  { id: "GM-2024-0255", from: "Пермь", to: "Тюмень", date: "02.04.2026", status: "Доставлен", weight: "800 кг", price: "14 300 ₽" },
  { id: "GM-2024-0211", from: "Уфа", to: "Пермь", date: "18.03.2026", status: "Доставлен", weight: "320 кг", price: "6 800 ₽" },
];

const MOCK_INVOICES = [
  { id: "СЧ-2026-0341", date: "28.04.2026", amount: "8 200 ₽", status: "Оплачен" },
  { id: "СЧ-2026-0298", date: "15.04.2026", amount: "19 500 ₽", status: "Ожидает оплаты" },
  { id: "СЧ-2026-0255", date: "02.04.2026", amount: "14 300 ₽", status: "Оплачен" },
];

/* ─── Иконка WhatsApp ─── */
const WaIcon = ({ size = 18, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [cabinetTab, setCabinetTab] = useState<"orders" | "invoices">("orders");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingResult, setTrackingResult] = useState<null | "found" | "notfound">(null);
  const [calcForm, setCalcForm] = useState({ from: "", to: "", weight: "", volume: "" });
  const [calcResult, setCalcResult] = useState<number | null>(null);

  const nav = (s: Section) => {
    setActiveSection(s);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogin = (e: React.FormEvent) => { e.preventDefault(); setIsLoggedIn(true); };
  const handleTrack = () => { if (trackingNumber.trim()) setTrackingResult(trackingNumber.startsWith("GM") ? "found" : "notfound"); };
  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(calcForm.weight) || 0;
    const v = parseFloat(calcForm.volume) || 0;
    setCalcResult(Math.round(Math.max(w * 18, v * 220) + 2500));
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Golos Text', sans-serif", color: "#1a1a2e" }}>

      {/* ══════════════════ HEADER ══════════════════ */}
      <header style={{ background: "#fff", borderBottom: "1px solid #e5e7eb" }} className="sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-[68px]">

          {/* Логотип — круг с грузовиком и оранжевая точка */}
          <button onClick={() => nav("home")} className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <div style={{ width: 46, height: 46, border: "2.5px solid #e85d04", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="Truck" size={20} className="text-[#0d2240]" />
              </div>
              <div style={{ position: "absolute", top: -2, right: -2, width: 13, height: 13, background: "#e85d04", borderRadius: "50%", border: "2px solid #fff" }} />
            </div>
            <div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, fontWeight: 700, color: "#0d2240", lineHeight: 1 }}>RailWay</div>
              <div style={{ fontSize: 9, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.12em", lineHeight: 1.2 }}>Транспортная компания</div>
            </div>
          </button>

          {/* Навигация */}
          <nav className="hidden lg:flex items-center gap-7">
            {(["О компании", "Услуги", "Направления", "Преимущества", "Контакты"] as const).map((label, i) => {
              const sections: Section[] = ["about", "services", "tariffs", "blog", "contacts"];
              return (
                <button key={label} onClick={() => nav(sections[i])}
                  style={{ fontSize: 14, fontWeight: 500, color: activeSection === sections[i] ? "#e85d04" : "#374151", transition: "color .2s" }}
                  onMouseEnter={e => { if (activeSection !== sections[i]) (e.target as HTMLElement).style.color = "#e85d04"; }}
                  onMouseLeave={e => { if (activeSection !== sections[i]) (e.target as HTMLElement).style.color = "#374151"; }}>
                  {label}
                </button>
              );
            })}
          </nav>

          {/* Кнопка WhatsApp + вход */}
          <div className="hidden lg:flex items-center gap-3">
            <button onClick={() => nav("cabinet")} style={{ fontSize: 13, color: "#6b7280", fontWeight: 500 }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = "#0d2240"}
              onMouseLeave={e => (e.target as HTMLElement).style.color = "#6b7280"}>
              {isLoggedIn ? "Кабинет" : "Войти"}
            </button>
            <a href="https://wa.me/73432000000"
              style={{ display: "flex", alignItems: "center", gap: 8, border: "1.5px solid #25d366", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, color: "#1a1a2e", textDecoration: "none", transition: "all .2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#25d366"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; (e.currentTarget as HTMLElement).style.color = "#1a1a2e"; }}>
              <WaIcon size={16} color="#25d366" />
              Написать в WhatsApp
            </a>
          </div>

          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} className="text-[#0d2240]" />
          </button>
        </div>

        {mobileMenuOpen && (
          <div style={{ background: "#fff", borderTop: "1px solid #f3f4f6", padding: "12px 20px" }} className="lg:hidden flex flex-col gap-2">
            {(["О компании", "Услуги", "Направления", "Преимущества", "Контакты"] as const).map((label, i) => {
              const sections: Section[] = ["about", "services", "tariffs", "blog", "contacts"];
              return <button key={label} onClick={() => nav(sections[i])} style={{ textAlign: "left", padding: "10px 0", borderBottom: "1px solid #f3f4f6", fontSize: 14, color: "#374151" }}>{label}</button>;
            })}
            <button onClick={() => nav("cabinet")} style={{ textAlign: "left", padding: "10px 0", fontSize: 14, color: "#374151" }}>{isLoggedIn ? "Личный кабинет" : "Войти"}</button>
          </div>
        )}
      </header>

      <main>

        {/* ══════════════════ HOME ══════════════════ */}
        {activeSection === "home" && <>

          {/* ── HERO SECTION ── */}
          <section style={{ background: "#fff", overflow: "hidden" }}>
            <div className="max-w-7xl mx-auto px-5">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 520, alignItems: "center" }} className="max-lg:block">

                {/* Левая: текст */}
                <div style={{ paddingTop: 56, paddingBottom: 56, paddingRight: 40 }} className="animate-fade-in">
                  <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 52, fontWeight: 700, lineHeight: 1.08, color: "#0d2240", margin: "0 0 16px" }}>
                    Сборные<br />
                    грузоперевозки<br />
                    <span style={{ color: "#e85d04" }}>без срывов сроков<br />и потерь по Уралу</span>
                  </h1>
                  <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.6, marginBottom: 32, maxWidth: 400 }}>
                    Для бизнеса: фиксированные цены, доставка<br />«от двери до двери» и полная ответственность за груз
                  </p>

                  {/* Кнопки */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 40 }}>
                    <button onClick={() => nav("calculator")}
                      style={{ display: "flex", alignItems: "center", gap: 10, background: "#e85d04", color: "#fff", border: "none", borderRadius: 8, padding: "14px 22px", cursor: "pointer", transition: "background .2s" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#d04e00"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#e85d04"}>
                      <Icon name="Calculator" size={20} />
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1 }}>Рассчитать стоимость</div>
                        <div style={{ fontSize: 11, opacity: 0.8, marginTop: 2 }}>за 5 минут</div>
                      </div>
                    </button>

                    <a href="https://wa.me/73432000000"
                      style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", color: "#1a1a2e", border: "1.5px solid #d1d5db", borderRadius: 8, padding: "14px 22px", textDecoration: "none", transition: "border-color .2s" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#25d366"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "#d1d5db"}>
                      <WaIcon size={22} color="#25d366" />
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1 }}>Получить быстрый</div>
                        <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>расчёт в WhatsApp</div>
                      </div>
                    </a>
                  </div>

                  {/* Иконки-гарантии */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
                    {[
                      { icon: "FileText", text: "Работаем\nпо договору" },
                      { icon: "ShieldCheck", text: "Несём ответственность\nза груз" },
                      { icon: "Banknote", text: "Фиксируем\nцену заранее" },
                    ].map((b) => (
                      <div key={b.text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 44, height: 44, borderRadius: "50%", border: "2px solid #0d2240", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Icon name={b.icon} size={20} className="text-[#0d2240]" />
                        </div>
                        <span style={{ fontSize: 12, color: "#374151", lineHeight: 1.4, whiteSpace: "pre-line", fontWeight: 500 }}>{b.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Правая: фото без оверлея, вплотную к краю */}
                <div style={{ height: "100%", minHeight: 520, position: "relative" }} className="hidden lg:block">
                  <img src={TRUCK_IMAGE} alt="Грузовик на дороге"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
                </div>
              </div>
            </div>
          </section>

          {/* ── ЗНАКОМО? ── */}
          <section style={{ background: "#f4f6f9", padding: "64px 0" }}>
            <div className="max-w-7xl mx-auto px-5" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                  <span style={{ fontSize: 32 }}>⚠️</span>
                  <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 40, fontWeight: 700, color: "#0d2240", margin: 0 }}>Знакомо?</h2>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
                  {["Водитель не вышел на рейс", "Сорвали сроки доставки", "Груз повредили или потеряли", "Цена выросла «по факту»"].map(t => (
                    <div key={t} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ color: "#e85d04", fontWeight: 700, fontSize: 18, lineHeight: 1 }}>✕</span>
                      <span style={{ fontSize: 16, color: "#1a1a2e", fontWeight: 500 }}>{t}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12, background: "#fff", borderRadius: 12, padding: "16px 20px", borderLeft: "4px solid #e85d04", boxShadow: "0 1px 8px rgba(0,0,0,.06)" }}>
                  <span style={{ color: "#e85d04", fontSize: 24, lineHeight: 1, marginTop: 2 }}>→</span>
                  <p style={{ fontWeight: 700, fontSize: 16, color: "#0d2240", margin: 0, lineHeight: 1.4 }}>
                    Мы исключаем эти риски<br />за счёт системной работы<br />и контроля
                  </p>
                </div>
              </div>
              <div className="hidden lg:block">
                <img src={STRESSED_IMAGE} alt="Проблемы с логистикой"
                  style={{ borderRadius: 16, objectFit: "cover", width: "100%", height: 380, boxShadow: "0 8px 32px rgba(0,0,0,.12)" }} />
              </div>
            </div>
          </section>

          {/* ── ЦИФРЫ ── */}
          <section style={{ background: "#fff", padding: "56px 0", borderBottom: "1px solid #f3f4f6" }}>
            <div className="max-w-7xl mx-auto px-5">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32, textAlign: "center" }} className="max-md:grid-cols-2">
                {[["12+", "лет на рынке"], ["50+", "направлений"], ["98%", "грузов в срок"], ["3 000+", "клиентов в год"]].map(([n, l]) => (
                  <div key={l}>
                    <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 48, fontWeight: 700, color: "#e85d04" }}>{n}</div>
                    <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── УСЛУГИ ── */}
          <section style={{ background: "#fff", padding: "64px 0" }}>
            <div className="max-w-7xl mx-auto px-5">
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 38, fontWeight: 700, color: "#0d2240", textAlign: "center", marginBottom: 40 }}>Наши услуги</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="max-lg:grid-cols-2 max-md:grid-cols-1">
                {[
                  { icon: "Package", title: "Сборные грузоперевозки", desc: "Объединяем грузы нескольких клиентов в один рейс. Экономично для небольших партий.", tag: "Популярное" },
                  { icon: "Truck", title: "Полная загрузка (FTL)", desc: "Выделенный автомобиль. Гарантированная дата доставки без пересадок.", tag: null },
                  { icon: "Zap", title: "Срочная доставка", desc: "Экспресс «день в день» или «следующий день» для критичных грузов.", tag: "Срочно" },
                ].map((s) => (
                  <div key={s.title}
                    style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: 24, position: "relative", transition: "box-shadow .2s, transform .2s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 28px rgba(0,0,0,.1)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = ""; (e.currentTarget as HTMLDivElement).style.transform = ""; }}>
                    {s.tag && <span style={{ position: "absolute", top: 14, right: 14, background: "#e85d04", color: "#fff", fontSize: 11, padding: "3px 10px", borderRadius: 20, fontWeight: 600 }}>{s.tag}</span>}
                    <div style={{ width: 48, height: 48, background: "#0d2240", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                      <Icon name={s.icon} size={22} className="text-[#e85d04]" />
                    </div>
                    <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, fontWeight: 600, color: "#0d2240", marginBottom: 8 }}>{s.title}</h3>
                    <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16, lineHeight: 1.5 }}>{s.desc}</p>
                    <button onClick={() => nav("contacts")}
                      style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: "#e85d04", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                      Узнать подробнее <Icon name="ArrowRight" size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── CTA ── */}
          <section style={{ background: "#0d2240", padding: "56px 0" }}>
            <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", padding: "0 20px" }}>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 38, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Готовы к доставке?</h2>
              <p style={{ color: "rgba(255,255,255,.55)", marginBottom: 28, fontSize: 15 }}>Оставьте заявку — ответим за 15 минут</p>
              <button onClick={() => nav("contacts")}
                style={{ background: "#e85d04", color: "#fff", border: "none", borderRadius: 10, padding: "16px 48px", fontSize: 17, fontWeight: 700, cursor: "pointer", transition: "background .2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#d04e00"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#e85d04"}>
                Оставить заявку
              </button>
            </div>
          </section>
        </>}

        {/* ══════════════════ О КОМПАНИИ ══════════════════ */}
        {activeSection === "about" && (
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 20px" }}>
            <div style={{ marginBottom: 40 }}>
              <div style={{ color: "#e85d04", fontWeight: 600, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>О компании</div>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 48, fontWeight: 700, color: "#0d2240", marginBottom: 12 }}>RailWay</h2>
              <p style={{ color: "#6b7280", fontSize: 16, maxWidth: 600 }}>Транспортная компания, специализирующаяся на сборных грузоперевозках по Уралу и Западной Сибири с 2012 года.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", marginBottom: 56 }} className="max-lg:block">
              <img src={WAREHOUSE_IMAGE} alt="Склад" style={{ borderRadius: 16, objectFit: "cover", width: "100%", height: 320, boxShadow: "0 6px 24px rgba(0,0,0,.1)" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {[
                  { icon: "Target", title: "Наша миссия", text: "Сделать логистику предсказуемой и прозрачной. Бизнес должен знать, где груз и сколько стоит — заранее." },
                  { icon: "Users", title: "Наша команда", text: "Более 200 сотрудников: диспетчеры, логисты, водители и менеджеры. Каждый знает своё дело." },
                  { icon: "Award", title: "Достижения", text: "Лауреат премии «Лучшая ТК Урала» 2023. Партнёр крупнейших промышленных предприятий региона." },
                ].map((item) => (
                  <div key={item.title} style={{ display: "flex", gap: 16 }}>
                    <div style={{ width: 48, height: 48, background: "#0d2240", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name={item.icon} size={22} className="text-[#e85d04]" />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, color: "#0d2240", marginBottom: 4 }}>{item.title}</div>
                      <p style={{ fontSize: 13, color: "#6b7280" }}>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }} className="max-md:grid-cols-2">
              {[["12+", "лет на рынке"], ["50+", "городов"], ["120+", "единиц транспорта"], ["3 000+", "клиентов в год"]].map(([n, l]) => (
                <div key={l} style={{ background: "#f4f6f9", borderRadius: 14, padding: 24, textAlign: "center" }}>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 38, fontWeight: 700, color: "#e85d04" }}>{n}</div>
                  <div style={{ fontSize: 13, color: "#0d2240", fontWeight: 500, marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════ УСЛУГИ ══════════════════ */}
        {activeSection === "services" && (
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 20px" }}>
            <div style={{ marginBottom: 40 }}>
              <div style={{ color: "#e85d04", fontWeight: 600, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Что мы делаем</div>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 48, fontWeight: 700, color: "#0d2240", marginBottom: 12 }}>Наши услуги</h2>
              <p style={{ color: "#6b7280", maxWidth: 480 }}>Полный спектр логистических услуг для бизнеса любого масштаба</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="max-lg:grid-cols-2 max-md:grid-cols-1">
              {[
                { icon: "Package", title: "Сборные грузоперевозки", desc: "Объединяем грузы нескольких клиентов в один рейс. Экономично для небольших партий.", tag: "Популярное" },
                { icon: "Truck", title: "Полная загрузка (FTL)", desc: "Выделенный автомобиль. Гарантированная дата доставки без пересадок.", tag: null },
                { icon: "Warehouse", title: "Складское хранение", desc: "Ответственное хранение на складах с учётом специальных условий.", tag: null },
                { icon: "RefreshCw", title: "Возвратная логистика", desc: "Обратная доставка, обработка возвратов и повторная отправка.", tag: null },
                { icon: "Shield", title: "Страхование груза", desc: "Страхуем каждый груз. Выплаты в течение 30 дней при страховом случае.", tag: null },
                { icon: "Zap", title: "Срочная доставка", desc: "Экспресс «день в день» для критически важных грузов.", tag: "Срочно" },
              ].map((s) => (
                <div key={s.title}
                  style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: 24, position: "relative", transition: "box-shadow .2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,.1)"}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = ""}>
                  {s.tag && <span style={{ position: "absolute", top: 14, right: 14, background: "#e85d04", color: "#fff", fontSize: 11, padding: "3px 10px", borderRadius: 20, fontWeight: 600 }}>{s.tag}</span>}
                  <div style={{ width: 48, height: 48, background: "#0d2240", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Icon name={s.icon} size={22} className="text-[#e85d04]" />
                  </div>
                  <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 19, fontWeight: 600, color: "#0d2240", marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16, lineHeight: 1.5 }}>{s.desc}</p>
                  <button onClick={() => nav("contacts")} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: "#e85d04", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                    Запросить <Icon name="ArrowRight" size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════ ТАРИФЫ/НАПРАВЛЕНИЯ ══════════════════ */}
        {activeSection === "tariffs" && (
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 20px" }}>
            <div style={{ marginBottom: 40 }}>
              <div style={{ color: "#e85d04", fontWeight: 600, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Направления и цены</div>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 48, fontWeight: 700, color: "#0d2240", marginBottom: 12 }}>Тарифы</h2>
              <p style={{ color: "#6b7280", maxWidth: 480 }}>Цена фиксируется в договоре — никаких доплат «по факту»</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 32 }} className="max-lg:grid-cols-1">
              {[
                { name: "Стандарт", price: "от 2 500 ₽", desc: "Сборный груз, стандартные сроки", features: ["Груз до 500 кг", "Срок: 3–5 дней", "Страховка включена", "Отслеживание онлайн"], highlight: false },
                { name: "Бизнес", price: "от 8 000 ₽", desc: "Для регулярных отправок", features: ["Груз до 2 000 кг", "Срок: 2–3 дня", "Страховка включена", "Персональный менеджер", "Отсрочка 14 дней"], highlight: true },
                { name: "Экспресс", price: "от 15 000 ₽", desc: "Приоритетная срочная доставка", features: ["Груз любого веса", "Срок: 1–2 дня", "Расширенная страховка", "Персональный менеджер", "Выделенный транспорт"], highlight: false },
              ].map((p) => (
                <div key={p.name} style={{ borderRadius: 20, padding: 32, position: "relative", background: p.highlight ? "#0d2240" : "#fff", border: p.highlight ? "none" : "1px solid #e5e7eb" }}>
                  {p.highlight && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#e85d04", color: "#fff", fontSize: 11, padding: "4px 16px", borderRadius: 20, fontWeight: 700, whiteSpace: "nowrap" }}>Популярный</div>}
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 22, fontWeight: 700, color: p.highlight ? "#fff" : "#0d2240", marginBottom: 4 }}>{p.name}</div>
                  <div style={{ fontSize: 30, fontWeight: 700, color: "#e85d04", marginBottom: 8 }}>{p.price}</div>
                  <p style={{ fontSize: 13, color: p.highlight ? "rgba(255,255,255,.55)" : "#9ca3af", marginBottom: 24 }}>{p.desc}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 10 }}>
                    {p.features.map(f => (
                      <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: p.highlight ? "rgba(255,255,255,.85)" : "#6b7280" }}>
                        <Icon name="Check" size={15} className="text-[#e85d04]" style={{ flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => nav("contacts")}
                    style={{ width: "100%", padding: "12px 0", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "all .2s", background: p.highlight ? "#e85d04" : "transparent", color: p.highlight ? "#fff" : "#0d2240", border: p.highlight ? "none" : "2px solid #0d2240" }}
                    onMouseEnter={e => { if (!p.highlight) { (e.currentTarget as HTMLElement).style.background = "#0d2240"; (e.currentTarget as HTMLElement).style.color = "#fff"; } }}
                    onMouseLeave={e => { if (!p.highlight) { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#0d2240"; } }}>
                    Выбрать тариф
                  </button>
                </div>
              ))}
            </div>
            <div style={{ background: "#f4f6f9", borderRadius: 16, padding: "24px 32px", textAlign: "center" }}>
              <p style={{ color: "#6b7280", marginBottom: 16 }}>Нужен индивидуальный тариф для регулярных перевозок?</p>
              <button onClick={() => nav("contacts")}
                style={{ background: "#0d2240", color: "#fff", border: "none", borderRadius: 10, padding: "12px 32px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                Запросить КП
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════ ОТСЛЕЖИВАНИЕ ══════════════════ */}
        {activeSection === "tracking" && (
          <div style={{ maxWidth: 680, margin: "0 auto", padding: "64px 20px" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ color: "#e85d04", fontWeight: 600, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Где мой груз?</div>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 44, fontWeight: 700, color: "#0d2240", marginBottom: 8 }}>Отслеживание</h2>
              <p style={{ color: "#9ca3af" }}>Введите номер заказа (начинается с GM)</p>
            </div>
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: 32, marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 12 }}>
                <input value={trackingNumber} onChange={e => setTrackingNumber(e.target.value)} placeholder="GM-2024-0341"
                  style={{ flex: 1, border: "1px solid #d1d5db", borderRadius: 12, padding: "12px 16px", fontSize: 14, outline: "none" }}
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor = "#0d2240"}
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor = "#d1d5db"} />
                <button onClick={handleTrack}
                  style={{ display: "flex", alignItems: "center", gap: 8, background: "#e85d04", color: "#fff", border: "none", borderRadius: 12, padding: "12px 24px", fontWeight: 700, cursor: "pointer" }}>
                  <Icon name="Search" size={18} /> Найти
                </button>
              </div>
            </div>
            {trackingResult === "found" && (
              <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: 32 }} className="animate-fade-in">
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                  <div style={{ width: 40, height: 40, background: "#dcfce7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="PackageCheck" size={20} className="text-green-600" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: "#0d2240" }}>{trackingNumber}</div>
                    <div style={{ fontSize: 12, color: "#9ca3af" }}>Екатеринбург → Челябинск</div>
                  </div>
                  <span style={{ marginLeft: "auto", background: "#dcfce7", color: "#16a34a", fontSize: 12, padding: "4px 12px", borderRadius: 20, fontWeight: 600 }}>Доставлен</span>
                </div>
                {[["Принят на склад", "25.04.2026, 09:15"], ["Отправлен из Екатеринбурга", "26.04.2026, 06:00"], ["Прибыл в Челябинск", "27.04.2026, 14:30"], ["Доставлен получателю", "28.04.2026, 11:00"]].map(([l, d], i) => (
                  <div key={i} style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{ width: 32, height: 32, background: "#22c55e", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon name="Check" size={14} className="text-white" />
                      </div>
                      {i < 3 && <div style={{ width: 2, height: 24, background: "#e5e7eb", marginTop: 4 }} />}
                    </div>
                    <div style={{ paddingTop: 4 }}>
                      <div style={{ fontWeight: 500, color: "#0d2240", fontSize: 14 }}>{l}</div>
                      <div style={{ fontSize: 12, color: "#9ca3af" }}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {trackingResult === "notfound" && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 16, padding: 32, textAlign: "center" }} className="animate-fade-in">
                <Icon name="PackageX" size={40} className="text-red-400 mx-auto mb-3" />
                <p style={{ color: "#b91c1c", fontWeight: 600, marginBottom: 4 }}>Заказ не найден</p>
                <p style={{ color: "#f87171", fontSize: 13 }}>Проверьте номер или обратитесь в поддержку</p>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════ КАЛЬКУЛЯТОР ══════════════════ */}
        {activeSection === "calculator" && (
          <div style={{ maxWidth: 680, margin: "0 auto", padding: "64px 20px" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ color: "#e85d04", fontWeight: 600, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Быстрый расчёт</div>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 44, fontWeight: 700, color: "#0d2240", marginBottom: 8 }}>Калькулятор</h2>
              <p style={{ color: "#9ca3af" }}>Предварительная стоимость за 30 секунд</p>
            </div>
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 20, padding: 32 }}>
              <form onSubmit={handleCalc} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {[["Откуда", "from"], ["Куда", "to"]].map(([label, field]) => (
                    <div key={field}>
                      <label style={{ fontSize: 13, fontWeight: 600, color: "#0d2240", display: "block", marginBottom: 8 }}>{label}</label>
                      <select value={calcForm[field as "from" | "to"]} onChange={e => setCalcForm({ ...calcForm, [field]: e.target.value })}
                        style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: 12, padding: "12px 14px", fontSize: 13, outline: "none" }} required>
                        <option value="">Выберите город</option>
                        {["Екатеринбург", "Тюмень", "Челябинск", "Пермь", "Уфа", "Курган", "Салехард"].map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {[["Вес (кг)", "weight", "500"], ["Объём (м³)", "volume", "2.5"]].map(([label, field, ph]) => (
                    <div key={field}>
                      <label style={{ fontSize: 13, fontWeight: 600, color: "#0d2240", display: "block", marginBottom: 8 }}>{label}</label>
                      <input type="number" placeholder={ph} value={calcForm[field as "weight" | "volume"]} onChange={e => setCalcForm({ ...calcForm, [field]: e.target.value })}
                        style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: 12, padding: "12px 14px", fontSize: 13, outline: "none" }} required />
                    </div>
                  ))}
                </div>
                <button type="submit"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#e85d04", color: "#fff", border: "none", borderRadius: 12, padding: "16px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
                  <Icon name="Calculator" size={20} /> Рассчитать стоимость
                </button>
              </form>
              {calcResult !== null && (
                <div style={{ marginTop: 24, background: "#0d2240", borderRadius: 16, padding: 28, textAlign: "center" }} className="animate-fade-in">
                  <p style={{ color: "rgba(255,255,255,.55)", fontSize: 13, marginBottom: 6 }}>Предварительная стоимость</p>
                  <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: 48, fontWeight: 700, color: "#e85d04", margin: "0 0 4px" }}>{calcResult.toLocaleString("ru-RU")} ₽</p>
                  <p style={{ color: "rgba(255,255,255,.35)", fontSize: 11, marginBottom: 16 }}>Окончательная цена фиксируется в договоре</p>
                  <button onClick={() => nav("contacts")}
                    style={{ background: "#e85d04", color: "#fff", border: "none", borderRadius: 10, padding: "10px 28px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                    Оформить заявку
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══════════════════ ПРЕИМУЩЕСТВА ══════════════════ */}
        {activeSection === "blog" && (
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 20px" }}>
            <div style={{ marginBottom: 40 }}>
              <div style={{ color: "#e85d04", fontWeight: 600, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Почему выбирают нас</div>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 48, fontWeight: 700, color: "#0d2240" }}>Преимущества</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="max-lg:grid-cols-2 max-md:grid-cols-1">
              {[
                { icon: "FileCheck", title: "Работаем по договору", desc: "Фиксируем все условия письменно. Только документы — никаких устных договорённостей." },
                { icon: "ShieldCheck", title: "Ответственность за груз", desc: "Страхуем каждую партию. Выплачиваем стоимость груза в течение 30 дней при форс-мажоре." },
                { icon: "Banknote", title: "Фиксированная цена", desc: "Цена в договоре — окончательная. Никаких доплат по факту." },
                { icon: "Clock", title: "Соблюдаем сроки", desc: "98% грузов в срок. При опоздании — возвращаем часть стоимости." },
                { icon: "Eye", title: "Онлайн-отслеживание", desc: "Следите за грузом в реальном времени. Уведомления на каждом этапе." },
                { icon: "Headphones", title: "Персональный менеджер", desc: "Один менеджер от заявки до доставки. Всегда на связи в рабочее время." },
              ].map((item) => (
                <div key={item.title}
                  style={{ background: "#f4f6f9", borderRadius: 16, padding: 24, transition: "box-shadow .2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 20px rgba(0,0,0,.08)"}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = ""}>
                  <div style={{ width: 48, height: 48, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Icon name={item.icon} size={22} className="text-[#e85d04]" />
                  </div>
                  <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 19, fontWeight: 600, color: "#0d2240", marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════ КОНТАКТЫ ══════════════════ */}
        {activeSection === "contacts" && (
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 20px" }}>
            <div style={{ marginBottom: 40 }}>
              <div style={{ color: "#e85d04", fontWeight: 600, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Свяжитесь с нами</div>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 48, fontWeight: 700, color: "#0d2240", marginBottom: 8 }}>Контакты</h2>
              <p style={{ color: "#9ca3af" }}>Ответим в течение 15 минут в рабочее время</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="max-lg:block">
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (343) 200-00-00" },
                  { icon: "Mail", label: "Email", value: "info@railway-ural.ru" },
                  { icon: "MapPin", label: "Адрес", value: "Екатеринбург, ул. Транспортная, 15" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 08:00–19:00, Сб: 09:00–15:00" },
                ].map((c) => (
                  <div key={c.label} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{ width: 48, height: 48, background: "#0d2240", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name={c.icon} size={20} className="text-[#e85d04]" />
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: "#9ca3af" }}>{c.label}</div>
                      <div style={{ fontWeight: 600, color: "#0d2240" }}>{c.value}</div>
                    </div>
                  </div>
                ))}
                <a href="https://wa.me/73432000000"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25d366", color: "#fff", borderRadius: 12, padding: "12px 24px", fontWeight: 700, fontSize: 14, textDecoration: "none", width: "fit-content" }}>
                  <WaIcon size={18} color="#fff" /> Написать в WhatsApp
                </a>
              </div>
              <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 20, padding: 32, boxShadow: "0 2px 16px rgba(0,0,0,.06)" }}>
                <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 24, fontWeight: 700, color: "#0d2240", marginBottom: 24 }}>Оставить заявку</h3>
                <form onSubmit={e => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[["Ваше имя", "text"], ["Компания", "text"], ["Телефон", "tel"]].map(([ph, type]) => (
                    <input key={ph} type={type} placeholder={ph}
                      style={{ border: "1px solid #d1d5db", borderRadius: 12, padding: "12px 16px", fontSize: 13, outline: "none" }}
                      onFocus={e => (e.target as HTMLInputElement).style.borderColor = "#0d2240"}
                      onBlur={e => (e.target as HTMLInputElement).style.borderColor = "#d1d5db"} />
                  ))}
                  <textarea placeholder="Опишите груз и направление" rows={4}
                    style={{ border: "1px solid #d1d5db", borderRadius: 12, padding: "12px 16px", fontSize: 13, outline: "none", resize: "none" }}
                    onFocus={e => (e.target as HTMLTextAreaElement).style.borderColor = "#0d2240"}
                    onBlur={e => (e.target as HTMLTextAreaElement).style.borderColor = "#d1d5db"} />
                  <button type="submit"
                    style={{ background: "#e85d04", color: "#fff", border: "none", borderRadius: 12, padding: "14px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
                    Отправить заявку
                  </button>
                  <p style={{ fontSize: 11, color: "#9ca3af", textAlign: "center" }}>Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════ КАБИНЕТ ══════════════════ */}
        {activeSection === "cabinet" && (
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "64px 20px" }}>
            {!isLoggedIn ? (
              <div style={{ maxWidth: 440, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 40 }}>
                  <div style={{ width: 64, height: 64, background: "#0d2240", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <Icon name="User" size={28} className="text-[#e85d04]" />
                  </div>
                  <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 36, fontWeight: 700, color: "#0d2240", marginBottom: 8 }}>Личный кабинет</h2>
                  <p style={{ color: "#9ca3af" }}>Войдите, чтобы просматривать заказы и счета</p>
                </div>
                <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 20, padding: 32 }}>
                  <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, color: "#0d2240", display: "block", marginBottom: 8 }}>Email</label>
                      <input type="email" value={loginForm.email} onChange={e => setLoginForm({ ...loginForm, email: e.target.value })} placeholder="your@company.ru"
                        style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: 12, padding: "12px 16px", fontSize: 13, outline: "none", boxSizing: "border-box" }} required />
                    </div>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, color: "#0d2240", display: "block", marginBottom: 8 }}>Пароль</label>
                      <input type="password" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} placeholder="••••••••"
                        style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: 12, padding: "12px 16px", fontSize: 13, outline: "none", boxSizing: "border-box" }} required />
                    </div>
                    <button type="submit"
                      style={{ background: "#0d2240", color: "#fff", border: "none", borderRadius: 12, padding: "14px", fontWeight: 700, fontSize: 15, cursor: "pointer", marginTop: 4 }}>
                      Войти
                    </button>
                    <button type="button" style={{ background: "none", border: "none", color: "#e85d04", fontSize: 13, cursor: "pointer" }}>Забыли пароль?</button>
                  </form>
                  <div style={{ borderTop: "1px solid #f3f4f6", marginTop: 20, paddingTop: 20, textAlign: "center" }}>
                    <p style={{ color: "#9ca3af", fontSize: 13, marginBottom: 8 }}>Нет аккаунта?</p>
                    <button onClick={() => nav("contacts")} style={{ color: "#0d2240", fontWeight: 600, fontSize: 13, background: "none", border: "none", cursor: "pointer" }}>
                      Оставьте заявку — создадим доступ
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="animate-fade-in">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
                  <div>
                    <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 36, fontWeight: 700, color: "#0d2240" }}>Личный кабинет</h2>
                    <p style={{ color: "#9ca3af", marginTop: 4 }}>ООО «Компания Клиента» · ivan@company.ru</p>
                  </div>
                  <button onClick={() => setIsLoggedIn(false)} style={{ display: "flex", alignItems: "center", gap: 6, color: "#9ca3af", background: "none", border: "none", cursor: "pointer", fontSize: 13 }}>
                    <Icon name="LogOut" size={16} /> Выйти
                  </button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 24 }}>
                  {[["Package", "Всего заказов", "4"], ["Truck", "В пути", "1"], ["CheckCircle", "Доставлено", "3"]].map(([icon, label, val]) => (
                    <div key={label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: 20, display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{ width: 48, height: 48, background: "#0d2240", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon name={icon} size={20} className="text-[#e85d04]" />
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 28, fontWeight: 700, color: "#0d2240", lineHeight: 1 }}>{val}</div>
                        <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{label}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, overflow: "hidden" }}>
                  <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb" }}>
                    {(["orders", "invoices"] as const).map((tab) => (
                      <button key={tab} onClick={() => setCabinetTab(tab)}
                        style={{ flex: 1, padding: "16px", fontSize: 13, fontWeight: 600, cursor: "pointer", background: "none", border: "none", borderBottom: cabinetTab === tab ? "2px solid #e85d04" : "2px solid transparent", color: cabinetTab === tab ? "#e85d04" : "#9ca3af", transition: "all .2s" }}>
                        {tab === "orders" ? "История заказов" : "Счета"}
                      </button>
                    ))}
                  </div>
                  <div style={{ overflowX: "auto" }}>
                    {cabinetTab === "orders" && (
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                        <thead>
                          <tr style={{ background: "#f4f6f9" }}>
                            {["Номер заказа", "Откуда", "Куда", "Дата", "Вес", "Стоимость", "Статус"].map(h => (
                              <th key={h} style={{ textAlign: "left", padding: "12px 16px", color: "#9ca3af", fontWeight: 500, fontSize: 11 }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {MOCK_ORDERS.map(o => (
                            <tr key={o.id} style={{ borderTop: "1px solid #f3f4f6" }}>
                              <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0d2240" }}>{o.id}</td>
                              <td style={{ padding: "14px 16px", color: "#6b7280" }}>{o.from}</td>
                              <td style={{ padding: "14px 16px", color: "#6b7280" }}>{o.to}</td>
                              <td style={{ padding: "14px 16px", color: "#9ca3af" }}>{o.date}</td>
                              <td style={{ padding: "14px 16px", color: "#6b7280" }}>{o.weight}</td>
                              <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0d2240" }}>{o.price}</td>
                              <td style={{ padding: "14px 16px" }}>
                                <span style={{ background: o.status === "Доставлен" ? "#dcfce7" : "#ffedd5", color: o.status === "Доставлен" ? "#16a34a" : "#c2410c", fontSize: 11, padding: "3px 10px", borderRadius: 20, fontWeight: 600 }}>
                                  {o.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                    {cabinetTab === "invoices" && (
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                        <thead>
                          <tr style={{ background: "#f4f6f9" }}>
                            {["Номер счёта", "Дата", "Сумма", "Статус", "Действия"].map(h => (
                              <th key={h} style={{ textAlign: "left", padding: "12px 16px", color: "#9ca3af", fontWeight: 500, fontSize: 11 }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {MOCK_INVOICES.map(inv => (
                            <tr key={inv.id} style={{ borderTop: "1px solid #f3f4f6" }}>
                              <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0d2240" }}>{inv.id}</td>
                              <td style={{ padding: "14px 16px", color: "#9ca3af" }}>{inv.date}</td>
                              <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0d2240" }}>{inv.amount}</td>
                              <td style={{ padding: "14px 16px" }}>
                                <span style={{ background: inv.status === "Оплачен" ? "#dcfce7" : "#fef9c3", color: inv.status === "Оплачен" ? "#16a34a" : "#a16207", fontSize: 11, padding: "3px 10px", borderRadius: 20, fontWeight: 600 }}>
                                  {inv.status}
                                </span>
                              </td>
                              <td style={{ padding: "14px 16px" }}>
                                <button style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: "#0d2240", background: "none", border: "none", cursor: "pointer" }}>
                                  <Icon name="Download" size={14} /> Скачать PDF
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer style={{ background: "#0d2240", color: "#fff", marginTop: 32 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 20px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32 }} className="max-md:grid-cols-2">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 40, height: 40, border: "2px solid #e85d04", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="Truck" size={18} className="text-white" />
              </div>
              <div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 18 }}>RailWay</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,.35)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Транспортная компания</div>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,.45)", fontSize: 13 }}>Надёжные грузоперевозки по Уралу и Западной Сибири с 2012 года</p>
          </div>
          <div>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 17, fontWeight: 600, marginBottom: 16 }}>Разделы</div>
            {[["О компании", "about"], ["Услуги", "services"], ["Направления", "tariffs"], ["Преимущества", "blog"], ["Контакты", "contacts"]].map(([l, s]) => (
              <button key={s} onClick={() => nav(s as Section)} style={{ display: "block", color: "rgba(255,255,255,.45)", fontSize: 13, background: "none", border: "none", cursor: "pointer", padding: "4px 0", textAlign: "left" }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = "#e85d04"}
                onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,.45)"}>
                {l}
              </button>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 17, fontWeight: 600, marginBottom: 16 }}>Контакты</div>
            {["+7 (343) 200-00-00", "info@railway-ural.ru", "Екатеринбург, ул. Транспортная, 15", "Пн–Пт: 08:00–19:00"].map(t => (
              <p key={t} style={{ color: "rgba(255,255,255,.45)", fontSize: 13, margin: "0 0 6px" }}>{t}</p>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 17, fontWeight: 600, marginBottom: 16 }}>Документы</div>
            {["Политика конфиденциальности", "Договор оферты", "Реквизиты"].map(t => (
              <button key={t} style={{ display: "block", color: "rgba(255,255,255,.45)", fontSize: 13, background: "none", border: "none", cursor: "pointer", padding: "4px 0", textAlign: "left" }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = "#e85d04"}
                onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,.45)"}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,.08)", padding: "14px 20px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <span style={{ color: "rgba(255,255,255,.25)", fontSize: 11 }}>© 2026 RailWay. Все права защищены.</span>
            <span style={{ color: "rgba(255,255,255,.25)", fontSize: 11 }}>ИНН: 6670000001 · ОГРН: 1126670000001</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
