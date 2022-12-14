FROM node:18.8.0-alpine as build
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm i
COPY ./tsconfig.json ./tsconfig.build.json ./
COPY ./src ./src
RUN npm run build

FROM node:18.8.0-alpine
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm i --production
COPY --from=build /app/dist ./dist
CMD [ "npm", "run", "start:prod" ]
