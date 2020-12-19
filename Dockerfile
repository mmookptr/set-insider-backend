    FROM node:alpine

    WORKDIR /usr/set-insider-backend

    COPY package.json .

    RUN npm install
    RUN npm install -g typescript

    COPY . .

    RUN tsc

    CMD ["node", "./dist/index.js"]