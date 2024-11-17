FROM node:20 as build

WORKDIR /app
COPY package*.json ./

RUN npm install -g @angular/cli@17.3.2
RUN npm ci
COPY . .

RUN ng build

FROM nginx:latest

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/client/browser /usr/share/nginx/html

EXPOSE 80
