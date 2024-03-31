FROM node:20-alpine

WORKDIR /frontend
COPY ./package.json .
RUN npm install
COPY . .

RUN npm run build

ENTRYPOINT ["npm", "run", "server:prod"]