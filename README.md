## Start Server:

Install dependencies:

```sh
 $ npm install
```

Create database:
```sh
 $ mysql -u root -p
```
```sh
 $ CREATE DATABASE IF NOT EXISTS half DEFAULT CHARACTER SET utf8;
```

Config for connect to database save in file `config/db.js`.
Change password and user in config if it need.

 Start API Server:
```sh
 $ npm run start-app
```

  Start Socket Server:
```sh
 $ npm run start-socket
```


## Generation API Docs:

```sh
$ npm install -g api-console-cli
```

```sh
$ npm install -g bower
```

```sh
$ api-console dev ./docs/api.raml  --open
```

## TODO:
#### - ADD pagination middleware
#### - Add Bearer
#### - Restore password
#### - Change password
#### - Validation Query, Params, Body
#### - path userInfo
#### - add logger
#### - handle Errors

