# August 8, 2023 Node.JS Server 

## Deploying

### Create environment variable

```sh
cp .env-example .env
```

### Generate SECRET_KEY

```sh
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```

## Set up a Local database
### Create database

Run `mongosh` and create a new database 
```sh
use aug8
```

### Create user

```sh
db.createUser( { user: "manager", pwd: passwordPrompt(), roles: [ { role: "dbOwner", db: "aug8" }] })
```

### Finish .env configuration

Add `user` and `password` to the `.env` file
