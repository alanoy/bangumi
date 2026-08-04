

# Lista de Bangumi

![Version](https://img.shields.io/github/package-json/v/alanoy/bangumi?style=flat)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)

[Demo](https://bgm-demo.ideapart.com/)

### Fuentes de datos:

- [bangumi-data](https://github.com/bangumi-data/bangumi-data.git)
- [番组计划](http://bgm.tv/)

### Frameworks:

- [Nuxt3](https://nuxt.com/)
- [Vue3](https://vuejs.org/)
- [daisyUI](https://daisyui.com/)

### Requisitos:

- nodejs v18+

## Configuración

### config.ts:

- `themes`(opcional): temas de daisyui para ColorScheme, el valor predeterminado es `['fantasy', 'light', 'cupcake', 'dark', 'dracula', 'sunset', 'dim']`.

### nuxt.config.ts:

- `appTitle`(opcional): título de la aplicación, el valor predeterminado es `Bangumi`
- `port`(opcional): puerto del servidor de desarrollo, el valor predeterminado es `3000`

### i18n

Soporta `['zh-ch', 'en']`, el valor predeterminado es `'zh-ch'`. Consulta [@nuxtjs/i18n](https://i18n.nuxtjs.org/guide) para más detalles.

## Instalación

Asegúrate de instalar las dependencias:

```bash
# bun
bun install
```

## Servidor de desarrollo

Inicia el servidor de desarrollo en `http://localhost:3000`:

```bash
# bun
bun run dev
```

## Producción

Compila la aplicación para producción:

```bash
# bun
bun run build
```

Vista previa local de la compilación para producción:

```bash
# bun
bun run preview
```

## Despliegue

Consulta la [documentación de despliegue](https://nuxt.com/docs/getting-started/deployment) para más información.

## Uso de la autorización de la aplicación de bgm.tv

1. Establece `BGMTV_AUTHORIZE` en `'true'` en el archivo `.env`, el valor predeterminado es false.
2. Crea una aplicación en [bgm.tv](https://bgm.tv/dev/app/create).
3. Copia `App ID`, `APP Secret`, `回调地址` de tu aplicación recién creada, `回调地址` debe ser `https://${your app baseURL}/auth/callback`
4. Establece el `APP ID` copiado en `BGMTV_APP_ID` en el archivo `.env`.
5. Establece el `APP Secret` copiado en `BGMTV_APP_SECRET` en el archivo `.env`.
6. Establece el `回调地址` copiado en `BGMTV_REDIRECT_URI` en el archivo `.env`.
7. Establece `BGMTV_USERAGENT` en el archivo `.env`, más detalles [aquí](https://github.com/bangumi/api/blob/master/docs-raw/user%20agent.md).
8. Establece un `NUXT_SESSION_SECRET` de 32 bits como secreto de sesión en el archivo `.env`.

Consulta la [documentación](https://github.com/bangumi/api/blob/master/docs-raw/How-to-Auth.md) para más información.

## TODO
