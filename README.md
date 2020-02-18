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
```
* node 
* yarn or npm
```

 
### running
```
* yarn
* yarn start
* yarn test
```

By default the app runs against an in memory sqlite db. It runs on port 3000 and supports 
hot module replacement in dev mode.


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

If you want to spin up a dockerized postgres instance using the above db env vars, you can do
`docker-compose up db` (requires docker, obviously)

You can also change the port the app runs on via .env or env var like so:

```
PORT=3000
```

### roadmap/coming soon:
* ~~support for other db providers~~
* production build support (including docker) 
* socket-based push updates





