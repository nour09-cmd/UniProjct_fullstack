FROM node:lts-slim
WORKDIR /app
COPY . ./
RUN npm install
EXPOSE 4545
CMD [ "npm", "start" ]