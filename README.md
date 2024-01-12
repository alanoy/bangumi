# Bangumi List

[![Version](https://badge.fury.io/gh/alanoy%2Fbangumi.svg)](https://badge.fury.io/gh/alanoy%2Fbangumi)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)

### data sources:

- [bangumi-data](https://github.com/bangumi-data/bangumi-data.git)
- [番组计划](http://bangumi.tv/)

### frameworks:

- [Nuxt3](https://nuxt.com/)
- [vue3](https://vuejs.org/)
- [daisyUI](https://daisyui.com/)

### required:

- nodejs 18+

## Configuration

### config.ts:

- `themes`(optional): daisyui themes for ColorScheme, default is `['fantasy', 'light', 'dark']`.

### nuxt.config.ts:

- `appTitle`(optional): App title, default is `Bangumi`
- `socialMediaList`(optional): List of social medias, default is `[]`
- `port`(optional): devServer port, default is `3000`

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

## Deployment

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## TODO

- [ ] Add item page: Explore more information about each individual item.
