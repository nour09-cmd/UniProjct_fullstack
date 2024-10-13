# starting

## `git clone https://github.com/nour022/UniProjct_fullstack.git`

# Create the angular client

### `docker build -t client .`

### `docker run -d -p 8080:80 client`

#### "nicht notwendig !!" npx @angular/cli@17 new client

---

# Create the nodeJs server

### `docker build -t server .`

### `docker run -d -p 4545:4545 server:latest`

#### "nicht notwendig !!" `mkdir server ; cd server`

#### "nicht notwendig !!" `npm init -y`

#### "nicht notwendig !!" `npm install typescript ts-node @types/node @types/express express`

#### "nicht notwendig !!" `npx tsc --init`
