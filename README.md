# Open Chat

>  aka `tims-stack-v5` :warning: This repo is a work in progress!

Initiated by [@tbscode](https://github.com/tbscode/)
Contributions are welcome, please open PR's and issue at any time!

Contributors:
- @tbscode
- @JannisToelle
- @fruecker89

## TL;DR

```bash
docker compose up --build
```

## Documentation & Preview

> You can log in with `test+msgmate2@msgmate.io` any number between 1-20, and the password `Test123!`.
> Log in with two users and send some messages! The staging server is reset on every package update...

- [the staging chat server](https://staging-open-chat.msgmate.io/)
- [the documentation](https://staging-open-chat.msgmate.io/docs)
- [the api](https://staging-open-chat.msgmate.io/api/schema/redoc/)

### About

This project was initiated and built by @tbscode, with the intention of becoming an open, self-hostable AI chat interface. It offers several Django packages that can be integrated into a Django app for chat and user management features.

The interface will also provide a way to integrate with AI-bots/agents. Services such as [msgmate.io](https://msgmate.io) will provide endpoints for these models and bots, which can then be used through this chat interface.

There is copyrighted static content present in this repo at: `./frontend/assets`. This includes, for example, the msgmate.io logo, other external logos ( `./frontend/assets/_external_logos` ) and other landing page assets (please replace/delete them in case you intend to publish/fork).

There is also a fork/port of [shadcn-landing-page](https://github.com/leoMirandaa/shadcn-landing-page/tree/main) included at `./frontend/components/landing_page`.

The rest of the repo is licensed with MIT: [Check LICENSE.md](./LICENSE.md)