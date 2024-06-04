FROM node:20-alpine

WORKDIR /frontend
COPY ./package.json .
RUN npm install
COPY . .
ENV NODE_ENV=production
RUN rm -rf android ios
# first build is just to make sure it works ( a second build is run before startup as only then the ENV is available )
RUN npm run build:prod

ENTRYPOINT ["npm", "run", "server:prod"]