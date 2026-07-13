# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

**Bangumi List** — a Nuxt 4 (Vue 3, TypeScript) SSR app that shows a seasonal anime calendar, rankings, archives, search, and user collections. It merges two data sources:

- **`bangumi-data`** (npm) — 5.6 MB of static metadata: broadcast sites, title translations, site meta. Loaded only on the server; must **never** enter the client bundle.
- **bgm.tv API** (`api.bgm.tv`) — live ratings, images, user auth, collections.

`mergeBgmItems()` (`utils/index.ts`) joins them by each item's `bangumi` site id.

> README still says "Nuxt3"; `package.json` is actually on Nuxt 4. Trust the code.

## Commands

Package manager is **bun** (see `bun.lock`, `.npmrc` with `shamefully-hoist=true`).

```bash
bun install          # postinstall runs `nuxt prepare` (regenerates .nuxt/)
bun run dev          # dev server on :3000
bun run build        # nuxt build
bun run generate     # nuxt generate (static)
bun run preview      # preview production build
bun run lint         # eslint + prettier --check
bun run lintfix      # prettier --write + eslint --fix
```

No test framework is configured.

### Typechecking

There is no `typecheck` script. Nuxt 4 splits the generated tsconfig by context, so a single `tsc -p tsconfig.json` is **not** authoritative — the flattened root config misses some module augmentations (see `shared/modules.d.ts` note). Check each context:

```bash
bunx tsc --noEmit -p .nuxt/tsconfig.app.json      # app: pages/, components/, composables/
bunx tsc --noEmit -p .nuxt/tsconfig.server.json   # server/**
bunx tsc --noEmit -p .nuxt/tsconfig.node.json     # nuxt.config.ts, modules/
```

For `.vue` files (not parsed by plain `tsc`), use `bunx nuxt typecheck` (installs `vue-tsc` on first run). After upgrading Nuxt/modules, regenerate with `bunx nuxt prepare` before typechecking.

## Vercel serverless constraint — the core architectural decision

bgm.tv's `/calendar` endpoint takes 15 s+, which blows Vercel's 10 s serverless limit. The homepage (`pages/index.vue`) therefore **fetches `https://api.bgm.tv/calendar` directly from the browser** (CORS is open; `retry: 2`, 30 s timeout), then POSTs those items to `/api/calendar/merge`, which merges them with the local 5.6 MB `bangumi-data` **without calling bgm.tv** — pure in-memory, sub-second, no timeout.

Do not naively "refactor" this back into a single server-side `/api/calendar` call; the server-side `/api/calendar.get.ts` exists but is the slow path. The split (browser → bgm.tv, then client → `/api/calendar/merge` for the heavy merge) is intentional. `/api/calendar` and `/api/archive/**` are SWR-cached 1 day via `routeRules`; session-scoped and POST routes are intentionally **not** cached.

## runtimeConfig security

`runtimeConfig.app` is a **reserved Nuxt namespace auto-exposed to the client**. Secrets live at root level / under `runtimeConfig.bgmtv` (secret, userAgent, sessionSecret); only public OAuth params (`appId`, `redirectURI`) and `isBgmtvAuthorize` go under `runtimeConfig.public`. Putting secrets under `app` previously leaked them into the client bundle — keep it that way.

## Auth flow (bgm.tv OAuth2, gated by `BGMTV_AUTHORIZE=true`)

```
/auth/bgmtv  →  authorize middleware  →  redirect to bgm.tv OAuth
                                          ↓
/auth/callback  →  authorize-callback middleware  →  POST /api/authorize (exchanges code)
                                          ↓
                          h3 encrypted-cookie session (password = NUXT_SESSION_SECRET)
```

- `middleware/setup.global.ts` (global): on SSR reads the session, sets `isLogin`, and lazily fetches `/v0/me` user data into the session if missing.
- `middleware/isExpired.ts` (used by `item/[id]` + `collections` pages): refreshes the token via `refresh_token`; on "token has expired" it clears the session and redirects to `/auth/bgmtv`.
- `useBgmtvFetch()` attaches the `Authorization` header **only when an h3 `event` is passed** (i.e. server-side). Endpoints that need auth forward `event`; pure-data endpoints don't.

Middleware file names map to page `definePageMeta({ middleware: [...] })` kebab-cased: `authorize`, `authorize-callback`, `is-expired`. Only `setup.global.ts` is global.

## Client vs server data fetching

Several pages fetch **client-only** (`useFetch(..., { server: false })` or guarded by `process.client`): `index` (calendar), `item/[id]`, `collections`, `archive/[date]`. This is deliberate — these are session/personal or timeout-prone. Heavier `bangumi-data` work and all bgm.tv calls that need the User-Agent / auth header happen in `server/api/**` and are proxied via `$fetch('/api/...')`.

