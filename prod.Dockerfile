FROM node:16

WORKDIR /srv/app
COPY src /srv/app
RUN yarn

RUN yarn build

CMD [ "yarn", "start" ]