FROM node:carbon

WORKDIR /usr/src/docker-react-view

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]
