# Learn JavaScript: Full-Stack from Scratch (Udemy course)

## Course details

- Course link: <https://www.udemy.com/course/learn-javascript-full-stack-from-scratch/>

### Scope

- Node.js
  - Basic server with routes
  - Express.js

## Project details

- Node.js version: 14

## Configuration

### Database - Run MongoDB

```sh
docker container run --rm --name fullstack-mongodb --network server-network -p 27017:27017 -v $(pwd)/db:/data/db -d mongo
```

Use MongoDB Compass (GUI) to manage database.

```sh
mongodb://localhost:27017
```

### Issues

### Nodejs cannot import ES modules without file extension

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/app/route' imported from /app/index.js
Did you mean to import /route.js?
```

Related to:
- <https://nodejs.org/dist/latest-v14.x/docs/api/esm.html#esm_mandatory_file_extensions>
- <https://stackoverflow.com/questions/64242186/node-cant-find-modules-without-js-extension>
- <https://nodejs.org/dist/latest-v14.x/docs/api/esm.html#esm_resolution_algorithm>

### Enable ES modules in node

Add ``type`: 'module`` in `package.json`.

Related to:
- <https://nodejs.org/dist/latest-v14.x/docs/api/esm.html#esm_enabling>
