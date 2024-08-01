FROM node:20

WORKDIR /frontend
RUN chown -R 1000:1000 /frontend

RUN mkdir -p /npm_cache && chown -R 1000:1000 /npm_cache
RUN npm config set cache /npm_cache --global

COPY . .

RUN npm install
RUN npm run build

CMD ["npm", "run", "server:dev"]