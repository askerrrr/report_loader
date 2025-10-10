FROM node:20.19.3-alpine3.21
WORKDIR /report_loader
COPY package*.json  /report_loader/
RUN npm ci \
    && apk update \
    && apk add vim
COPY . .
EXPOSE 8000
CMD npm start
