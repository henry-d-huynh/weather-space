import { IsoDate } from "../types/iso-date.type";

export function toIsoDate(date: Date): IsoDate {
  return {
    type: "date",
    format: "iso8601",
    value: date.toISOString(),
  };
}
