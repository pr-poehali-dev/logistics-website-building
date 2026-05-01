import Icon from "@/components/ui/icon";
import { Section, WAREHOUSE_IMAGE } from "./shared";
import { WaIcon } from "./Header";

const glass = "rgba(255,255,255,0.75)";
const glassDark = "rgba(244,246,249,0.75)";
const blur = "blur(8px)";

/* ══════════════ ABOUT ══════════════ */
export const SectionAbout = () => (
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
          <div key={item.title} style={{ display: "flex", gap: 16, background: glass, borderRadius: 14, padding: 16, backdropFilter: blur }}>
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
        <div key={l} style={{ background: glassDark, borderRadius: 14, padding: 24, textAlign: "center", backdropFilter: blur }}>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 38, fontWeight: 700, color: "#e85d04" }}>{n}</div>
          <div style={{ fontSize: 13, color: "#0d2240", fontWeight: 500, marginTop: 4 }}>{l}</div>
        </div>
      ))}
    </div>
  </div>
);

/* ══════════════ SERVICES ══════════════ */
export const SectionServices = ({ onNav }: { onNav: (s: Section) => void }) => (
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
          style={{ background: glass, border: "1px solid rgba(229,231,235,0.7)", borderRadius: 16, padding: 24, position: "relative", transition: "box-shadow .2s", backdropFilter: blur }}
          onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,.1)"}
          onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = ""}>
          {s.tag && <span style={{ position: "absolute", top: 14, right: 14, background: "#e85d04", color: "#fff", fontSize: 11, padding: "3px 10px", borderRadius: 20, fontWeight: 600 }}>{s.tag}</span>}
          <div style={{ width: 48, height: 48, background: "#0d2240", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
            <Icon name={s.icon} size={22} className="text-[#e85d04]" />
          </div>
          <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 19, fontWeight: 600, color: "#0d2240", marginBottom: 8 }}>{s.title}</h3>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16, lineHeight: 1.5 }}>{s.desc}</p>
          <button onClick={() => onNav("contacts")} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: "#e85d04", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            Запросить <Icon name="ArrowRight" size={14} />
          </button>
        </div>
      ))}
    </div>
  </div>
);

/* ══════════════ TARIFFS ══════════════ */
export const SectionTariffs = ({ onNav }: { onNav: (s: Section) => void }) => (
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
        <div key={p.name} style={{ borderRadius: 20, padding: 32, position: "relative", background: p.highlight ? "#0d2240" : glass, border: p.highlight ? "none" : "1px solid rgba(229,231,235,0.7)", backdropFilter: p.highlight ? "none" : blur }}>
          {p.highlight && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#e85d04", color: "#fff", fontSize: 11, padding: "4px 16px", borderRadius: 20, fontWeight: 700, whiteSpace: "nowrap" }}>Популярный</div>}
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 22, fontWeight: 700, color: p.highlight ? "#fff" : "#0d2240", marginBottom: 4 }}>{p.name}</div>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#e85d04", marginBottom: 8 }}>{p.price}</div>
          <p style={{ fontSize: 13, color: p.highlight ? "rgba(255,255,255,.55)" : "#9ca3af", marginBottom: 24 }}>{p.desc}</p>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 10 }}>
            {p.features.map(f => (
              <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: p.highlight ? "rgba(255,255,255,.85)" : "#6b7280" }}>
                <Icon name="Check" size={15} className="text-[#e85d04]" />
                {f}
              </li>
            ))}
          </ul>
          <button onClick={() => onNav("contacts")}
            style={{ width: "100%", padding: "12px 0", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "all .2s", background: p.highlight ? "#e85d04" : "transparent", color: p.highlight ? "#fff" : "#0d2240", border: p.highlight ? "none" : "2px solid #0d2240" }}
            onMouseEnter={e => { if (!p.highlight) { (e.currentTarget as HTMLElement).style.background = "#0d2240"; (e.currentTarget as HTMLElement).style.color = "#fff"; } }}
            onMouseLeave={e => { if (!p.highlight) { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#0d2240"; } }}>
            Выбрать тариф
          </button>
        </div>
      ))}
    </div>
    <div style={{ background: glassDark, borderRadius: 16, padding: "24px 32px", textAlign: "center", backdropFilter: blur }}>
      <p style={{ color: "#6b7280", marginBottom: 16 }}>Нужен индивидуальный тариф для регулярных перевозок?</p>
      <button onClick={() => onNav("contacts")}
        style={{ background: "#0d2240", color: "#fff", border: "none", borderRadius: 10, padding: "12px 32px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
        Запросить КП
      </button>
    </div>
  </div>
);

/* ══════════════ BLOG (Преимущества) ══════════════ */
export const SectionBlog = () => (
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
          style={{ background: glassDark, borderRadius: 16, padding: 24, transition: "box-shadow .2s", backdropFilter: blur }}
          onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 20px rgba(0,0,0,.08)"}
          onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = ""}>
          <div style={{ width: 48, height: 48, background: glass, border: "1px solid rgba(229,231,235,0.8)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
            <Icon name={item.icon} size={22} className="text-[#e85d04]" />
          </div>
          <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 19, fontWeight: 600, color: "#0d2240", marginBottom: 8 }}>{item.title}</h3>
          <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.5 }}>{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

/* ══════════════ CONTACTS ══════════════ */
export const SectionContacts = () => (
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
          <div key={c.label} style={{ display: "flex", gap: 16, alignItems: "flex-start", background: glass, borderRadius: 14, padding: 16, backdropFilter: blur }}>
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
      <div style={{ background: glass, border: "1px solid rgba(229,231,235,0.7)", borderRadius: 20, padding: 32, boxShadow: "0 2px 16px rgba(0,0,0,.06)", backdropFilter: blur }}>
        <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 24, fontWeight: 700, color: "#0d2240", marginBottom: 24 }}>Оставить заявку</h3>
        <form onSubmit={e => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[["Ваше имя", "text"], ["Компания", "text"], ["Телефон", "tel"]].map(([ph, type]) => (
            <input key={ph} type={type} placeholder={ph}
              style={{ border: "1px solid #d1d5db", borderRadius: 12, padding: "12px 16px", fontSize: 13, outline: "none", background: "rgba(255,255,255,0.8)" }}
              onFocus={e => (e.target as HTMLInputElement).style.borderColor = "#0d2240"}
              onBlur={e => (e.target as HTMLInputElement).style.borderColor = "#d1d5db"} />
          ))}
          <textarea placeholder="Опишите груз и направление" rows={4}
            style={{ border: "1px solid #d1d5db", borderRadius: 12, padding: "12px 16px", fontSize: 13, outline: "none", resize: "none", background: "rgba(255,255,255,0.8)" }}
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
);
