# Project EmailEngine: with Hasura | GraphQL | Node | Vue 2 | Typescript | Auth0 ts

## Overview

This project is organized into two main subdirectories:

- **server**
- **client**

### Server

1. **Setup Server**

   Navigate to the `server` directory and use the following commands to set up and start the server:

   ```sh
   cd server
   docker compose up
   npm start
***Note:***

1. Register your app in the Azure portal.

2. Assign related secrets in the .env file or azureconfig file.

3. The server will run on port 3000 by default.

4. On port 8082, the Hasura engine will run. you can access it by http://localhost:8082/console
   1. in docker-compose.yml HASURA_GRAPHQL_ENABLE_CONSOLE: "false" , thus user cannot use port 8082 for safety purpose
   2. install hasura cli
   3. use hasura console http://localhost:9695
   4. if a user changes schema or permissions from console, migrations and metadata will automatically gets updated
   5. in docker-compose.yml file we added .cli-migrations-v3 (an updated image with volumns) so that whenever the docker container first runs, a user donot have to manually export metadata and apply migrations
   6. refer Hasura [docs](https://hasura.io/docs/latest/migrations-metadata-seeds/manage-seeds/) for more context of seed, metadata and migrations 
   ```
   hasura version  //2.40.0
   hasura apply seed 
   hasura console

5. Connect hasura cloud to the existing Postgres database, by assigning the environment variable PG_DATABASE_URL.

6. To use Notification subscription (Ms graph API Subscription) we need an https public url and not localhost:3000
   ```
   ngrok http http://localhost:3000
7. use ngrok to map 3000 and use ngrok publick url in environment variables.


### Client
2. **Setup Client:**

   Navigate to the `client` directory and use the following commands to set up and start the client:

   ```sh
   npm i
   npm run serve

***Notes:***
Node version 16
The client is built vue create.

***References:***

[Integrate Auth0 with Vue2 Typescript (CLI) ](https://github.com/RisingStack/auth0-ts-vue-example) [blog](https://blog.risingstack.com/auth0-vue-typescript-quickstart-docs/)

[Install Vue2 with Vite ](https://github.com/vuejs/create-vue)


### Working

* First login with Auth0
* Once loggedin, Linked your outlook account
* If authenticated successfully, Your mails will show
* If you an event triggers (Receive/Delete email), in few seconds db will be updated
* Then user can click on Refresh button to fetch the latest/updated emails

