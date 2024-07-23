# Pre-requisites
## 1. Register Your App
To get started with Email-Client, you must register your app in [Microsoft Azure ](https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade)

1.  Click on 'New Registration'
2.  Give a suitble name
3.  Choose 'Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant) and personal Microsoft accounts (e.g. Skype, Xbox)'
4.  Under Redirect URL, select web and enter `http://localhost:3000/delegated/callback` and click register
5.  Copy Client ID
6.  Tenant ID in ou case will be 'common'
7.  click on 'Add a certificate or secret'
8.  Click on 'New client secret'
9.  Give a description and click 'Add'
10. Copy Secret ID, it will not be visible in the future.

**Copy paste value of Client Id and Client Scret in config/azureConfig.ts**

## 3. Node
install lastest version of [Node js](https://nodejs.org/en/download/package-manager) on your machine

## 2. NGROK setup

For Linux:

1. Install ngrok via Apt with the following command:

curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc \
	| sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null \
	&& echo "deb https://ngrok-agent.s3.amazonaws.com buster main" \
	| sudo tee /etc/apt/sources.list.d/ngrok.list \
	&& sudo apt update \
	&& sudo apt install ngrok

2. Run the following command to add your authtoken to the default ngrok.yml configuration file
`ngrok config add-authtoken 2geeEIMpOqQb13cxZZlQ3Nqnenx_4zRp4r957xNQpTdNsFUWN`

3. Put you app online:
`ngrok http http://localhost:3000` or `ngrok http 3000`


For Windows:
1. run `choco install ngrok`
4. Run the following command to add your authtoken to the default ngrok.yml configuration file

`ngrok config add-authtoken 2geeEIMpOqQb13cxZZlQ3Nqnenx_4zRp4r957xNQpTdNsFUWN`

5. Put you app online:
`ngrok http http://localhost:3000` or `ngrok http 3000`

**Copy paste the generated link in config/azureConfig.ts**

## 3. Docker Setup

Email-Engine uses [docker](https://www.docker.com/) to containerize and run ElasticSearch.

Install [Docker Desktop](https://docs.docker.com/install/) using up-to-date installation instructions from their website.

In terminal, run `docker compose up -d` to start docker, and `docker compose down` to shutdoun docker

## 4. Installing Dependencies
cd into `Back-end` and run `npm i` in terminanl. This will install all dependencies.

# Start Project
run `npm start`, this will launch app on `localhost:3000`

# Project Structure

## End-points

### GET /isAuthenticated
Purpose: Check if the user is authenticated.

Response:

200 OK: { isAuthenticated: true } if authenticated, { isAuthenticated: false } otherwise.

### GET /auth/outlook
Purpose: Initiate Outlook authentication using Passport.js.

Redirects: To the Outlook login page for user authentication.

### GET /delegated/callback
Purpose: Handle the OAuth2 callback from Outlook.

Redirects: To /initialFetch upon successful authentication.

### POST /createuser
Purpose: Create a new user in Elasticsearch.

Headers:

id: User ID
email: User email
name: User name
number: User phone number
Response:

201 Created: { message: 'User created successfully', user: newUser }
400 Bad Request: { message: 'Missing required headers' }
500 Internal Server Error: { message: 'Error creating user', details: stderr }

### GET /initialFetch
Purpose: Fetch all emails from the authenticated user's Outlook account and index them in Elasticsearch.

Response:

302 Found: Redirects to the main page if successful.
500 Internal Server Error: { message: 'Error fetching or indexing emails', details: error.message }

### GET /emails
Purpose: Retrieve all emails for the authenticated user from Elasticsearch.

Response:

200 OK: List of emails.
500 Internal Server Error: { message: 'Error querying emails', details: stderr }

### GET /createaccount
Purpose: Create a new account entry in Elasticsearch for the authenticated user and subscribe to email notifications.

Headers:

user_id: User ID
Response:

201 Created: { message: 'Account created and subscription added successfully', account: newAccount }
500 Internal Server Error: { message: 'Account created but error subscribing', details: error.message }

### GET /subscribe
Purpose: Subscribe to Outlook email notifications using Microsoft Graph API.

Response:

200 OK: { message: 'Subscription added successfully' }
500 Internal Server Error: { message: 'Error creating subscription', details: error.message }

### POST /api/notifications
Purpose: Handle incoming email notifications from Microsoft Graph API.

Response:

200 OK: 'Notifications processed successfully'
500 Internal Server Error: 'Error processing notifications'