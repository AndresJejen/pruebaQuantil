FROM node:10

WORKDIR /usr/src/docker-react-view

COPY package*.json ./

RUN npm install

RUN npm audit fix

COPY . .

EXPOSE 3000

CMD ["npm","start"]
