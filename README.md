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

## TL;DR

```bash
docker compose up --build
```

## Documentation & Preview

- [the documentation](https://tbscode.github.io/django-vike-chat/)

### About

This project is initiated and built by @tbscode, intended to become an open, self-hostable AI chat interface.

The interface will also provide a means to integrate with AI-bots/agents. Services such as [msgmate.io](https://msgmate.io) will provide endpoints for these models and bots, which can then be used through this chat interface.

There is copyrighted static content present in this repo at: `./frontend/assets`. This includes, for example, the msgmate.io logo, other external logos ( `./frontend/assets/_external_logos` ) and other landing page assets ( please replace/delete them incase you inted to publish / fork ).

There is also a fork/port of [shadcn-landing-page](https://github.com/leoMirandaa/shadcn-landing-page/tree/main) included at `./frontend/components/landing_page`.

The rest of the repo is licensed with MIT: [Check LICENSE.md](./LICENSE.md)