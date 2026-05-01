import { useState } from "react";
import Icon from "@/components/ui/icon";

const TRUCK_IMAGE = "https://cdn.poehali.dev/projects/89a0b4bd-4d22-4025-802f-4ba001300c9c/files/7e1eea3b-6b23-4245-b739-16f6e997b5e3.jpg";
const WAREHOUSE_IMAGE = "https://cdn.poehali.dev/projects/89a0b4bd-4d22-4025-802f-4ba001300c9c/files/b89ff2f5-da3a-49e7-b798-1c4ad2464f17.jpg";

type Section = "home" | "about" | "services" | "tariffs" | "tracking" | "calculator" | "blog" | "contacts" | "cabinet";

const NAV_ITEMS: { label: string; section: Section }[] = [
  { label: "О компании", section: "about" },
  { label: "Услуги", section: "services" },
  { label: "Тарифы", section: "tariffs" },
  { label: "Отслеживание", section: "tracking" },
  { label: "Калькулятор", section: "calculator" },
  { label: "Блог", section: "blog" },
  { label: "Контакты", section: "contacts" },
];

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

  const navigate = (section: Section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleTrack = () => {
    if (trackingNumber.trim()) {
      setTrackingResult(trackingNumber.startsWith("GM") ? "found" : "notfound");
    }
  };

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(calcForm.weight) || 0;
    const v = parseFloat(calcForm.volume) || 0;
    const base = Math.max(w * 18, v * 220) + 2500;
    setCalcResult(Math.round(base));
  };

  return (
    <div className="min-h-screen font-golos bg-white">
      {/* HEADER */}
      <header className="bg-navy sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <button onClick={() => navigate("home")} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange rounded-lg flex items-center justify-center">
              <Icon name="Truck" size={22} className="text-white" />
            </div>
            <div className="text-left">
              <div className="font-oswald text-white text-lg font-bold leading-tight tracking-wide">ГРУЗМАРШРУТ</div>
              <div className="text-white/50 text-xs leading-tight">транспортная компания</div>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.section}
                onClick={() => navigate(item.section)}
                className={`text-sm font-medium transition-colors ${activeSection === item.section ? "text-orange" : "text-white/80 hover:text-white"}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("cabinet")}
              className="hidden md:flex items-center gap-2 border border-white/30 text-white px-4 py-2 rounded-lg text-sm hover:bg-white/10 transition-colors"
            >
              <Icon name="User" size={16} />
              {isLoggedIn ? "Кабинет" : "Войти"}
            </button>
            <a href="tel:+73432000000" className="hidden md:flex items-center gap-2 bg-orange text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
              <Icon name="Phone" size={16} />
              +7 (343) 200-00-00
            </a>
            <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-navy-light border-t border-white/10 px-4 py-4 flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <button key={item.section} onClick={() => navigate(item.section)} className="text-white/80 text-left py-2 border-b border-white/10 text-sm">
                {item.label}
              </button>
            ))}
            <button onClick={() => navigate("cabinet")} className="text-white/80 text-left py-2 text-sm">
              {isLoggedIn ? "Личный кабинет" : "Войти"}
            </button>
          </div>
        )}
      </header>

      <main>
        {/* === HOME === */}
        {activeSection === "home" && (
          <div>
            {/* Hero */}
            <section className="relative overflow-hidden bg-navy min-h-[580px] flex items-center">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${TRUCK_IMAGE})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-transparent" />
              <div className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
                <div className="animate-fade-in">
                  <div className="inline-flex items-center gap-2 bg-orange/20 border border-orange/40 text-orange text-sm px-3 py-1 rounded-full mb-6 font-medium">
                    <Icon name="MapPin" size={14} /> Урал и Западная Сибирь
                  </div>
                  <h1 className="font-oswald text-white text-5xl lg:text-6xl font-bold leading-tight mb-4">
                    Сборные<br />
                    грузоперевозки<br />
                    <span className="text-orange">без срывов сроков</span>
                  </h1>
                  <p className="text-white/70 text-lg mb-8 max-w-md">
                    Для бизнеса: фиксированные цены, доставка «от двери до двери» и полная ответственность за груз
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button onClick={() => navigate("calculator")} className="flex items-center gap-2 bg-orange text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                      <Icon name="Calculator" size={18} />
                      Рассчитать стоимость
                    </button>
                    <button onClick={() => navigate("contacts")} className="flex items-center gap-2 border-2 border-white/40 text-white px-6 py-3 rounded-lg font-semibold hover:border-white transition-colors">
                      <Icon name="MessageCircle" size={18} />
                      Написать нам
                    </button>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <img src={TRUCK_IMAGE} alt="Грузовик" className="rounded-2xl shadow-2xl object-cover w-full h-80" />
                </div>
              </div>
            </section>

            {/* Trust badges */}
            <section className="border-b border-gray-200 bg-white py-6">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { icon: "FileText", text: "Работаем по договору" },
                    { icon: "Shield", text: "Несём ответственность за груз" },
                    { icon: "Banknote", text: "Фиксируем цену заранее" },
                    { icon: "Clock", text: "Соблюдаем сроки доставки" },
                  ].map((badge) => (
                    <div key={badge.text} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border-2 border-navy flex items-center justify-center flex-shrink-0">
                        <Icon name={badge.icon} size={18} className="text-navy" />
                      </div>
                      <span className="text-sm font-medium text-navy">{badge.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Problem block */}
            <section className="py-20 bg-gray-bg">
              <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="text-4xl mb-4">⚠️</div>
                  <h2 className="font-oswald text-navy text-4xl font-bold mb-6">Знакомо?</h2>
                  <div className="space-y-4">
                    {["Водитель не вышел на рейс", "Сорвали сроки доставки", "Груз повредили или потеряли", "Цена выросла «по факту»"].map((item) => (
                      <div key={item} className="flex items-center gap-3 text-gray-700">
                        <span className="text-red-500 font-bold text-lg">✗</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex items-start gap-3 p-4 bg-white rounded-xl border-l-4 border-orange">
                    <span className="text-orange text-xl">→</span>
                    <p className="font-semibold text-navy">Мы исключаем эти риски за счёт системной работы и контроля</p>
                  </div>
                </div>
                <div>
                  <img src={WAREHOUSE_IMAGE} alt="Склад" className="rounded-2xl shadow-lg object-cover w-full h-72" />
                </div>
              </div>
            </section>

            {/* Stats */}
            <section className="py-20 bg-navy">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  {[
                    { num: "12+", label: "лет на рынке" },
                    { num: "50+", label: "направлений" },
                    { num: "98%", label: "грузов доставлено в срок" },
                    { num: "3 000+", label: "клиентов ежегодно" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="font-oswald text-orange text-5xl font-bold mb-2">{stat.num}</div>
                      <div className="text-white/70 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-white">
              <div className="max-w-2xl mx-auto px-6 text-center">
                <h2 className="font-oswald text-navy text-4xl font-bold mb-4">Готовы обсудить доставку?</h2>
                <p className="text-gray-600 mb-8">Оставьте заявку — менеджер свяжется с вами в течение 15 минут</p>
                <button onClick={() => navigate("contacts")} className="bg-orange text-white px-10 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity">
                  Оставить заявку
                </button>
              </div>
            </section>
          </div>
        )}

        {/* === ABOUT === */}
        {activeSection === "about" && (
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="mb-12">
              <div className="text-orange font-semibold mb-2">О компании</div>
              <h2 className="font-oswald text-navy text-5xl font-bold mb-4">ГрузМаршрут</h2>
              <p className="text-gray-600 max-w-2xl text-lg">Транспортная компания, специализирующаяся на сборных грузоперевозках по Уралу и Западной Сибири с 2012 года.</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <img src={WAREHOUSE_IMAGE} alt="О компании" className="rounded-2xl shadow-lg object-cover w-full h-80" />
              </div>
              <div className="space-y-6">
                {[
                  { icon: "Target", title: "Наша миссия", text: "Сделать логистику предсказуемой и прозрачной для каждого клиента. Мы верим, что бизнес должен знать где его груз и сколько это стоит — заранее." },
                  { icon: "Users", title: "Наша команда", text: "Более 200 сотрудников: диспетчеры, логисты, водители и менеджеры по работе с клиентами. Каждый знает своё дело." },
                  { icon: "Award", title: "Наши достижения", text: "Лауреат премии «Лучшая транспортная компания Урала» 2023. Партнёр крупнейших промышленных предприятий региона." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} size={22} className="text-orange" />
                    </div>
                    <div>
                      <div className="font-oswald text-navy text-xl font-semibold mb-1">{item.title}</div>
                      <p className="text-gray-600 text-sm">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { num: "12+", label: "лет на рынке" },
                { num: "50+", label: "городов" },
                { num: "120+", label: "единиц транспорта" },
                { num: "3 000+", label: "клиентов в год" },
              ].map((s) => (
                <div key={s.label} className="bg-gray-bg rounded-xl p-6 text-center">
                  <div className="font-oswald text-orange text-4xl font-bold mb-1">{s.num}</div>
                  <div className="text-navy text-sm font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === SERVICES === */}
        {activeSection === "services" && (
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="mb-12">
              <div className="text-orange font-semibold mb-2">Что мы делаем</div>
              <h2 className="font-oswald text-navy text-5xl font-bold mb-4">Наши услуги</h2>
              <p className="text-gray-600 max-w-xl">Полный спектр логистических услуг для бизнеса любого масштаба</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: "Package", title: "Сборные грузоперевозки", desc: "Объединяем грузы нескольких клиентов в один рейс. Экономично и быстро для небольших партий товара.", tag: "Популярное" },
                { icon: "Truck", title: "Полная загрузка (FTL)", desc: "Выделенный автомобиль под ваш груз. Гарантированная дата доставки без пересадок.", tag: null },
                { icon: "Warehouse", title: "Складское хранение", desc: "Ответственное хранение на наших складах с учётом специальных условий для вашего товара.", tag: null },
                { icon: "RefreshCw", title: "Возвратная логистика", desc: "Организуем обратную доставку товаров от покупателей, обработку возвратов и повторную отправку.", tag: null },
                { icon: "Shield", title: "Страхование груза", desc: "Страхуем каждый груз на полную стоимость. Выплаты в течение 30 дней при наступлении страхового случая.", tag: null },
                { icon: "Zap", title: "Срочная доставка", desc: "Экспресс-перевозка «день в день» или «следующий день» для критически важных грузов.", tag: "Срочно" },
              ].map((svc) => (
                <div key={svc.title} className="bg-white border border-gray-200 rounded-2xl p-6 relative" style={{ transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 32px rgba(13,34,64,0.12)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}>
                  {svc.tag && (
                    <span className="absolute top-4 right-4 bg-orange text-white text-xs px-2 py-1 rounded-full font-medium">{svc.tag}</span>
                  )}
                  <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center mb-4">
                    <Icon name={svc.icon} size={22} className="text-orange" />
                  </div>
                  <h3 className="font-oswald text-navy text-xl font-semibold mb-2">{svc.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{svc.desc}</p>
                  <button onClick={() => navigate("contacts")} className="text-orange text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    Запросить <Icon name="ArrowRight" size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === TARIFFS === */}
        {activeSection === "tariffs" && (
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="mb-12">
              <div className="text-orange font-semibold mb-2">Прозрачное ценообразование</div>
              <h2 className="font-oswald text-navy text-5xl font-bold mb-4">Тарифы</h2>
              <p className="text-gray-600 max-w-xl">Цена фиксируется в договоре — никаких дополнительных платежей «по факту»</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { name: "Стандарт", price: "от 2 500 ₽", desc: "Сборный груз, стандартные сроки", features: ["Груз до 500 кг", "Срок: 3–5 дней", "Страховка включена", "Отслеживание онлайн"], highlight: false },
                { name: "Бизнес", price: "от 8 000 ₽", desc: "Оптимальное решение для регулярных отправок", features: ["Груз до 2 000 кг", "Срок: 2–3 дня", "Страховка включена", "Персональный менеджер", "Отсрочка платежа 14 дней"], highlight: true },
                { name: "Экспресс", price: "от 15 000 ₽", desc: "Срочная доставка в приоритетном режиме", features: ["Груз любого веса", "Срок: 1–2 дня", "Расширенная страховка", "Персональный менеджер", "Выделенный транспорт"], highlight: false },
              ].map((plan) => (
                <div key={plan.name} className={`rounded-2xl p-8 relative ${plan.highlight ? "bg-navy text-white" : "bg-white border border-gray-200"}`}>
                  {plan.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange text-white text-xs px-4 py-1 rounded-full font-semibold">Популярный</div>}
                  <div className={`font-oswald text-2xl font-bold mb-1 ${plan.highlight ? "text-white" : "text-navy"}`}>{plan.name}</div>
                  <div className={`text-3xl font-bold mb-2 ${plan.highlight ? "text-orange" : "text-navy"}`}>{plan.price}</div>
                  <p className={`text-sm mb-6 ${plan.highlight ? "text-white/70" : "text-gray-500"}`}>{plan.desc}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className={`flex items-center gap-2 text-sm ${plan.highlight ? "text-white/90" : "text-gray-600"}`}>
                        <Icon name="Check" size={16} className="text-orange flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => navigate("contacts")} className={`w-full py-3 rounded-xl font-semibold transition-all ${plan.highlight ? "bg-orange text-white hover:opacity-90" : "border-2 border-navy text-navy hover:bg-navy hover:text-white"}`}>
                    Выбрать тариф
                  </button>
                </div>
              ))}
            </div>
            <div className="bg-gray-bg rounded-2xl p-6 text-center">
              <p className="text-gray-600 mb-4">Нужен индивидуальный тариф для регулярных перевозок?</p>
              <button onClick={() => navigate("contacts")} className="bg-navy text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                Запросить коммерческое предложение
              </button>
            </div>
          </div>
        )}

        {/* === TRACKING === */}
        {activeSection === "tracking" && (
          <div className="max-w-3xl mx-auto px-6 py-16">
            <div className="mb-12 text-center">
              <div className="text-orange font-semibold mb-2">Где мой груз?</div>
              <h2 className="font-oswald text-navy text-5xl font-bold mb-4">Отслеживание</h2>
              <p className="text-gray-600">Введите номер заказа, чтобы узнать статус вашего груза</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm mb-6">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Например: GM-2024-0341"
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
                />
                <button onClick={handleTrack} className="bg-orange text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
                  <Icon name="Search" size={18} />
                  Найти
                </button>
              </div>
              <p className="text-gray-400 text-xs mt-3">Для теста введите номер, начинающийся с GM, например: GM-2024-0341</p>
            </div>

            {trackingResult === "found" && (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon name="PackageCheck" size={20} className="text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-navy">{trackingNumber}</div>
                    <div className="text-sm text-gray-500">Екатеринбург → Челябинск</div>
                  </div>
                  <span className="ml-auto bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium">Доставлен</span>
                </div>
                <div>
                  {[
                    { label: "Принят на склад", date: "25.04.2026, 09:15", done: true },
                    { label: "Отправлен из Екатеринбурга", date: "26.04.2026, 06:00", done: true },
                    { label: "Прибыл в Челябинск", date: "27.04.2026, 14:30", done: true },
                    { label: "Доставлен получателю", date: "28.04.2026, 11:00", done: true },
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4 mb-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-500">
                          <Icon name="Check" size={14} className="text-white" />
                        </div>
                        {i < 3 && <div className="w-0.5 h-6 bg-gray-200 mt-1" />}
                      </div>
                      <div className="pt-1">
                        <div className="font-medium text-navy text-sm">{step.label}</div>
                        <div className="text-gray-400 text-xs">{step.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {trackingResult === "notfound" && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center animate-fade-in">
                <Icon name="PackageX" size={40} className="text-red-400 mx-auto mb-3" />
                <p className="text-red-700 font-semibold mb-2">Заказ не найден</p>
                <p className="text-red-500 text-sm">Проверьте номер заказа или обратитесь в службу поддержки</p>
              </div>
            )}
          </div>
        )}

        {/* === CALCULATOR === */}
        {activeSection === "calculator" && (
          <div className="max-w-3xl mx-auto px-6 py-16">
            <div className="mb-12 text-center">
              <div className="text-orange font-semibold mb-2">Считаем быстро</div>
              <h2 className="font-oswald text-navy text-5xl font-bold mb-4">Калькулятор доставки</h2>
              <p className="text-gray-600">Получите предварительный расчёт стоимости за 30 секунд</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <form onSubmit={handleCalc} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-navy mb-2 block">Откуда</label>
                    <select value={calcForm.from} onChange={(e) => setCalcForm({ ...calcForm, from: e.target.value })} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy" required>
                      <option value="">Выберите город</option>
                      {["Екатеринбург", "Тюмень", "Челябинск", "Пермь", "Уфа", "Курган", "Салехард"].map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-navy mb-2 block">Куда</label>
                    <select value={calcForm.to} onChange={(e) => setCalcForm({ ...calcForm, to: e.target.value })} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy" required>
                      <option value="">Выберите город</option>
                      {["Екатеринбург", "Тюмень", "Челябинск", "Пермь", "Уфа", "Курган", "Салехард"].map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-navy mb-2 block">Вес груза (кг)</label>
                    <input type="number" value={calcForm.weight} onChange={(e) => setCalcForm({ ...calcForm, weight: e.target.value })} placeholder="500" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-navy mb-2 block">Объём (м³)</label>
                    <input type="number" value={calcForm.volume} onChange={(e) => setCalcForm({ ...calcForm, volume: e.target.value })} placeholder="2.5" step="0.1" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy" required />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-navy mb-2 block">Тип груза</label>
                  <select className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy">
                    <option>Промышленное оборудование</option>
                    <option>Продукты питания</option>
                    <option>Строительные материалы</option>
                    <option>Бытовая техника</option>
                    <option>Прочее</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-orange text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  <Icon name="Calculator" size={20} />
                  Рассчитать стоимость
                </button>
              </form>

              {calcResult !== null && (
                <div className="mt-6 bg-navy rounded-2xl p-6 text-center animate-fade-in">
                  <p className="text-white/70 text-sm mb-2">Предварительная стоимость</p>
                  <p className="font-oswald text-orange text-5xl font-bold mb-1">{calcResult.toLocaleString("ru-RU")} ₽</p>
                  <p className="text-white/50 text-xs mb-4">Окончательная цена фиксируется в договоре</p>
                  <button onClick={() => navigate("contacts")} className="bg-orange text-white px-6 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
                    Оформить заявку
                  </button>
                </div>
              )}
            </div>
            <p className="text-center text-gray-400 text-xs mt-4">* Расчёт предварительный. Точная стоимость — после уточнения деталей у менеджера</p>
          </div>
        )}

        {/* === BLOG === */}
        {activeSection === "blog" && (
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="mb-12">
              <div className="text-orange font-semibold mb-2">Полезные материалы</div>
              <h2 className="font-oswald text-navy text-5xl font-bold mb-4">Блог</h2>
              <p className="text-gray-600 max-w-xl">Советы по логистике, новости компании и изменения в законодательстве</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { tag: "Советы", date: "24 апреля 2026", title: "Как правильно упаковать груз для сборной перевозки", excerpt: "Рассказываем о требованиях к упаковке и как избежать повреждений при транспортировке.", read: "5 мин" },
                { tag: "Законодательство", date: "18 апреля 2026", title: "Новые правила весового контроля на дорогах Урала с 2026 года", excerpt: "Что изменилось и как это влияет на сроки и стоимость доставки для грузоотправителей.", read: "7 мин" },
                { tag: "Кейсы", date: "10 апреля 2026", title: "Как мы доставили 50 тонн оборудования в Ямал за 4 дня", excerpt: "История о том, как слаженная работа команды позволила выполнить сверхсрочный заказ.", read: "8 мин" },
                { tag: "Советы", date: "2 апреля 2026", title: "Сборная vs выделенная машина: что выгоднее для вашего бизнеса", excerpt: "Разбираем, когда имеет смысл брать полную загрузку, а когда выгоднее сборный груз.", read: "6 мин" },
                { tag: "Новости", date: "25 марта 2026", title: "ГрузМаршрут открывает новый терминал в Тюмени", excerpt: "Расширяем инфраструктуру: новый склад площадью 3 000 м² уже принимает грузы.", read: "3 мин" },
                { tag: "Советы", date: "15 марта 2026", title: "Страхование груза: зачем и как правильно оформить", excerpt: "Объясняем, как работает страхование, что покрывается и как быстро получить выплату.", read: "5 мин" },
              ].map((post) => (
                <article key={post.title} className="bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer"
                  style={{ transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(13,34,64,0.12)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                  <div className="bg-gray-bg h-40 flex items-center justify-center">
                    <Icon name="FileText" size={40} className="text-gray-300" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-orange/10 text-orange text-xs px-2 py-1 rounded-full font-medium">{post.tag}</span>
                      <span className="text-gray-400 text-xs">{post.date}</span>
                    </div>
                    <h3 className="font-oswald text-navy text-xl font-semibold mb-2 leading-tight">{post.title}</h3>
                    <p className="text-gray-500 text-sm mb-4">{post.excerpt}</p>
                    <div className="flex items-center text-orange text-sm font-semibold gap-1">
                      Читать <Icon name="ArrowRight" size={14} /> <span className="text-gray-400 ml-auto font-normal">{post.read}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* === CONTACTS === */}
        {activeSection === "contacts" && (
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="mb-12">
              <div className="text-orange font-semibold mb-2">Свяжитесь с нами</div>
              <h2 className="font-oswald text-navy text-5xl font-bold mb-4">Контакты</h2>
              <p className="text-gray-600">Менеджер ответит в течение 15 минут в рабочее время</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (343) 200-00-00" },
                  { icon: "Mail", label: "Email", value: "info@gruzmarshut.ru" },
                  { icon: "MapPin", label: "Адрес", value: "Екатеринбург, ул. Транспортная, 15" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 08:00–19:00, Сб: 09:00–15:00" },
                ].map((c) => (
                  <div key={c.label} className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name={c.icon} size={20} className="text-orange" />
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">{c.label}</div>
                      <div className="text-navy font-semibold">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <h3 className="font-oswald text-navy text-2xl font-bold mb-6">Оставить заявку</h3>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <input type="text" placeholder="Ваше имя" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy" />
                  <input type="text" placeholder="Компания" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy" />
                  <input type="tel" placeholder="Телефон" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy" />
                  <textarea placeholder="Опишите ваш груз и направление" rows={4} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy resize-none" />
                  <button type="submit" className="w-full bg-orange text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                    Отправить заявку
                  </button>
                  <p className="text-gray-400 text-xs text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* === CABINET === */}
        {activeSection === "cabinet" && (
          <div className="max-w-5xl mx-auto px-6 py-16">
            {!isLoggedIn ? (
              <div className="max-w-md mx-auto">
                <div className="text-center mb-10">
                  <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon name="User" size={28} className="text-orange" />
                  </div>
                  <h2 className="font-oswald text-navy text-4xl font-bold mb-2">Личный кабинет</h2>
                  <p className="text-gray-500">Войдите, чтобы просматривать заказы и счета</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-navy mb-2 block">Email</label>
                      <input type="email" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} placeholder="your@company.ru" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-navy mb-2 block">Пароль</label>
                      <input type="password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} placeholder="••••••••" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy" required />
                    </div>
                    <button type="submit" className="w-full bg-navy text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                      Войти
                    </button>
                    <div className="text-center">
                      <button type="button" className="text-orange text-sm hover:underline">Забыли пароль?</button>
                    </div>
                  </form>
                  <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                    <p className="text-gray-500 text-sm mb-3">Нет аккаунта?</p>
                    <button onClick={() => navigate("contacts")} className="text-navy font-semibold text-sm hover:text-orange transition-colors">
                      Оставьте заявку — мы создадим доступ
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="font-oswald text-navy text-4xl font-bold">Личный кабинет</h2>
                    <p className="text-gray-500 mt-1">ООО «Компания Клиента» · ivan@company.ru</p>
                  </div>
                  <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-2 text-gray-500 hover:text-navy text-sm">
                    <Icon name="LogOut" size={16} /> Выйти
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { icon: "Package", label: "Всего заказов", value: "4" },
                    { icon: "Truck", label: "В пути", value: "1" },
                    { icon: "CheckCircle", label: "Доставлено", value: "3" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4">
                      <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon name={stat.icon} size={20} className="text-orange" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-navy font-oswald">{stat.value}</div>
                        <div className="text-gray-400 text-xs">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="flex border-b border-gray-200">
                    <button onClick={() => setCabinetTab("orders")} className={`flex-1 py-4 text-sm font-semibold transition-colors ${cabinetTab === "orders" ? "text-orange border-b-2 border-orange bg-orange/5" : "text-gray-500 hover:text-navy"}`}>
                      История заказов
                    </button>
                    <button onClick={() => setCabinetTab("invoices")} className={`flex-1 py-4 text-sm font-semibold transition-colors ${cabinetTab === "invoices" ? "text-orange border-b-2 border-orange bg-orange/5" : "text-gray-500 hover:text-navy"}`}>
                      Счета
                    </button>
                  </div>

                  {cabinetTab === "orders" && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-bg">
                          <tr>
                            {["Номер заказа", "Откуда", "Куда", "Дата", "Вес", "Стоимость", "Статус"].map((h) => (
                              <th key={h} className="text-left py-3 px-4 text-gray-500 font-medium text-xs">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {MOCK_ORDERS.map((order) => (
                            <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                              <td className="py-4 px-4 font-medium text-navy">{order.id}</td>
                              <td className="py-4 px-4 text-gray-600">{order.from}</td>
                              <td className="py-4 px-4 text-gray-600">{order.to}</td>
                              <td className="py-4 px-4 text-gray-500">{order.date}</td>
                              <td className="py-4 px-4 text-gray-600">{order.weight}</td>
                              <td className="py-4 px-4 font-semibold text-navy">{order.price}</td>
                              <td className="py-4 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === "Доставлен" ? "bg-green-100 text-green-700" : "bg-orange/10 text-orange"}`}>
                                  {order.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {cabinetTab === "invoices" && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-bg">
                          <tr>
                            {["Номер счёта", "Дата", "Сумма", "Статус", "Действия"].map((h) => (
                              <th key={h} className="text-left py-3 px-4 text-gray-500 font-medium text-xs">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {MOCK_INVOICES.map((inv) => (
                            <tr key={inv.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                              <td className="py-4 px-4 font-medium text-navy">{inv.id}</td>
                              <td className="py-4 px-4 text-gray-500">{inv.date}</td>
                              <td className="py-4 px-4 font-semibold text-navy">{inv.amount}</td>
                              <td className="py-4 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${inv.status === "Оплачен" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                                  {inv.status}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <button className="flex items-center gap-1 text-navy hover:text-orange text-xs font-medium transition-colors">
                                  <Icon name="Download" size={14} /> Скачать PDF
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-navy text-white mt-8">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange rounded-lg flex items-center justify-center">
                <Icon name="Truck" size={20} className="text-white" />
              </div>
              <div>
                <div className="font-oswald text-white font-bold">ГРУЗМАРШРУТ</div>
                <div className="text-white/40 text-xs">транспортная компания</div>
              </div>
            </div>
            <p className="text-white/50 text-sm">Надёжные грузоперевозки по Уралу и Западной Сибири с 2012 года</p>
          </div>
          <div>
            <div className="font-oswald font-semibold mb-4 text-white">Разделы</div>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.section}>
                  <button onClick={() => navigate(item.section)} className="text-white/60 hover:text-orange text-sm transition-colors">
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-oswald font-semibold mb-4 text-white">Контакты</div>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>+7 (343) 200-00-00</li>
              <li>info@gruzmarshut.ru</li>
              <li>Екатеринбург, ул. Транспортная, 15</li>
              <li>Пн–Пт: 08:00–19:00</li>
            </ul>
          </div>
          <div>
            <div className="font-oswald font-semibold mb-4 text-white">Документы</div>
            <ul className="space-y-2 text-white/60 text-sm">
              <li><button className="hover:text-orange transition-colors">Политика конфиденциальности</button></li>
              <li><button className="hover:text-orange transition-colors">Договор оферты</button></li>
              <li><button className="hover:text-orange transition-colors">Реквизиты компании</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-4">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="text-white/40 text-xs">© 2026 ГрузМаршрут. Все права защищены.</p>
            <p className="text-white/40 text-xs">ИНН: 6670000001 · ОГРН: 1126670000001</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;