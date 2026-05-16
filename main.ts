import { Hono, type Context } from "hono";
import { danbooru, e621, gelbooru, randomfox, yiffrest } from "./lib/requests.ts";

const app = new Hono();

async function parseBody(c: Context): Promise<Record<string, unknown>> {
  if (c.req.method !== "POST") return {};
  return c.req.json().catch(() => ({}));
}

async function handle(c: Context, fn: () => Promise<unknown>) {
  try {
    // deno-lint-ignore no-explicit-any
    return c.json(await fn() as any);
  } catch (err: unknown) {
    return c.json({ error: err instanceof Error ? err.message : String(err) }, 400);
  }
}

app.on(["GET", "POST"], ["/e621", "/e6"], async (c) => {
  const body = await parseBody(c);
  const p = (key: string) => (body[key] as string | undefined) ?? c.req.query(key);
  const auth = c.req.header("Authorization") ?? p("apikey");
  const page = p("page");
  const limit = p("limit");
  return handle(c, () => e621({
    tags: p("tags") ?? "",
    page: page !== undefined ? Number(page) : undefined,
    limit: limit !== undefined ? Number(limit) : undefined,
    auth,
    useragent: p("useragent"),
    safe: false,
  }));
});

app.on(["GET", "POST"], ["/e926", "/e9"], async (c) => {
  const body = await parseBody(c);
  const p = (key: string) => (body[key] as string | undefined) ?? c.req.query(key);
  const auth = c.req.header("Authorization") ?? p("apikey");
  const page = p("page");
  const limit = p("limit");
  return handle(c, () => e621({
    tags: p("tags") ?? "",
    page: page !== undefined ? Number(page) : undefined,
    limit: limit !== undefined ? Number(limit) : undefined,
    auth,
    useragent: p("useragent"),
    safe: true,
  }));
});

app.on(["GET", "POST"], ["/danbooru"], async (c) => {
  const body = await parseBody(c);
  const p = (key: string) => (body[key] as string | undefined) ?? c.req.query(key);
  const auth = c.req.header("Authorization") ?? p("apikey");
  const limit = p("limit");
  return handle(c, () => danbooru({
    tags: p("tags") ?? "",
    limit: limit !== undefined ? Number(limit) : undefined,
    auth,
    useragent: p("useragent"),
  }));
});

app.on(["GET", "POST"], ["/gelbooru", "/gel"], async (c) => {
  const body = await parseBody(c);
  const p = (key: string) => (body[key] as string | undefined) ?? c.req.query(key);
  const limit = p("limit");
  return handle(c, () => gelbooru({
    tags: p("tags") ?? "",
    limit: limit !== undefined ? Number(limit) : undefined,
    api_key: p("api_key"),
    user_id: p("user_id"),
    useragent: p("useragent"),
  }));
});

app.on(["GET", "POST"], ["/yiffrest/:category"], async (c) => {
  const body = await parseBody(c);
  const p = (key: string) => (body[key] as string | undefined) ?? c.req.query(key);
  const auth = c.req.header("Authorization") ?? p("apikey");
  const amount = p("amount") ?? p("limit");
  return handle(c, () => yiffrest({
    category: c.req.param("category"),
    limit: amount !== undefined ? Number(amount) : undefined,
    auth,
    useragent: p("useragent"),
  }));
});

app.on(["GET", "POST"], ["/randomfox", "/fox"], async (c) => {
  const body = await parseBody(c);
  const p = (key: string) => (body[key] as string | undefined) ?? c.req.query(key);
  return handle(c, () => randomfox({ useragent: p("useragent") }));
});

app.get("/", (c) => c.redirect(Deno.env.get("REDIRECT") ?? "https://github.com/fangmarks/killswitch/wiki"));

Deno.serve({ port: Number(Deno.env.get("PORT") ?? 8000) }, app.fetch);
