# Msgmate-io Open Chat Fork / Stack

This just maintains the seperate frontend pages for msgmate.io.
All chat related features are a 1:1 for of the open chat repo and will allways be maintained and updated there.
So the same MIT license applies to this repo as well.

Only difference is that the `frontend/pages` are maintained in a private sub-repo.

## TL;DR ( all in one development )

Submodules:

- `./frontend/pages` is a private repo with the frontend pages for msgmate.io
- `./frontend/components` the opensource components [open-chat-ui](https://github.com/msgmate-io/open-chat-ui)

```bash
git submodule update --init --recursive
docker compose up --build
```
> changes in subrepos muste be pushed to their respective repos and then the updated submodule hash must be commited to this repo.

Services:

- `backend`: Django backend with chat and user management features
- `frontend`: Vike.dev frontend with chat and user management features
- `redis`: Redis for caching and chat
- `ingress`: Nginx ingress for routing, routes all traffice trough `localhost:80` in development

### Frontend only development ( no backend required pages will work )

```bash
cd frontend
npm install
npm run build
npm run dev
```

## Documentation & Preview

> You can log in with `test+msgmate2@msgmate.io` any number between 1-20, and the password `Test123!`.
> Log in with two users and send some messages! The staging server is reset on every package update...

- [The staging chat server](https://staging-open-chat.msgmate.io/)
- [The documentation](https://staging-open-chat.msgmate.io/docs)
- [The API](https://staging-open-chat.msgmate.io/api/schema/redoc/)

### About

This project was initiated and built by @tbscode, with the intention of becoming an open, self-hostable AI chat interface. It offers several Django packages that can be integrated into a Django app for chat and user management features.

The app and interface will also provide a way to integrate with AI-bots/agents or other applications. You will be able to either run the Chat locally and [run the included bots](todo) with some API keys, or you can self-host models with them using means like [`localai.io`](https://localai.io) and connect them using Bots or Agents. Alternatively, you can enter AI-Chat service API keys to your bots or use the bots and interfaces of services such as [`msgmate.io`](https://msgmate.io).

There is copyrighted static content present in this repo at: `./frontend/assets`. This includes, for example, the msgmate.io logo, other external logos ( `./frontend/assets/_external_logos` ) and other landing page assets (please replace/delete them if you intend to publish/fork).

There is also a fork/port of [shadcn-landing-page](https://github.com/leoMirandaa/shadcn-landing-page/tree/main) included at `./frontend/components/landing_page`.

The rest of the repo is licensed under MIT: [Check LICENSE.md](./LICENSE.md)