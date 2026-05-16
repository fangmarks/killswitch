# Killswitch

killswitch is a proxy API for [fangmarks/yiff](https://lio.to/yiff)

### Supported Sites

- [x] e621.net
- [x] e926.net
- [x] danbooru.donmai.us
- [x] gelbooru.com
- [x] yiff.rest
- [x] randomfox.ca

### Dropped Sites

- sheri.bot — API key revoked, unable to maintain
- shibe.online — domain expired, API is dead
- thaldr.in — API never launched
- floofy.dev — API discontinued

> [!NOTE]
> If a site you want is missing, open an issue. If you own the API, a PR is welcome — include a link to the docs or a Discord where questions can be asked.

## Usage

Requires Docker, or Deno 2+ and Git.

### Docker

```sh
docker run -p 8000:8000 -d ghcr.io/fangmarks/killswitch
```

Pass environment variables with `-e`:

```sh
docker run -p 8000:8000 -e PORT=3000 -d ghcr.io/fangmarks/killswitch
```

### Deno

```sh
git clone https://ghcr.io/fangmarks/killswitch
cd killswitch
deno task start
```

## Routes

All routes accept `GET` (query params) or `POST` (JSON body).

| Route | Aliases | Required params | Optional params |
|---|---|---|---|
| `/e621` | `/e6` | `tags` | `limit`, `page`, `apikey` |
| `/e926` | `/e9` | `tags` | `limit`, `page`, `apikey` |
| `/danbooru` | — | `tags` | `limit`, `apikey` |
| `/gelbooru` | `/gel` | `tags` | `limit`, `api_key`, `user_id` |
| `/yiffrest/:category` | — | — | `amount`, `apikey` |
| `/randomfox` | `/fox` | — | — |

`apikey` / `Authorization` header are forwarded to the upstream API. For e621/e926/danbooru, credentials should be `username:apikey` (Basic auth is handled by the [yiff](https://lio.to/yiff) client). For yiffrest, pass the raw API token.

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `8000` | Port the server listens on |
| `REDIRECT` | GitHub wiki URL | Redirect destination for `GET /` |
| `DISABLE_DEFAULT_TAGS` | unset | Set to any value to disable `order:random`, `-young`, `sort:random` default tags |
