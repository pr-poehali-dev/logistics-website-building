import Icon from "@/components/ui/icon";
import { Section } from "./shared";

export const WaIcon = ({ size = 18, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const NAV_LABELS = ["О компании", "Услуги", "Направления", "Преимущества", "Контакты"] as const;
const NAV_SECTIONS: Section[] = ["about", "services", "tariffs", "blog", "contacts"];

interface HeaderProps {
  activeSection: Section;
  mobileMenuOpen: boolean;
  isLoggedIn: boolean;
  onNav: (s: Section) => void;
  onToggleMobile: () => void;
}

const Header = ({ activeSection, mobileMenuOpen, isLoggedIn, onNav, onToggleMobile }: HeaderProps) => (
  <header style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(229,231,235,0.6)" }} className="sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-[68px]">

      {/* Логотип */}
      <button onClick={() => onNav("home")} className="flex items-center">
        <img
          src="https://cdn.poehali.dev/projects/89a0b4bd-4d22-4025-802f-4ba001300c9c/bucket/36818032-1268-4847-9d2c-d69b1f55ff99.jpg"
          alt="RailWay"
          style={{ height: 52, width: "auto", objectFit: "contain" }}
        />
      </button>

      {/* Навигация */}
      <nav className="hidden lg:flex items-center gap-7">
        {NAV_LABELS.map((label, i) => (
          <button key={label} onClick={() => onNav(NAV_SECTIONS[i])}
            style={{ fontSize: 14, fontWeight: 500, color: activeSection === NAV_SECTIONS[i] ? "#e85d04" : "#374151", transition: "color .2s" }}
            onMouseEnter={e => { if (activeSection !== NAV_SECTIONS[i]) (e.target as HTMLElement).style.color = "#e85d04"; }}
            onMouseLeave={e => { if (activeSection !== NAV_SECTIONS[i]) (e.target as HTMLElement).style.color = "#374151"; }}>
            {label}
          </button>
        ))}
      </nav>

      {/* WhatsApp + вход */}
      <div className="hidden lg:flex items-center gap-3">
        <button onClick={() => onNav("cabinet")} style={{ fontSize: 13, color: "#6b7280", fontWeight: 500 }}
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

      <button className="lg:hidden" onClick={onToggleMobile}>
        <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} className="text-[#0d2240]" />
      </button>
    </div>

    {mobileMenuOpen && (
      <div style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(243,244,246,0.7)", padding: "12px 20px" }} className="lg:hidden flex flex-col gap-2">
        {NAV_LABELS.map((label, i) => (
          <button key={label} onClick={() => onNav(NAV_SECTIONS[i])}
            style={{ textAlign: "left", padding: "10px 0", borderBottom: "1px solid #f3f4f6", fontSize: 14, color: "#374151" }}>
            {label}
          </button>
        ))}
        <button onClick={() => onNav("cabinet")} style={{ textAlign: "left", padding: "10px 0", fontSize: 14, color: "#374151" }}>
          {isLoggedIn ? "Личный кабинет" : "Войти"}
        </button>
      </div>
    )}
  </header>
);

export default Header;