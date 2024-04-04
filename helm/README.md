# Open Chat Helm Charts

Install and deploy open chat anywhere any time on kubernetes.

## Using the postgresql dependancy

```yaml
namespace: "default"
backend:
  env:
    DB_ENGINE: "postgresql_psycopg2"
    DB_NAME: "openchat"
    DB_USERNAME: "admin"
    DB_PASSWORD: "password"
    DB_HOST: "http://primary.default.svc.cluster.local:3000"
    DB_PORT: "5432"
    DB_NO_SSL: "true"
postgres:
  use: true
  auth:
    username: "admin"
    password: "password"
    database: "openchat"
```

### All-In-One Local example

setup local `.env`

```bash
IMAGE_PREFIX="localhost:32000/open-chat-"
IMAGE_TAG="latest"
```

setup `bots/.env`

```bash
IMAGE_PREFIX="localhost:32000/open-chat-"
IMAGE_TAG="latest"
```

```bash
docker compose -f docker-compose.pro.yaml build
docker compose -f docker-compose.pro.yaml push

cd bots
docker compose -f docker-compose.yaml build mixtral
docker compose -f docker-compose.yaml push mixtral
```

```yaml
namespace: default
registry:
  use: false
  host: "ghcr.io"
  authToken: "token"
certmanager:
  use: false
  name: letsencrypt-prod
redis:
  use: true
  port: 6379
  serviceName: redis-db-svc
ingress:
  use: true
  host: localhost
backend:
  replicas: 1
  imageURL: localhost:32000/open-chat-backend:latest
  registry:
    authRequired: false
    secretName: dockerconfigjson-github-com
  env:
    DJANGO_DEBUG: "true"
    PRODUCTION: "true"
    ROOT_URL: "http://localhost"
    ROOT_HOST: "localhost"
    EXTRA_TRUSTED_ORIGINS: ""
    DJANGO_SECRET_KEY: "SomeSecret"
    DJANGO_ALLOWED_HOSTS: "*"
    REDIS_URL: "redis://redis-service.default.svc.cluster.local:6379"
    USE_NEXTJS_PROXY_ROUTES: "true"
    NEXTJS_HOST_URL: "http://frontend-service.default.svc.cluster.local:3000"
    BASE_ADMIN_USERNAME: "admin"
    BASE_ADMIN_USER_PASSWORD: "password"
frontend:
  replicas: 1
  imageURL: localhost:32000/open-chat-frontend:latest
  registry:
    authRequired: false
    secretName: dockerconfigjson-github-com
  env:
    INTERNAL_BACKEND_ROUTE: "http://backend-service.default.svc.cluster.local:8000"
    PUBLIC_ENV__GUEST_LOGIN_ALLOWED: "true"
    PUBLIC_ENV__GUEST_USERNAME: "testUser1"
    PUBLIC_ENV__GUEST_PASSWORD: "Test123!"
    PUBLIC_ENV__FRONTNED_BACKEND_ROUTE: "http://localhost"
    PUBLIC_ENV__WEBSOCKET_PROTOCOLL: "ws://"
    PUBLIC_ENV__WEBSOCKET_HOST: "localhost"
    PUBLIC_ENV__WEBSOCKET_PATH: "/api/core/ws"
    PUBLIC_ENV__STATIC_EXPORT: "false"
    PUBLIC_ENV__ROUTE_PREFIX: ""
    DB_ENGINE: "postgresql_psycopg2"
    DB_NAME: "openchat"
    DB_USERNAME: "admin"
    DB_PASSWORD: "password"
    DB_HOST: "http://primary.default.svc.cluster.local:3000"
    DB_PORT: "5432"
    DB_NO_SSL: "true"
postgresql:
  use: true
  auth:
    username: "admin"
    password: "password"
    database: "openchat"
mixtral:
  use: true
  imageURL: localhost:32000/open-chat-bot-mixtral:latest
  registry:
    authRequired: false
  env:
    BOT_MANAGER_USERNAME: "admin"
    BOT_MANAGER_PASSWORD: "password"
    BOT_USERNAME: "testbot"
    BOT_PASSWORD: "password"
    BOT_FIRST_NAME: "Test"
    BOT_SECOND_NAME: "Bot"
    BOT_CONTACT_PASSWORD: "password"
    SERVER_HOST: "backend-service.default.svc.cluster.local:8000"
    SERVER_WS_PROTOCOL: "ws://"
    SERVER_HTTP_PROTOCOL: "http://"
    MODEL_API_SERVER: ""
    MODEL_API_TOKEN: ""
    BOT_DESCRIPTION: "Hello"
    BOT_DESCRIPTION_TITLE: "Test"
    BOT_IS_PUBLIC: "true"
    BOT_REVEAL_SECRET: "show"
    BOT_REQUIRES_CONTACT_PASSWORD: "false"
```