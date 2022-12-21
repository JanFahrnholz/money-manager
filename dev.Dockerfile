FROM node:18

WORKDIR /srv/app
COPY src /srv/app

CMD [ "yarn", "dev" ]