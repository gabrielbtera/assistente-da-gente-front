FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build-prod

FROM node:18-alpine
RUN npm install -g @angular/cli
WORKDIR /app
COPY --from=build /app .
RUN ls -al /app
EXPOSE 4200
CMD ["npm", "run", "serve:ssr:websocket-client"]
