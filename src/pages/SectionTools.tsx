import Icon from "@/components/ui/icon";
import { Section, MOCK_ORDERS, MOCK_INVOICES } from "./shared";
import { SectionsProps } from "./Sections";

/* ══════════════ TRACKING ══════════════ */
export const SectionTracking = ({ trackingNumber, setTrackingNumber, trackingResult, handleTrack }: Pick<SectionsProps, "trackingNumber" | "setTrackingNumber" | "trackingResult" | "handleTrack">) => (
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
);

/* ══════════════ CALCULATOR ══════════════ */
export const SectionCalculator = ({ calcForm, setCalcForm, calcResult, handleCalc, onNav }: Pick<SectionsProps, "calcForm" | "setCalcForm" | "calcResult" | "handleCalc" | "onNav">) => (
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
          <button onClick={() => onNav("contacts")}
            style={{ background: "#e85d04", color: "#fff", border: "none", borderRadius: 10, padding: "10px 28px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
            Оформить заявку
          </button>
        </div>
      )}
    </div>
  </div>
);

/* ══════════════ CABINET ══════════════ */
export const SectionCabinet = ({ isLoggedIn, setIsLoggedIn, loginForm, setLoginForm, handleLogin, cabinetTab, setCabinetTab, onNav }: Pick<SectionsProps, "isLoggedIn" | "setIsLoggedIn" | "loginForm" | "setLoginForm" | "handleLogin" | "cabinetTab" | "setCabinetTab" | "onNav">) => (
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
            <button onClick={() => onNav("contacts")} style={{ color: "#0d2240", fontWeight: 600, fontSize: 13, background: "none", border: "none", cursor: "pointer" }}>
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
);
