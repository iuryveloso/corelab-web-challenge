FROM node:22.17.0 

WORKDIR /web
ADD . .
RUN npm ci
RUN npm run build
EXPOSE $PORT
