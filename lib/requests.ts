const UA_SUFFIX = "Killswitch-v4 (hokkqi; lio.to/killswitch)";
const DISABLE_DEFAULT_TAGS = Deno.env.has("DISABLE_DEFAULT_TAGS");

function buildHeaders(useragent?: string, auth?: string): HeadersInit {
  const ua = useragent ? `${useragent} ${UA_SUFFIX}` : UA_SUFFIX;
  const h: Record<string, string> = { "User-Agent": ua };
  if (auth) h["Authorization"] = auth;
  return h;
}

async function get(url: string, hdrs: HeadersInit): Promise<unknown> {
  const res = await fetch(url, { headers: hdrs });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
}

export function e621(opts: {
  tags: string;
  useragent?: string;
  page?: number;
  limit?: number;
  auth?: string;
  safe?: boolean;
}): Promise<unknown> {
  if (!opts.tags) throw new Error("No tags provided.");
  const page = Number(opts.page ?? 1);
  if (page > 750) throw new Error("Page cannot exceed 750.");

  const base = opts.safe ? "https://e926.net/posts.json" : "https://e621.net/posts.json";
  const tagParts: string[] = [];
  if (!DISABLE_DEFAULT_TAGS) {
    tagParts.push("order:random");
    if (!opts.safe) tagParts.push("-young");
  }
  if (opts.safe) tagParts.push("rating:s");
  tagParts.push(opts.tags);

  const params = new URLSearchParams({
    page: String(page),
    limit: String(opts.limit ?? 1),
    tags: tagParts.join(" "),
  });

  return get(`${base}?${params}`, buildHeaders(opts.useragent, opts.auth));
}

export function danbooru(opts: {
  tags: string;
  useragent?: string;
  limit?: number;
  auth?: string;
}): Promise<unknown> {
  if (!opts.tags) throw new Error("No tags provided.");

  const params = new URLSearchParams({
    tags: opts.tags,
    limit: String(opts.limit ?? 1),
  });

  return get(
    `https://danbooru.donmai.us/posts/random.json?${params}`,
    buildHeaders(opts.useragent, opts.auth),
  );
}

export function gelbooru(opts: {
  tags: string;
  useragent?: string;
  limit?: number;
  api_key?: string;
  user_id?: string;
}): Promise<unknown> {
  if (!opts.tags) throw new Error("No tags provided.");

  const tagParts: string[] = [];
  if (!DISABLE_DEFAULT_TAGS) tagParts.push("sort:random");
  tagParts.push(opts.tags);
  const tagStr = tagParts.join(" ").trim().split(/\s+/).join("+");

  let url = `https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&limit=${opts.limit ?? 1}&tags=${tagStr}`;
  if (opts.api_key && opts.user_id) url += `&api_key=${opts.api_key}&user_id=${opts.user_id}`;

  return get(url, buildHeaders(opts.useragent));
}

export function yiffrest(opts: {
  category: string;
  useragent?: string;
  limit?: number;
  auth?: string;
}): Promise<unknown> {
  if (!opts.category) throw new Error("No category provided.");

  const params = new URLSearchParams({ amount: String(opts.limit ?? 1) });
  return get(
    `https://v2.yiff.rest/${opts.category}?${params}`,
    buildHeaders(opts.useragent, opts.auth),
  );
}

export function randomfox(opts: { useragent?: string } = {}): Promise<unknown> {
  return get("https://randomfox.ca/floof/", buildHeaders(opts.useragent));
}
