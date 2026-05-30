import { User } from "../types/user.type";
import { DEMO_ACCOUNTS } from "@weather-space/shared";

export const USERS: Record<string, User> = Object.fromEntries(
  DEMO_ACCOUNTS.map(({ username, password, name }) => [
    username,
    { password, name },
  ]),
);
