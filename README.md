# Django Vike Chat (tims-stack-v4)

by @tbscode
contributors: @JannisToelle ( typescript api generation )

## TL;DR

```bash
docker compose up --build
```

Visit `localhost`, live reload & dev mode enabled by default.

## Build

```
docker compose -f docker-compose.pro.yaml build
docker compose -f docker-compose.pro.yaml up
```

### Features

This is a hyper-simplified overview of the repos feature / progress.

- [x] user management and authorization
- [x] live frontend updated via websocket callbacks
- [x] chats & messages db model
- [x] CRUD operations for chat & message model
- [x] SSR then -> SPA render stategy for maximum speed
- [x] redux integrated & offline view mode possible
- [ ] build android & ios app using capacitor
- [ ] complete websocket integrations:
  - [ ] partial message streaming (AI prompts)
  - [ ] online indicator
  - [ ] typing indicator
  - [ ] message read callback
- [ ] interactive dynamic chat interface using tailwind & daisyui
  - [x] Chat List View
  - [x] Login Page
  - [x] Message List View
  - [ ] Profile Settings View
- [ ] Deployment & CI
  - [x] Helm Chart for k8s deployment
  - [ ] Github Actions Build & Tests
  - [ ] Github Actions Deployment Workflow & Empherial Envs
  
### How we use vike.dev

Web Setup:
- SSR all pages
- Subsequent navigation always client side
- Prefetching only on public SSR pages ( only where good SEO is needed )
- Utelize `+guard.js` for authentication guard and redirects
- Clientside fetching for hyperdynamic internal app pages

Mobile / Capacitor Setup ( `frontend.constants:STATIC_EXPORT === True` )
- Prebuild **all pages** ( maybe exclude some landing / blog pages not required in mobile app )
- No dynamic wild card routes allowed atm! ( [they cannot yet be prerendered](https://github.com/vikejs/vike/issues/1476) )
- Utelize `+onHydrationEnd()` for authentication guard ( toggle with `STATIC_EXPORT` not used in web )

### LICENSE

This is primarily build to become the new chat interface for [`msgmate.io`](https://msgmate.io).
But I intend to develop it openly and make it usable also as a local/self-hostable AI-chat inteface.

Copy Right (c) Tim Schupp, Tim Benjamin Software UG.
Might add a more open license in the future, please open an issue describing your use-case.
