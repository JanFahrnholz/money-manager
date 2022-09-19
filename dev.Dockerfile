FROM node:16

WORKDIR /srv/app
COPY src /srv/app

CMD [ "yarn", "dev" ]