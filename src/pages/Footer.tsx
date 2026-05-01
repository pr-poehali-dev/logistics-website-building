import { Section } from "./shared";

interface FooterProps {
  onNav: (s: Section) => void;
}

const Footer = ({ onNav }: FooterProps) => (
  <footer style={{ background: "#0d2240", color: "#fff", marginTop: 32 }}>
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 20px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32 }} className="max-md:grid-cols-2">
      <div>
        <div style={{ marginBottom: 14 }}>
          <img
            src="https://cdn.poehali.dev/projects/89a0b4bd-4d22-4025-802f-4ba001300c9c/bucket/36818032-1268-4847-9d2c-d69b1f55ff99.jpg"
            alt="RailWay"
            style={{ height: 56, width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }}
          />
        </div>
        <p style={{ color: "rgba(255,255,255,.45)", fontSize: 13 }}>Надёжные грузоперевозки по Уралу и Западной Сибири с 2012 года</p>
      </div>

      <div>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 17, fontWeight: 600, marginBottom: 16 }}>Разделы</div>
        {([["О компании", "about"], ["Услуги", "services"], ["Направления", "tariffs"], ["Преимущества", "blog"], ["Контакты", "contacts"]] as [string, Section][]).map(([l, s]) => (
          <button key={s} onClick={() => onNav(s)}
            style={{ display: "block", color: "rgba(255,255,255,.45)", fontSize: 13, background: "none", border: "none", cursor: "pointer", padding: "4px 0", textAlign: "left" }}
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
          <button key={t}
            style={{ display: "block", color: "rgba(255,255,255,.45)", fontSize: 13, background: "none", border: "none", cursor: "pointer", padding: "4px 0", textAlign: "left" }}
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
);

export default Footer;