export type User = {
  password: string;
  name: string;
};

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = "8h";

export const USERS: Record<string, User> = {
  admin: { password: "password123", name: "Admin" },
  demo: { password: "demo456", name: "Demo User" },
};
