# Titan Generator Example Svc Service

## Description

This service use just for testing it will create ping date route which return date.

## Main Maintainer

Vladimir Djukic

## Environment Variables

Before you run server it is importante to set up env variables.

There are 2 files .env and .env-test

.env file is for development and .env-test is for tests.

.env files are not ment for production

## Database

Database name will be generated automaticly it will get same name as service.
To change database name go to src/db/db-name.ts

MONGO_HOST should look like this:

```mongodb://USERNAME:PASSWORD@localhost/DATABASE```

and USERNAME, PASSWORD and DATABASE will be automaticly replaced when server start

## Development

To start service you need to install dependencies and run dev server:

```npm install``` and 
```npm run dev```

## Linting and Compiling

To lint app run:

```npm run lint```

To compile app run:

```npm run build```

## Testing

To test service run:

```npm test```

## Production

For production it is important env variables exists in cluster.

To build and start app run:

```npm start```

## Documentation

To generate documentations run ```npm run doc```

** API Documentation

To add api documentation c/p code bellow and replace github url to the doc/index.html file in your service.

For API documentaion click [HERE](http://htmlpreview.github.io/?https://github.com/vforv/generator-example-sv/blob/master/doc/index.html)

** Code coverage

To add code coverage report c/p code bellow and replace github url to the doc/index.html file in your service.

For code coverage report click [HERE](http://htmlpreview.github.io/?https://github.com/vforv/generator-example-sv/blob/master/coverage/index.html)

## TODO

-- Gen .circleci folder