## Auto-imports & naming (don't add manual imports for these)

- **Composables** (`composables/`) and **utils** (`utils/index.ts`) are auto-imported — `useBgmtv`, `useBgmtvFetch`, `useSession`/`useH3Session`, `useCollections`, `useToast`, `useMetas`, `getBgmId`, `mergeBgmItems`, `getLocalObject`/`setLocalObject`, etc.
- **Components** are namespaced by directory path: `components/bgm/List.vue` → `<BgmList>`, `components/layout/Header.vue` → `<LayoutHeader>`, `components/subject/Cover.vue` → `<SubjectCover>`.
- The `@` alias resolves to the project root (see `nuxt.config.ts` `alias` + `tsconfig.json`).

## Ambient types — and the Nuxt 4 tsconfig split

**Global ambient types live in `shared/types.d.ts`** (interfaces with no `import`/`export` → true globals): `BgmItem`, `BgmtvItem`, `BgmMeta`/`BgmMetaItem`, `BgmRating`, `BgmImages`, `BgmCollection`, `BgmSite`, `IError`, `ToastItem`, `NavbarMenu`, `ArchiveItem`. `BgmtvCollection` is defined as both a global (aggregate counts) and an exported interface in `types/bgmtv.d.ts` — the exported one wins where imported.

`types/bgmtv.d.ts` is a **module** (has `export`), consumed via explicit `import type { … } from '@/types/bgmtv'`; the `@/*` alias resolves in all contexts so it stays in `types/`.

`shared/modules.d.ts` augments `@nuxt/schema`'s `NuxtConfig` with the `colorMode` key. `@nuxtjs/color-mode` v4 (unlike i18n) ships no hand-written `declare module '@nuxt/schema'`; it relies on the generated `.nuxt/types/modules.d.ts`, which only the **node** context references. The flattened root tsconfig can't see it → `defineNuxtConfig({ colorMode })` would TS2353. This project-level augmentation closes that gap (type matches the generated `false | Partial<ModuleOptions>`).

**Why ambient globals must live in `shared/` (not `types/`):** Nuxt 4 split the generated tsconfig by context (`.nuxt/tsconfig.app.json`, `tsconfig.server.json`, …). The **server** config has a narrow `include` (`server/**`, `shared/**/*.d.ts`, Nitro internals) that does **not** cover `../types/**`. The editor routes `server/**` files to that config, so ambient types in `types/` go out of scope → "Cannot find name 'BgmItem'". `shared/**/*.d.ts` is the one glob included in _every_ context, so shared ambient types belong there. The root `tsconfig.json` (`include: ["**/*"]`) masks this, which is why `build`/`nuxt typecheck` pass but the editor still shows errors. (`typeRoots: ["./types"]` in the root tsconfig is a no-op — it never loaded loose `.d.ts`; safe to ignore.)

## Domain specifics worth knowing

- **Collection types**: 1=想看/Wish, 2=看过/Watched, 3=在看/Watching, 4=搁置/Stalled, 5=抛弃/Abandoned (`useCollections.getType`/`getTypeText`, `i18n.config.ts`). When logged out, collections are stored locally in `localStorage` (`collections` key); when logged in, they sync to bgm.tv.
- **Quarters**: `getQuarter(month)` maps months → `[1,4,7,10]` (Jan–Mar=1, Apr–Jun=4, …). Used by archives and archive-by-date.
- **Ranking**: top 500 anime (`type: 2`, `rank 1..500`), paged via `offset`/`limit` POST body.
- **Lang filter**: `lang === 'zh-Hans'` items are filtered **out** of archives/favorites (Chinese-origin entries excluded).

## Mocking bgm.tv in dev

`VITE_MOCK_BASEURL` + `mock.json` (mockoon-style, port 3900) let `useBgmtvFetch.getUrl()` hit a local mock instead of `api.bgm.tv`. Mocking applies unless an endpoint passes `{ isMock: false }` (subject/collection/ranking/archive-detail do).

## Styling

TailwindCSS 4 via `@tailwindcss/vite`; daisyUI 5 loaded as a `@plugin` in `app.css`. Themes are defined in `config.ts` (light + dark split) and surfaced through `app.config.ts` + `@nuxtjs/color-mode` (`classSuffix: ''`, `dataValue: 'theme'`, default `fantasy`).

## Lint rules that matter

Single quotes enforced (error), no semicolons, `max-len` 100 warn (ignores strings/templates/regex/urls), `no-console`/`no-debugger` warn, `@typescript-eslint/no-explicit-any` warn, `vue/multi-word-component-names` off, `vue/require-default-prop` off.
