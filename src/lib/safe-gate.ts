export const SAFE_REALM = "Safe Capital";

export function resolveSafePassword(
  raw: string | undefined | null,
): string | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function parseBasicCredentials(
  header: string | null,
): { username: string; password: string } | null {
  if (!header) return null;
  const match = /^Basic\s+(\S+)/i.exec(header.trim());
  if (!match?.[1]) return null;
  try {
    const decoded = atob(match[1]);
    const cut = decoded.indexOf(":");
    if (cut < 0) return { username: decoded, password: "" };
    return {
      username: decoded.slice(0, cut),
      password: decoded.slice(cut + 1),
    };
  } catch {
    return null;
  }
}

export function authorizeSafeRequest(
  header: string | null,
  rawPassword: string | undefined | null = process.env.SAFE_PASSWORD,
): boolean {
  const expected = resolveSafePassword(rawPassword);
  if (!expected) return false;
  const credentials = parseBasicCredentials(header);
  if (!credentials) return false;
  return credentials.password === expected;
}

export function unauthorizedSafeResponse(body = "Unauthorized"): Response {
  return new Response(body, {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${SAFE_REALM}", charset="UTF-8"`,
      "Cache-Control": "no-store",
    },
  });
}
