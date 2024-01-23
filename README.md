# Bangumi List

[![Version](https://badge.fury.io/gh/alanoy%2Fbangumi.svg)](https://badge.fury.io/gh/alanoy%2Fbangumi)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)

[Demo](https://bgm-demo.ideapart.com/)

### data sources:

- [bangumi-data](https://github.com/bangumi-data/bangumi-data.git)
- [番组计划](http://bangumi.tv/)

### frameworks:

- [Nuxt3](https://nuxt.com/)
- [Vue3](https://vuejs.org/)
- [daisyUI](https://daisyui.com/)

### required:

- nodejs v18+

## Configuration

### config.ts:

- `themes`(optional): daisyui themes for ColorScheme, default is `['fantasy', 'light', 'dark']`.

### nuxt.config.ts:

- `appTitle`(optional): App title, default is `Bangumi`
- `port`(optional): devServer port, default is `3000`

### i18n

Support `['zh-ch', 'en']`, defaults to `'zh-ch'`. Check out [@nuxtjs/i18n](https://i18n.nuxtjs.org/guide) for more details.

## Setup

Make sure to install the dependencies:

```bash
# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# bun
bun run dev
```

## Production

Build the application for production:

```bash
# bun
bun run build
```

Locally preview production build:

```bash
# bun
bun run preview
```

## Deployment

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Use bgm.tv app Authorization

1. Set `BGMTV_AUTHORIZE` to `'true'` in `.env` file, default is false.
2. Create an app on [bgm.tv](https://bgm.tv/dev/app/create).
3. Copy `App ID`, `APP Secret`, `回调地址` from your newly created application，`回调地址` should be `https://${your app baseURL}/auth/callback`
4. Set copied `APP ID` to `BGMTV_APP_ID` in `.env` file.
5. Set copied `APP Secret` to `BGMTV_APP_SECRET` in `.env` file.
6. Set copied `回调地址` to `BGMTV_REDIRECT_URI` in `.env` file.
7. Set `BGMTV_USERAGENT` in `.env` file, more details [here](https://github.com/bangumi/api/blob/master/docs-raw/user%20agent.md).
8. Set a 32-bit `NUXT_SESSION_SECRET` for session secret in `.env` file.

checkout the [documentation](https://github.com/bangumi/api/blob/master/docs-raw/How-to-Auth.md) for more information.

## TODO
