import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  maximumFractionDigits: 0,
  currency: "MYR",
  currencyDisplay: 'narrowSymbol'
})

export const colorByValue = (val: number) => {
  return val < 0 ? "text-red-600" : val === 0 ? "text-muted-foreground" : "text-grenn-600";
}