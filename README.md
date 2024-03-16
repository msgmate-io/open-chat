# Open Chat Interface

> also called `tims-stack-v5` :warning: this repo is work in progress!

By [@tbscode](https://github.com/tbscode/)
Contributions are welcome, please open PR's and issue at any time!

Contributors:
- @tbscode
- @JannisToelle

## Services

- `backend`: Django + Rest-Framework + Django-Channels
- `frontend`: Express + Vike
- `proxy`: Nginx

## Development

### Docker

Full docker all in one development `backend` + `frontend` + `proxy`

```bash
docker compose up --build
```

Visit `localhost`, live reload & dev mode enabled by default.

#### Shell in container

1. Shell on container `docker compose exec <service> sh`
2. Do stuff e.g.: *Install Packages* `pip3 install ...` / `npm run dev`

#### Api Client

Generate typed api client outside the container: `cd frontend && npm run generate-api`, consider:

1. updates to the api client should be commited
2. Api is generated based in infered types from `rest_framework` and `drf_spectacular`
3. Use `rest_framework.serializers` ( and `ModelSerializer` ) where possible
4. Use `drf_spectacular.utils.extend_schema` to extend incomplete schemas

View the swagger-ui at `/api/schema/swagger-ui/`

### Local

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

### Deployment Build

```bash
docker compose -f docker-compose.pro.yaml build
docker compose -f docker-compose.pro.yaml up
```

## UI

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

This project is initiated and built by @tbscode, intended to become an open, self-hostable AI chat interface.

The interface will also provide a means to integrate with AI-bots/agents. Services such as [msgmate.io](https://msgmate.io) will provide endpoints for these models and bots, which can then be used through this chat interface.

There is copyrighted static content present in this repo at: `./frontend/assets`. This includes, for example, the msgmate.io logo, other external logos ( `./frontend/assets/_external_logos` ) and other landing page assets ( please replace/delete them incase you inted to publish / fork ).

There is also a fork/port of [shadcn-landing-page](https://github.com/leoMirandaa/shadcn-landing-page/tree/main) included at `./frontend/components/landing_page`.

The rest of the repo is licensed with MIT: [Check LICENSE.md](./LICENSE.md)