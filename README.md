# Create the angular client

### npx @angular/cli@17 new client

### docker build -t client .

### docker run -d -p 8080:80 client

---

# Create the nodeJs server

### mkdir server ; cd server

### npm init -y

### npm install typescript ts-node @types/node @types/express express

### npx tsc --init

### docker build -t server .

### docker run -d -p 4545:4545 server:latest
