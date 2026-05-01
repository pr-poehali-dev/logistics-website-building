import Icon from "@/components/ui/icon";
import { Section, TRUCK_IMAGE, STRESSED_IMAGE } from "./shared";
import { WaIcon } from "./Header";

const SectionHome = ({ onNav }: { onNav: (s: Section) => void }) => (
  <>
    {/* HERO */}
    <section style={{ background: "#fff", overflow: "hidden" }}>
      <div className="max-w-7xl mx-auto px-5">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 520, alignItems: "center" }} className="max-lg:block">
          <div style={{ paddingTop: 56, paddingBottom: 56, paddingRight: 40 }} className="animate-fade-in">
            <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 52, fontWeight: 700, lineHeight: 1.08, color: "#0d2240", margin: "0 0 16px" }}>
              Сборные<br />
              грузоперевозки<br />
              <span style={{ color: "#e85d04" }}>без срывов сроков<br />и потерь по Уралу</span>
            </h1>
            <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.6, marginBottom: 32, maxWidth: 400 }}>
              Для бизнеса: фиксированные цены, доставка<br />«от двери до двери» и полная ответственность за груз
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 40 }}>
              <button onClick={() => onNav("calculator")}
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
          <div style={{ height: "100%", minHeight: 520, position: "relative" }} className="hidden lg:block">
            <img src={TRUCK_IMAGE} alt="Грузовик на дороге"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
          </div>
        </div>
      </div>
    </section>

    {/* ЗНАКОМО? */}
    <section style={{ background: "#f4f6f9", padding: "64px 0" }}>
      <div className="max-w-7xl mx-auto px-5" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
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

    {/* ЦИФРЫ */}
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

    {/* УСЛУГИ */}
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
              <button onClick={() => onNav("contacts")}
                style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: "#e85d04", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                Узнать подробнее <Icon name="ArrowRight" size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section style={{ background: "#0d2240", padding: "56px 0" }}>
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", padding: "0 20px" }}>
        <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 38, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Готовы к доставке?</h2>
        <p style={{ color: "rgba(255,255,255,.55)", marginBottom: 28, fontSize: 15 }}>Оставьте заявку — ответим за 15 минут</p>
        <button onClick={() => onNav("contacts")}
          style={{ background: "#e85d04", color: "#fff", border: "none", borderRadius: 10, padding: "16px 48px", fontSize: 17, fontWeight: 700, cursor: "pointer", transition: "background .2s" }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#d04e00"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#e85d04"}>
          Оставить заявку
        </button>
      </div>
    </section>
  </>
);

export default SectionHome;
