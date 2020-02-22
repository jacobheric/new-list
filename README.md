A Parcel, Node, Typescript, Apollo/Graphql, React, Styled Components, Sequelize List/Note App
-----------

A work in progress note/todo app to explore some 
interesting tech, including:

* [Parcel](https://parceljs.org/)
* [Styled Components](https://styled-components.com/)
* [Apollo Graphql](https://www.apollographql.com/)
* [React Hooks](https://reactjs.org/docs/hooks-reference.html)
* [Typescript](https://www.typescriptlang.org/)


### pre-requisites
* `node` 
* `yarn` or `npm install`


### running in dev mode
* `yarn` or `npm install`
* `yarn start` or `npm start` 
* `yarn test` or `npm test`


By default the app runs against an in memory sqlite db. It runs on port 3000 and supports 
hot module replacement in dev mode. If you want to use PostgreSQL instead, you need to 
supply additional env vars (see below).


### build and run in production mode
* `yarn build` or `npm build`
* `node dist/index.js`


### optional params
It's possible to run against an external postgresql or sqlite db by providing the 
following vars in an .env file or in env vars:

```
DB_NAME=somedbname
DB_USER=somedbuser
DB_PASSWORD=somedbpassword
DB_HOST=localhost
DB_DIALECT=postgres
#
#  defaults to in ':memory:' for sqlite but can be something like:
# 'path/to/database.sqlite'
DB_STORAGE=
```

### docker (these require docker, obviously)
If you want to run against PostgreSQL, there is a dockerized version of it. Make sure you've set 
the DB_* env vars outlined above to postgres value, then:
* `docker-compose up db` will bring up a postgres db in a container. 

To build and bring up just the node app in docker, run:
* `docker-componse up app` will bring the app up in a container.

To bring up both:
* `docker-compose up` will bring the postgres db and the app up in docker.    


### more env vars

You can also change the port and the host the app runs on via .env or env vars. This is 
necessary if you want the client to connect to a non-local server/api.

```
PORT=3000
HOST=0.0.0.0
```

### dark mode!
The app supports an optional dark mode 
via [CSS prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)

### roadmap/coming soon:
* ~~support for other db providers~~
* ~~production build support~~
* ~~run in docker~~ 
* socket-based push updates
* authentication
* note search
* markdown support





