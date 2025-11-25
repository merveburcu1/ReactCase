
export function formatPrice(
  value: number,
  currency: string = "TRY"
): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
  }).format(value);
}


export function formatPercentage(value: number): string {
  return `${value}%`;
}


export function formatNullable(value: any, fallback: string = "-"): string {
  if (value === null || value === undefined || value === "") return fallback;
  return String(value);
}


export function capitalize(text: string): string {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}


export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("tr-TR").format(new Date(date));
}
