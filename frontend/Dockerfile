FROM node:20-alpine

WORKDIR /frontend
COPY . .

RUN npm install
RUN npm run build

ENTRYPOINT ["npm", "run", "dev"]
