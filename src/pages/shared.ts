export type Section =
  | "home"
  | "about"
  | "services"
  | "tariffs"
  | "tracking"
  | "calculator"
  | "blog"
  | "contacts"
  | "cabinet";

export const TRUCK_IMAGE =
  "https://cdn.poehali.dev/projects/89a0b4bd-4d22-4025-802f-4ba001300c9c/files/7e1eea3b-6b23-4245-b739-16f6e997b5e3.jpg";
export const STRESSED_IMAGE =
  "https://cdn.poehali.dev/projects/89a0b4bd-4d22-4025-802f-4ba001300c9c/files/c47b38da-8091-4d79-8a8d-03d142052d8b.jpg";
export const WAREHOUSE_IMAGE =
  "https://cdn.poehali.dev/projects/89a0b4bd-4d22-4025-802f-4ba001300c9c/files/b89ff2f5-da3a-49e7-b798-1c4ad2464f17.jpg";

export const MOCK_ORDERS = [
  { id: "GM-2024-0341", from: "Екатеринбург", to: "Челябинск", date: "28.04.2026", status: "Доставлен", weight: "450 кг", price: "8 200 ₽" },
  { id: "GM-2024-0298", from: "Тюмень", to: "Екатеринбург", date: "15.04.2026", status: "В пути", weight: "1 200 кг", price: "19 500 ₽" },
  { id: "GM-2024-0255", from: "Пермь", to: "Тюмень", date: "02.04.2026", status: "Доставлен", weight: "800 кг", price: "14 300 ₽" },
  { id: "GM-2024-0211", from: "Уфа", to: "Пермь", date: "18.03.2026", status: "Доставлен", weight: "320 кг", price: "6 800 ₽" },
];

export const MOCK_INVOICES = [
  { id: "СЧ-2026-0341", date: "28.04.2026", amount: "8 200 ₽", status: "Оплачен" },
  { id: "СЧ-2026-0298", date: "15.04.2026", amount: "19 500 ₽", status: "Ожидает оплаты" },
  { id: "СЧ-2026-0255", date: "02.04.2026", amount: "14 300 ₽", status: "Оплачен" },
];
