import { IsoDate } from "@weather-space/shared";

export function toIsoDate(date: Date): IsoDate {
  return {
    type: "date",
    format: "iso8601",
    value: date.toISOString(),
  };
}
