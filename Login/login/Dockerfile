# Use The node:10 container image
FROM node:10

RUN apt-get update 
# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY package*.json ./

# Install the dependencies
RUN npm install

COPY . .

EXPOSE 3000

# run the command to start nodejs
CMD ["node","server.js"]