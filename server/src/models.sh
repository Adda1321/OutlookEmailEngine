#!/bin/bash

# Elasticsearch endpoint
ELASTICSEARCH_URL="http://localhost:9200"

# Define mappings for each index
users_mapping='
{
  "mappings": {
    "properties": {
      "id": { "type": "keyword" },
      "name": { "type": "text" },
      "email_address": { "type": "keyword" }
    }
  }
}'

user_accounts_mapping='
{
  "mappings": {
    "properties": {
      "id": { "type": "keyword" },
      "platform": { "type": "text" },
      "user_id": { "type": "keyword" }
    }
  }
}'

account_mails_mapping='
{
  "mappings": {
    "properties": {
      "id": { "type": "keyword" },
      "email": { "type": "keyword" },
      "mail": {
        "type": "object",
        "properties": {
          "subject": { "type": "text" },
          "body": { "type": "text" },
          "isRead": { "type": "boolean" }
        }
      }
    }
  }
}
'

# Create indices with mappings using curl
curl -X PUT "$ELASTICSEARCH_URL/users" -H 'Content-Type: application/json' -d "$users_mapping"
curl -X PUT "$ELASTICSEARCH_URL/user_accounts" -H 'Content-Type: application/json' -d "$user_accounts_mapping"
curl -X PUT "$ELASTICSEARCH_URL/account_mails" -H 'Content-Type: application/json' -d "$account_mails_mapping"

echo "Indices created successfully!"
