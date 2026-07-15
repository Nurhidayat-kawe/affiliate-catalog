import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const SECRET = "affiliate-catalog-secret-2024";

export function checkAuth(): boolean {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("admin_token");
    return token?.value === SECRET;
  } catch {
    return false;
  }
}

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function getSecret(): string {
  return SECRET;
}
