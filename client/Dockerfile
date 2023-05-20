FROM node:alpine

WORKDIR /src

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 3000

CMD npm run dev