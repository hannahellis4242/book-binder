FROM node:current-alpine as client
WORKDIR /client
COPY client/package.json .
RUN npm i
COPY client/tsconfig.json .
COPY client/webpack.config.js .
COPY client/src ./src
RUN npm run build
RUN mv scripts /
WORKDIR /
RUN rm -r client

FROM client as server
WORKDIR /web
COPY package.json .
RUN npm i

COPY tsconfig.json .
COPY public ./public
RUN mv /scripts ./public
COPY views ./views
COPY src ./src
RUN npx tsc

CMD node dist/main.js