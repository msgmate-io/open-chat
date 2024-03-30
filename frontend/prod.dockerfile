FROM node:20-alpine AS build

WORKDIR /frontend
COPY [^node_modules]* .
RUN npm install
RUN npm run build
ENV NODE_ENV=production

CMD ["node", "./server"]