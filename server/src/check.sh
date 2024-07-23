#!/bin/bash

ACCESS_TOKEN="EwA4A+l3BAAUpSDGiWSEqG8SEbhMwx+LVy/3Wu8AAU2NxorzIe5ajXfhGu8TqzrYNBiaUEAlKXnu7UoAXItdTrRvLlA9oG45SSN0DKNkjv2ajUWEQGA3OOVe+jb1VGJhVT2dKHCkPry9h1yUJp6XVyEZ4doxwqaOJQX0sVJyoPsXNVxGj4Zkq82swbmc/TH+Z+mjaQLQzlkBKt+vOOrQtmDlMjDTFYRICNohzAsFg4CAucxW0ZBz2OLV0u5jkcbFttSTanj2NXCQi66SCbxTJHdnzvpZERMu21sw722JbHjFT+DYzatQEMQU+G3VQoMSTUehuuV66pQQ2qkLmavBf/F+4JMeWw5BzDrzCJQJQGxK+Q1D5HxpKXTpuhdm1AsDZgAACNYTDbJNGimwCAIqAzotYxIFFGHm6mqsCSV+OMeOERkha6QFa/QKs4/7gQlvqGGntU3RRJMmRZ9iM640VRKniSiAbnLNvqG0QnCukp+PSC6uk/PT4Iz7+WcJlu/wlcuL62kIW9VyO/GCic2d2uBpvhYUXFhL8i4l/cQhIYXZc0wOoOWHjJY6qFlC7VPX383XO5jpMUdHcjYJSvuOJodjMdTWv0vGF0tHm6ZSQkwkwka01qFPaGCiL96I84yfEEvwPGl3YDFdvFi96dyPLT2ZqFnpdanB+VCIVTSd5CHwQS7LTj3ix8yRCeclqsy+3WlZ5xdqE3+zeo0A804EwAkPYtZOsD2epV8srY9yr1kX0HH6scCTM9YC6DrHnlFtP+FXP4xWqunq4UoO7ayctrg94lOVIWpxDLjlnIVXCRSoXY21nqaIAer8QpNGb/mJ96t0/d3UsPgV0C0gl60YzrZigR13NoMt/69Ov1KdkV/nezEdDQ+x9iiiptKMo7bsWLmPvb6PeFCh2Ca7y/m0EhVPD/vpkRsmNm0a2TE3fdarRAA5/iUFydmTtsGxr8aqt/O73yYjawCkA/CNft/qOtr3lgY6jyiSRDpGZJ6kRDqaYB2/3anTQIIgZgu4Z5NQG+YpeGf3vbqS1tOPGPojqn9YwMDuL7bCEHtofbo4VaPvmgaLmqi7X4vKkKNK57WKBNlVoqYvQwI="
NOTIFICATION_URL="https://2dde-182-185-215-33.ngrok-free.app/api/notifications"
LIFECYCLE_NOTIFICATION_URL="https://2dde-182-185-215-33.ngrok-free.app/api/lifecycle"
EXPIRATION_DATETIME="2024-05-23T11:00:00.0000000Z"
CLIENT_STATE="<CLIENT_STATE>"

curl -X POST \
  https://graph.microsoft.com/v1.0/subscriptions \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H 'Content-Type: application/json' \
  -d "{
  \"changeType\": \"created,updated\",
  \"notificationUrl\": \"$NOTIFICATION_URL\",
  \"lifecycleNotificationUrl\": \"$LIFECYCLE_NOTIFICATION_URL\",
  \"resource\": \"/me/mailfolders('inbox')/messages\",
  \"expirationDateTime\": \"$EXPIRATION_DATETIME\",
  \"clientState\": \"$CLIENT_STATE\"
}"