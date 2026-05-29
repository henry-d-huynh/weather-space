import { IsoDate } from "./iso-date.type";

export type Message = {
  city: string;
  message: string;
  timestamp: IsoDate;
};
