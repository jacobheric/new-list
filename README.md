A Parcel, Node, Typescript, Apollo/Graphql, React, Styled Components List/Note App
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

### bring up a mongodb, if you don't already have one (requires docker)
* `docker-compose up db`


### running in dev mode
* `yarn` or `npm install`
* `yarn start` or `npm start` 
* `yarn test` or `npm test`


### build and run in production mode
* `yarn build` or `npm build`
* `node dist/index.js`


### optional params
It's possible to a custom mongo port/host/db with the following vars in an .env file or in env vars:

```
MONGO_HOST=127.0.0.1
MONGO_DB=list
MONGO_PORT=23456
```

Leaving these unspecified will result in reasonable defaults: `mongodb://localhost:27017/list` 

### docker (these require docker, obviously)
* `docker-compose up db` will bring up mongo db in a container. 
* `docker-componse up app` will bring the app up in a container.
* `docker-compose up` will bring both the db and the app up in docker.    


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
* ~~socket-based push updates~~
* ~~note search~~
* authentication
* markdown support
* js-free support

### other data stores
* see branch `rdbms` for a rudimentary example of this app using sequelize and postgresql/sqlite





