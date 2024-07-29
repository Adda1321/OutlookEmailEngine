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

Register your app in the Azure portal.

Assign related secrets in the .env file or azureconfig file.

The server will run on port 3000 by default.

On port 8082, the Hasura engine will run. you can access it by http://localhost:8082/console

Connect it to the existing Postgres database 
by assigning the environment variable PG_DATABASE_URL.

To use Notification subscription (Ms graph API Subscription) we need an https public url and not localhost:3000
So ue ngrok to map 3000 and use ngrok publick url in environment variables.


### Client
2. **Setup Client:**

   Navigate to the `client` directory and use the following commands to set up and start the client:

   ```sh
   npm i
   npm run dev

***Notes:***
Node version 16
The client is built vue create.
npm create vue@legacy // https://github.com/vuejs/create-vue


### Working

* First login with Auth0
* Once loggedin, Linked your outlook account
* If authenticated successfully, Your mails will show
* If you an event triggers (Receive/Delete email), in few seconds db will be updated
* Then user can click on Refresh button to fetch the latest/updated emails

