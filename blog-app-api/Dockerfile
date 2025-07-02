# Use the latest LTS version of Node.js
FROM golang:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the go.mod and go.sum files to the /app directory
COPY go.mod go.sum ./

# Install dependencies
RUN go mod download

# Copy the rest of the application files
COPY . .

# Build the application
RUN go build -o blog-app-api

# Expose the app port
EXPOSE 8080

# Start the application
CMD ["./blog-app-api"]