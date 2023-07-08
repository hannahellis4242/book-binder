FROM node:current-alpine

WORKDIR /web
COPY package.json .
RUN npm i

COPY tsconfig.json .
COPY public ./public
COPY views ./views
COPY src ./src
RUN npx tsc

CMD node dist/main.js