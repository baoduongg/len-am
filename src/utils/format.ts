/**
 * Formats a raw number value into a standard Vietnamese Dong (VND) price string.
 * Example: 480000 -> "480.000đ"
 */
export function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + "đ";
}
