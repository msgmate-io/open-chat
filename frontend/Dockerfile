FROM node:20-alpine

WORKDIR /frontend
COPY . .

RUN npm i

ENTRYPOINT ["node", "./server"]
