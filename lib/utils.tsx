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
  return val < 0 ? "text-red-600" : val === 0 ? "text-black" : "text-green-600";
}

export const formatNumber = (val: number | string, color?: boolean, symbol?: boolean) => {
  let formattedVal = val;
  if (typeof formattedVal === 'string' ) {
    formattedVal = parseInt(String(val));
  }

  return (
    <span className={cn(color && colorByValue(formattedVal))}>{formattedVal.toLocaleString()}</span>
  )
}