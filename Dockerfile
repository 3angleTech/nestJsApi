# Use Node 18 LTS as base image.
FROM node:18.13

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Set env variables
ENV NODE_ENV=docker
ENV APP_PORT=3000

# Start the server using the production build
EXPOSE 3000
CMD [ "npm", "run", "run-migrations-and-start" ]
