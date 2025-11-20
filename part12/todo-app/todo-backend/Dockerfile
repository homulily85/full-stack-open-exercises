FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm i --omit-dev

USER node

CMD ["npm", "start"]