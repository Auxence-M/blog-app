## How to run

### Simple way: with docker compose
- Clone the repository :
```
git clone https://github.com/auxence-m/blog-app.git
```

- Navigate to the location of the directory :
```
cd blog-app
```

- Build and run the services **(-d flag allows you to run containers in the background, freeing up your terminal)** :
```
docker compose up --build -d
```

- Access the app through ( http://localhost:5173/)
```
 http://localhost:5173/
```

- To stop services
```
docker compose stop
```

- To stop and remove containers, networks, and volumes.
```
docker compose down
```

### Longer way: without docker compose

If you don't have docker installed on you computer, make sure you have the latest version of [Golang](https://go.dev/doc/install) and [Node.js](https://nodejs.org/en/download) installed on the computer.

- Clone the repository :
```
git clone https://github.com/auxence-m/blog-app.git
```

- Navigate to the location of the directory :
```
cd blog-app
```

- Navigate to blog-app-api directory :
```
cd blog-app-api
```

- Install the go dependencies :
```
go mod tidy
```

- Build the go project :
```
go build
```

- Run the project :
```
go run main.go
```

- **Now open another terminal in the blog-app directory, and navigate to the blog-app-client directory. Don't closer first terminal**:
```
cd blog-app-client
```

- Install the node.js dependencies :
```
npm install
```

- Run the go project :
```
npm run dev
```

- Access the app through ( http://localhost:5173/)
```
 http://localhost:5173/
```