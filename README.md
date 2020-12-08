# Smart-Calendar-backend

[![Build Status](https://travis-ci.org/Clumsyndicate/Smart-Calendar-backend.svg?branch=main)](https://travis-ci.org/Clumsyndicate/Smart-Calendar-backend)

This is the backend for Smart Calendar Project. Johnson Zhou is primarily responsible for the backend of this CS 97 project. 

[Link to frontend](https://github.com/Clumsyndicate/Smart-Calendar-Frontend)

## Useful commands

- Clone this repo with frontend submodule.

```bash
git clone --recurse-submodule https://github.com/Clumsyndicate/Smart-Calendar-backend.git
```

- Rebase the submodule tracked to the newest version

```bash
git submodule update --remote --rebase
```

- Deployment

Make sure you have node.js and npm.

```bash
cd Smart-Calendar-backend/
./build.sh
```

npm packages required will be installed and the React frontend will be built.

```bash
cd backend/
npm start
```
