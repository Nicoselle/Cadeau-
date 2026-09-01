/** HTTP Basic voor /safe. Fail closed: ontbreekt of leeg wachtwoord → nooit binnen. */

export function safeStringsEqual(left: string, right: string): boolean {
  if (left.length !== right.length) return false;
  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) {
    mismatch |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return mismatch === 0;
}

export function parseBasicAuthorization(
  header: string | null | undefined,
): { user: string; password: string } | null {
  if (!header) return null;
  const match = /^Basic\s+(\S+)/i.exec(header.trim());
  if (!match) return null;
  try {
    const decoded = atob(match[1]);
    const colon = decoded.indexOf(":");
    if (colon < 0) return null;
    return {
      user: decoded.slice(0, colon),
      password: decoded.slice(colon + 1),
    };
  } catch {
    return null;
  }
}

export function authorizeSafe(
  header: string | null | undefined,
  password: string | undefined,
): boolean {
  if (!password) return false;
  const parsed = parseBasicAuthorization(header);
  if (!parsed) return false;
  return safeStringsEqual(parsed.password, password);
}

export function unauthorizedSafeResponse(): Response {
  return new Response("Niet geautoriseerd.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Safe Capital"',
      "Cache-Control": "no-store",
    },
  });
}
