import { User } from "./types/user.type";

export const JWT_EXPIRY = "8h";

export const USERS: Record<string, User> = {
  admin: { password: "password123", name: "Admin" },
  demo: { password: "demo456", name: "Demo User" },
};
