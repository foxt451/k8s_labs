FROM node:18.8.0-alpine as build
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm i
COPY ./tsconfig.json .
COPY ./src ./src
RUN npx tsc

FROM node:18.8.0-alpine
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm i --production 
COPY --from=build /app/build ./build
CMD [ "node", "./build/index.js" ]
