import { Currency } from "src/entities/currency";

export const fromRawToFormated = (value: number, decimals: number): number =>
  Number((value / 10 ** decimals).toFixed(decimals));

export const fromRawToFormatedWithCode = (
  value: number,
  currency: Currency
): string => `${fromRawToFormated(value, currency.decimal)} ${currency.code}`;
