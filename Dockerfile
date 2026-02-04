# Use Node 24 LTS as base image for the build stage.
FROM node:24-alpine AS build

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

# ---

# Stage 2: Production runtime
FROM node:24-alpine

WORKDIR /usr/src/app

# Copy needed files
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules

COPY --from=build /usr/src/app/typeormconfig.ts ./
COPY --from=build /usr/src/app/tsconfig.json ./
COPY --from=build /usr/src/app/src ./src
COPY --from=build /usr/src/app/db ./db

# Set env variables
ENV NODE_ENV=docker
ENV APP_PORT=3000

EXPOSE 3000
CMD [ "npm", "run", "run-migrations-and-start" ]