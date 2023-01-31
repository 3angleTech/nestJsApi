# NestJS web API

Web API stub project written in Node.js using [Nest](https://github.com/nestjs/nest) framework on top of TypeScript.


## Prerequisites

### Node.js
- Version v18.13.x
- The recommended way to install Node.js is [NVM](https://github.com/nvm-sh/nvm)

### NestJS cli
```bash
npm i -g @nestjs/cli
```
See [NestJS docs](*https://docs.nestjs.com/#installation) for more information.


## Installation

```bash
npm install
```

### Environment Variables

The environment variables are pulled from the `.env` file located in the root of the project.

## Running the app

### In development mode
```bash
npm run start
```

### In development mode w/ file reload
```bash
npm run start:dev
```

### In development mode w/ file reload & debug
Node debugger should be attached to port 9229
```bash
npm run start:debug
```

### Running the application via Docker

Run in the terminal the following commands:

``` bash
docker-compose build
docker-compose up -d
```

## Testing

```
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## CRUD generator
To create a new resource, simply run the following command in the root directory of the project:
```bash
nest g resource
``` 

The command not only generates all the NestJS building blocks (module, service, controller classes) but also an entity class, DTO classes as well as the testing (.spec) files.

```
nest g resource <entity-name>
nest g resource <entity-name> --no-spec
```

## Database management

The application uses the [TypeORM](https://typeorm.io/migrations) for managing migration scripts, database models, seed scripts and query language.

### Generate a migration & seeds
```
npm run migration:create ./db/migrations/{migration-name}
```
See [migration API](https://typeorm.io/migrations#using-migration-api-to-write-migrations)

See [1674332822094-CreateUserTable.ts](/db/migrations/1674332822094-CreateUserTable.ts) as database models example

See [1674389844466-SeedDefaultUser.ts](/db/migrations/1674389844466-SeedDefaultUser.ts) as seed example 

### Run new migrations 
```bash
npm run migration:run
```

### Revert last migration
```bash
npm run migration:revert
```

## Code quality
To ensure the code quality, run before each commit:
```
# check linting
npm run lint

# run tests
npm run test
npm run test:e2e

# check for vulnerabilities
npm audit
```
