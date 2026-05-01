import { useState } from "react";
import { Section } from "./shared";
import Header from "./Header";
import Footer from "./Footer";
import Sections from "./Sections";

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
      <Header
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        isLoggedIn={isLoggedIn}
        onNav={nav}
        onToggleMobile={() => setMobileMenuOpen(!mobileMenuOpen)}
      />
      <Sections
        activeSection={activeSection}
        onNav={nav}
        trackingNumber={trackingNumber}
        setTrackingNumber={setTrackingNumber}
        trackingResult={trackingResult}
        handleTrack={handleTrack}
        calcForm={calcForm}
        setCalcForm={setCalcForm}
        calcResult={calcResult}
        handleCalc={handleCalc}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        handleLogin={handleLogin}
        cabinetTab={cabinetTab}
        setCabinetTab={setCabinetTab}
      />
      <Footer onNav={nav} />
    </div>
  );
};

export default Index;
