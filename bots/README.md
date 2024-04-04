# Open-Chat Bots

You can use these bots with any server backends - that is compaible with the openai api spec - not only openai!
Just setup `.env` with your values.

### Starting and using bots locally

setup an openai api key or another service in `bots/.env`

```bash
MODEL_API_SERVER=""
MODEL_API_TOKEN=""
SERVER_HOST="host.docker.internal:8000"
```

```bash
docker compose -f docker-compose.yaml up mixtral
```

## Setting up a bot swarm

E.g.: to deploy the indluded bot to any local or remote msgmate server.
You need login credentials to an account that is authorized to create bots ( in development `admin:password` )
This are `BOT_MANAGER_USERNAME` and `BOT_MANAGER_PASSWORD`, the rest of the variables are used to configure a general `mixtral` bot and a `bot-exporer` user account that has access to these bots.

You can configure `MODEL_API_SERVER` and `MODEL_API_TOKEN` to any OpenAI-Api spec compatible backend e.g.: locally hosted lamma models using [`localai.io`](https://localai.io).

e.g.: The following configuration would let you run all the bot locally outside docker using just `npm run dev`:

```bash
BOT_MANAGER_USERNAME="admin"
BOT_MANAGER_PASSWORD="password"
BOT_USERNAME="testBot1"
BOT_PASSWORD="TestBot123!"
BOT_REQUIRES_CONTACT_PASSWORD="false"
BOT_CONTACT_PASSWORD=""
BOT_DESCRIPTION_TITLE="Daily Task Bot"
BOT_DESCRIPTION="A bot that can help you with your daily tasks."
SERVER_HOST="localhost"
SERVER_WS_PROTOCOL="ws://"
SERVER_HTTP_PROTOCOL="http://"
MODEL_API_SERVER=""
MODEL_API_TOKEN="sk-YourOpenAIApiKey"
BOT_REVEAL_SECRET="password"
BOT_IS_PUBLIC="true"
BOT_EXPLORER_USERNAME="bot-explorer"
BOT_EXPLORER_PASSWORD="BotExplore123!"
BOT_EXPLORER_FIRST_NAME="Bot"
BOT_EXPLORER_SECOND_NAME="Explorer"
BOT_USERNAMES="['testBot1']"
BOT_REVEAL_SECRETS="['viewTestBot1']"
BOT_CONTACT_SECRETS="['ActivateTestbot']"
```

