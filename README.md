# Open-Chat by Msgmate.io

Continuation of Open-Chat as an effort to kick-start further open-source development [without any open-source related funding](#about).

Open-Chat will be built openly, while the more advanced bots and model connectors will be developed closed source until mature enough for release.

The plan for [msgmate.io V2 beta](https://beta.msgmate.io) is to host a fully usable version of Open-Chat and provide a wide range of model connectors and bots for experimentation. 

Usage of these features will incur costs, which will be covered by token purchases. Token tracking and usage-related code will also remain closed source, but Open-Chat will always function seamlessly without them.

We are eager to get the infrastructure out there and used. A YouTube introduction series is planned to present the interface and its deployment.

If you have collaboration ideas, want a demo of Msgmate, or seek early user access, please email me at `tim@msgmate.io`.

## beta.msgmate.io launched!

[![Open Chat Beta Launch](https://img.youtube.com/vi/OqT_kIhz8Dc/0.jpg)](https://www.youtube.com/watch?v=OqT_kIhz8Dc)

## Local Usage

You can use open-chat for local LLM completions today by following these steps:

First clone the repository & initalize the submodules ( `hal/msgmate` is not open-source yet but fully optional! )

```bash
git clone https://github.com/msgmate-io/open-chat
git submodule update --init --recursive
```

Setup `.env` with your backends of choice e.g.:

```bash
GROQ_API_KEY="<API key for https://groq.com/>"
DEEPINFRA_API_KEY="<API key for https://deepinfra.com>"
OPENAI_API_KEY="<API key for https://api.openai.com/>"
```

Then build and run all services:

```bash
docker compose -f docker-compose.pro.yaml build
docker compose -f docker-compose.pro.yaml up
```

And you're ready to go at `localhost`.

> Future todos are to:
> - provide pre-build docker images
> - provide pre-build clients
> - provide setup instruction to local bot connectors to e.g.: https://localai.io

## Development

Development generaly hapens with the default compose so just `docker compose up` will do the trick.

```bash
git submodule update --init --recursive
docker compose up --build
```

Services:

- `backend`: Django backend with chat and user management features
- `frontend`: Vike.dev frontend with chat and user management features
- `redis`: Redis for caching and chat
- `ingress`: Nginx ingress for routing, routes all traffic through `localhost:80` in development
- `hal`: Default LLM model completion bot
- `redis-hal`: Redis for caching and chat for the `hal` bot


For clearer seperation or to run the bot somewhere else, 
you migh want to run the bot and chat seperatly:

*Chat Backend & Interface only*

```bash
docker compose up backend frontend redis ingress
```

*Hal Bot only*

```bash
docker compose build hal redis-hal
docker compose up hal redis-hal
```

All services and modules should also work outside of docker,
e.g.: for frontend only developement:

```bash
cd frontend
npm install
npm run build
npm run dev
```

### About

This project is built and maintained by [@tbscode](https://github.com/tbscode) and was initiated to offer a truly decentralized Chat GPT alternative, including user management, deployment, bots, voice chat, and more.

As I work full-time as CTO of the non-profit [Little World](https://home.little-world.com), I will use the limited time I have to extend and manage this project. However, to truly advance this stack to where it needs to be for widespread adoption, it requires many more development hours and must remain open-source and applicable for small businesses or individuals to build and experiment with.

Efforts to secure development funding are ongoing but have so far been unsuccessful. I hope to find and encourage people to help with this project and am willing to invest in its open-source development.