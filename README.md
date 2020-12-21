# Smart-Calendar-backend

[![Build Status](https://travis-ci.org/Clumsyndicate/Smart-Calendar-backend.svg?branch=main)](https://travis-ci.org/Clumsyndicate/Smart-Calendar-backend)

This is the backend for Smart Calendar Project. 
Johnson Zhou (owner of this repo) is primarily responsible for the backend of this CS 97 project. 

[Link to frontend](https://github.com/Clumsyndicate/Smart-Calendar-Frontend)

FYI: The full git verison control history of the frontend can be viewed in the submodule. Frontend README is [here](frontend/README.md)

The project website is deployed [here](http://149.28.86.112:9000/)

The tar release is [here](https://github.com/Clumsyndicate/Smart-Calendar-backend/releases/tag/v1.0)

To fully test the functionality of the backend, you will need access to our mysql database, whose credentials are stored in `secrets.js`. Please reach out to us if you need this secrets file.

## Useful commands

- Clone this repo along with frontend submodule.

```bash
git clone --recurse-submodule https://github.com/Clumsyndicate/Smart-Calendar-backend.git
```

- Rebase the submodule tracked to the newest version (required before commit)

```bash
git submodule update --remote --rebase
```

- Deployment

Make sure you have node.js and npm installed.

```bash
cd Smart-Calendar-backend/
./build.sh  # Installs necessary packages and build frontend files
```

npm packages required will be installed and the React frontend will be built.

Before running the node.js program, it is required to create a `secrets.js` file under `backend/`, which is used to store mysql secrets and webtoken generation key.
Here is an example `secrets.js` file

```js
module.exports = {
    host: "IPADDRESS",
    user: 'MYSQLUSERNAME',
    password: 'MYSQLPASSWORD',
    database: 'DBNAME',
    insecureAuth : true,
    webtokenkey: 'SOMEKEY'
};
```

Now to start the node.js service.

```bash
cd backend/
npm start
```
or

```bash
nodemon backend/bin/www    # For easier debugging
```

- Deployment on server

The following deployment procedure is for CentOS, pre-installed with `node` version `v15.1.0` and `npm` version `7.0.8`. 

```bash
git clone --recurse-submodule https://github.com/Clumsyndicate/Smart-Calendar-backend.git
cd Smart-Calendar-backend
./build.sh
```

Install pm2 service manager

```bash
sudo npm install pm2@latest -g
pm2 start backend/bin/www --watch
```

The `--watch` option ensures the service restarts every time the code is updated from an update. 
Use `pm2 restart www` to restart service manually and `pm2 list` to see the status.

The service is running on port 9000 by default, and it could be changed by setting environment variable `PORT`.

## Frameworks

### API response

- `Node.js` and `express` for server backend API. 
- `jwt` for login tokenization
    * valid login time interval
    * authorization to private pages
- `@hapi/joi` for form validation 

### Database

- `mysql` for database hosting and queries

### Backend integration

- `Github` for code hosting
- `git submodule` for integrating frontend code repo in backend
- `Github CI worker` for automatic deployment
- `Travis.ci` for integration testing

### Server hosting

- `vultr` as VPS provider
- `pm2` to maintain node.js service
- `firewall-cmd` for firewall security


## Repo architecture

### `backend/` 

Holds all the backend-related codebase. 

All the files and directories inside `backend/`

`bin/www` - Access point for the node.js application to start. Wraps `app.js`.

`database` - Provide mysql database-related functionalities. Simplifies querying commands.

`funcs` - Javascript functions that is useful for api routing functions. 

`middle` - Middleware for verifying registration information.

`schema` - Schema used for registration info validation.

`public` - Public files served to the http endpoint. Include static files such as users' avatars.

`routes` - Express routes, including callbacks and middlewares, that handles users' (frontend's) requests. 

`app.js` - Core of the application, pieces together all of the codebase, determines priorities of the middlewares and routing.


### `frontend/`

A git submodule that links to the frontend repository. 
[Link to frontend](https://github.com/Clumsyndicate/Smart-Calendar-Frontend)
