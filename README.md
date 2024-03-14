# Django Vike Chat (tims-stack-v4)

by @tbscode
contributors: @JannisToelle ( typescript api generation )

## Components

- `backend`: Django + Rest-Framework + Django-Channels
- `frontend`: Express + Vike
- `proxy`: Nginx

## Development

### TL;DR

Full docker all in one development `backend` + `frontend` + `proxy`

```bash
docker compose up --build
```

Visit `localhost`, live reload & dev mode enabled by default.

## Local

Covenient for live-reload capacitor development.

1. Manually start a proxy:

`docker run -it --rm -d -p 80:80 --name proxy -v ./local.nginx.conf:/etc/nginx/nginx.conf nginx`

2. Start Backend & Redis service `docker compose up backend redis`
3. Start the frontend: `cd ./frontend/ && npm run dev`

(optional) Native development:

4. Prerender frontend `npm run build && node ./preRender.js`
5. Start native apps:

```bash
npx cap sync
npx cap run android -l --external
```

## Deployment Build

```bash
docker compose -f docker-compose.pro.yaml build
docker compose -f docker-compose.pro.yaml up
```

## Frontend

The UI uses React and Vike It has two modes:

- `web`: Runs as Express Server for in browser usage
- `native`: Is fully pre-rendered for native capacitor app

### Web Setup

- SSR all pages
- Subsequent navigation always client side
- Prefetching only on public SSR pages ( only where good SEO is needed )
- Utelize `+guard.js` for authentication guard and redirects
- Clientside fetching for hyperdynamic internal app pages

### Mobile / Capacitor Setup ( `frontend.constants:STATIC_EXPORT === True` )

- Prebuild **all pages** ( maybe exclude some landing / blog pages not required in mobile app )
- No dynamic wild card routes allowed atm! ( [they cannot yet be prerendered](https://github.com/vikejs/vike/issues/1476) )
- Utelize `+onHydrationEnd()` for authentication guard ( toggle with `STATIC_EXPORT` not used in web )

### LICENSE

This is primarily build to become the new chat interface for [`msgmate.io`](https://msgmate.io).
But I intend to develop it openly and make it usable also as a local/self-hostable AI-chat inteface.

Copy Right (c) Tim Schupp, Tim Benjamin Software UG.
Might add a more open license in the future, please open an issue describing your use-case.
