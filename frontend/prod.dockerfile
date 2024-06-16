FROM node:20-alpine AS build-stage

WORKDIR /frontend
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ENV PUBLIC_ENV__DEBUG=false

RUN rm -rf android ios

RUN npm run build
RUN node buildServer.js

FROM node:20-alpine AS production-stage

WORKDIR /frontend

COPY --from=build-stage /frontend/dist ./dist
COPY --from=build-stage /frontend/server-entry.cjs ./server-entry.cjs

ENV NODE_ENV=production
ENV PUBLIC_ENV__DEBUG=false

ENTRYPOINT ["node", "./server-entry.cjs"]