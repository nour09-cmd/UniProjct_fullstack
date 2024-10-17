# starting

## `git clone https://github.com/nour022/UniProjct_fullstack.git`

# to start the frond/backend ang monogodb und postgresSQL

## just run `npm start` in UniProjct_fullstack

# if you have olredy monogodb und postgresSQL on docker run und want just run frond/backend "on change or starting a projekt"

## just run `npm run serverdev` in UniProjct_fullstack

### Create the angular client

##### "nicht notwendig !!" `cd  client`

##### "nicht notwendig !!" `docker build -t client .`

##### "nicht notwendig !!" `docker run -d -p 8080:80 client`

###### "nicht notwendig !!" npx @angular/cli@17 new client

---

### Create the nodeJs server

##### "nicht notwendig !!" `cd  server`

##### "nicht notwendig !!" `docker build -t server .`

##### "nicht notwendig !!" `docker run -d -p 4545:4545 server:latest`

##### "nicht notwendig !!" `mkdir server ; cd server`

##### "nicht notwendig !!" `npm init -y`

##### "nicht notwendig !!" `npm install typescript ts-node @types/node @types/express express`

##### "nicht notwendig !!" `npx tsc --init`

### MonogoDB on Docker && DBeaverEE

##### "nicht notwendig !!" `docker run -d -p 27017:27017 --name mongodb -v mongodb_volume:/data/db mongo:latest`

### PostgreSQL on Docker && DBeaverEE

##### "nicht notwendig !!" `docker run -p 5432:5432 -d \ -e POSTGRES_PASSWORD=changeMy \ -e POSTGRES_USER=changeMy \ -e POSTGRES_DB=changeMy \ -v pgdata:/var/lib/postgresql/data \ postgres`

##### "nicht notwendig !!" to login `psql POSTGRES_DB -h localhost -U POSTGRES_USER`

##### "nicht notwendig !!" to login `docker exec -it CONTINERID psql -U POSTGRES_USER POSTGRES_DB`
