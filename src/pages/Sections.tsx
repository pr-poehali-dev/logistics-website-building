import { Section } from "./shared";
import SectionHome from "./SectionHome";
import { SectionAbout, SectionServices, SectionTariffs, SectionBlog, SectionContacts } from "./SectionInfo";
import { SectionTracking, SectionCalculator, SectionCabinet } from "./SectionTools";

/* ─── Общие пропсы для всех секций ─── */
export interface SectionsProps {
  activeSection: Section;
  onNav: (s: Section) => void;
  // tracking
  trackingNumber: string;
  setTrackingNumber: (v: string) => void;
  trackingResult: null | "found" | "notfound";
  handleTrack: () => void;
  // calculator
  calcForm: { from: string; to: string; weight: string; volume: string };
  setCalcForm: (v: { from: string; to: string; weight: string; volume: string }) => void;
  calcResult: number | null;
  handleCalc: (e: React.FormEvent) => void;
  // cabinet
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
  loginForm: { email: string; password: string };
  setLoginForm: (v: { email: string; password: string }) => void;
  handleLogin: (e: React.FormEvent) => void;
  cabinetTab: "orders" | "invoices";
  setCabinetTab: (v: "orders" | "invoices") => void;
}

/* ══════════════ Главный роутер секций ══════════════ */
const Sections = (props: SectionsProps) => {
  const { activeSection, onNav } = props;
  return (
    <main>
      {activeSection === "home" && <SectionHome onNav={onNav} />}
      {activeSection === "about" && <SectionAbout />}
      {activeSection === "services" && <SectionServices onNav={onNav} />}
      {activeSection === "tariffs" && <SectionTariffs onNav={onNav} />}
      {activeSection === "tracking" && (
        <SectionTracking
          trackingNumber={props.trackingNumber}
          setTrackingNumber={props.setTrackingNumber}
          trackingResult={props.trackingResult}
          handleTrack={props.handleTrack}
        />
      )}
      {activeSection === "calculator" && (
        <SectionCalculator
          calcForm={props.calcForm}
          setCalcForm={props.setCalcForm}
          calcResult={props.calcResult}
          handleCalc={props.handleCalc}
          onNav={onNav}
        />
      )}
      {activeSection === "blog" && <SectionBlog />}
      {activeSection === "contacts" && <SectionContacts />}
      {activeSection === "cabinet" && (
        <SectionCabinet
          isLoggedIn={props.isLoggedIn}
          setIsLoggedIn={props.setIsLoggedIn}
          loginForm={props.loginForm}
          setLoginForm={props.setLoginForm}
          handleLogin={props.handleLogin}
          cabinetTab={props.cabinetTab}
          setCabinetTab={props.setCabinetTab}
          onNav={onNav}
        />
      )}
    </main>
  );
};

export default Sections;
