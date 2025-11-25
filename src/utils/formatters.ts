// Fiyat biçimlendirme — 1500 → "1.500,00 ₺"
export function formatPrice(
  value: number,
  currency: string = "TRY"
): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
  }).format(value);
}

// Yüzdelik format — 20 → "%20"
export function formatPercentage(value: number): string {
  return `${value}%`;
}

// Boş ya da null değerler için fallback
export function formatNullable(value: any, fallback: string = "-"): string {
  if (value === null || value === undefined || value === "") return fallback;
  return String(value);
}

// Büyük harf ile başlatma — "apple" → "Apple"
export function capitalize(text: string): string {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Tarih formatlama — ISO date → 14.02.2025
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("tr-TR").format(new Date(date));
}
