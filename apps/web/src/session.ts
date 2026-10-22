const STORAGE_KEY = "aipetcompany.founder";

export type Founder = {
  name: string;
  email: string;
};

export function readFounder(): Founder | null {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<Founder>;
    if (typeof parsed.name !== "string" || typeof parsed.email !== "string") return null;
    return { name: parsed.name, email: parsed.email };
  } catch {
    return null;
  }
}

export function saveFounder(founder: Founder) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(founder));
}

export function clearFounder() {
  sessionStorage.removeItem(STORAGE_KEY);
}

export function nameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "";
  const words = local
    .replace(/[._-]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) return "Founder";
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
