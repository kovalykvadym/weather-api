FROM node:24-alpine

WORKDIR /usr/local/app

COPY package.json package-lock.json ./
RUN npm ci

COPY src ./src

RUN ls -la

RUN adduser -D app
USER app

EXPOSE 3000

CMD ["npm", "run", "start"]
