FROM node:22-alpine3.19  

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

COPY . .

RUN npm install

RUN npm prisma:generate


CMD npm start