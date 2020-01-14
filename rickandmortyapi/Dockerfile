FROM node
WORKDIR /usr/src/node-api
COPY ./package*.json ./
RUN npm install
COPY . .
CMD [ "node", "./server/server.js" ]