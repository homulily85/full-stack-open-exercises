FROM node:20 AS test-and-build-stage

WORKDIR /usr/src/app

COPY --chown=node:node . .

ARG VITE_BACKEND_URL

ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

RUN npm i

RUN npm run test

RUN npm run build

FROM nginx:trixie-perl

COPY --from=test-and-build-stage /usr/src/app/dist /usr/share/nginx/html