# Project EmailEngine: with Hasura | GraphQL | Node | Vue 2 | Typescript

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

Assign related secrets in the .env file.

The server will run on port 3000 by default.

On port 8082, the Hasura engine will run. 

Connect it to the existing Postgres database 
by assigning the environment variable PG_DATABASE_URL.


### Client
2. **Setup Client:**

   ```sh
   npm i
   npm run dev

***Notes:***
The client is built with Vue CLI using vue create.
