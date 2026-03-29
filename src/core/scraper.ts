const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

export async function fetchProfileHTML(
  username: string
): Promise<{ html: string; status: number }> {
  const url = `https://www.codechef.com/users/${encodeURIComponent(username)}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "text/html,application/xhtml+xml",
    },
    redirect: "follow",
  });

  if (!res.ok) {
    return { html: "", status: res.status };
  }

  const html = await res.text();
  return { html, status: res.status };
}
