export type DemoAccount = {
  username: string;
  password: string;
  name: string;
};

export const DEMO_ACCOUNTS: DemoAccount[] = [
  { username: "admin", password: "password123", name: "Nimda" },
  { username: "demo", password: "demo456", name: "Omed" },
];
