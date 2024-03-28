FROM node:20-alpine

WORKDIR /bot
COPY . .

RUN npm install

ENTRYPOINT ["npm", "run", "dev"]