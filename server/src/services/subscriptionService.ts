import { Client } from "@microsoft/microsoft-graph-client";
import User from "../types/user";
import { exec } from "child_process";
import { NOTIFICATION_URL } from "../config/azureConfig";
import {
  updateAccessToken,
  initializeClientWithAccessToken,
} from "../services/authService";

export async function createSubscription(user: User) {
  await updateAccessToken(user);

  // Check if accessToken is defined
  const accessToken = user.accessToken;
  if (!accessToken) {
    throw new Error("Access token is not available");
  }

  const client = initializeClientWithAccessToken(accessToken);

  const currentDate = new Date();
  const expirationDate = new Date(currentDate);
  expirationDate.setMinutes(currentDate.getMinutes() + 1000);

  const subscriptionPayload = {
    changeType: "created,updated,deleted",
    notificationUrl: `${NOTIFICATION_URL}/api/notifications`,
    resource: "/me/messages",
    expirationDateTime: expirationDate.toISOString(),
    clientState: "SecretClientState",
  };
  // get the list of subscriptionsss
  let response_sub_creation;
  try {
    // Get all subscriptions
    const get_all_subscriptions = await client.api("/subscriptions").get();
    console.log("get_all_subscriptions_value", get_all_subscriptions.value);

    // Delete all existing subscriptions
    for (const subscription of get_all_subscriptions.value) {
      try {
        await client.api(`/subscriptions/${subscription.id}`).delete();
        console.log(`Subscription ${subscription.id} deleted successfully`);
      } catch (deleteError) {
        console.error(
          `Error deleting subscription ${subscription.id}:`,
          deleteError
        );
      }
    }

    // Create a new subscription
    response_sub_creation = await client
      .api("/subscriptions")
      .post(subscriptionPayload);
  } catch (error) {
    console.error("Error managing subscriptions:", error);
  }
  console.log("New subscription created:", response_sub_creation);
  return { user, subscriptionData: response_sub_creation };
}

export async function updateUserAccount(user: User, subscriptionData: any) {
  const queryUserAccountCommand = `
    curl -X GET "http://localhost:9200/user_accounts/_search" -H 'Content-Type: application/json' -d'
    {
      "query": {
        "match": {
          "account_email": "${user.email}"
        }
      }
    }'
  `;

  return new Promise<void>((resolve, reject) => {
    exec(queryUserAccountCommand, (error, stdout, stderr) => {
      if (error) {
        console.error("Error retrieving user account:", stderr);
        reject(new Error(stderr));
        return;
      }

      const result = JSON.parse(stdout);
      if (result.hits.total.value === 0) {
        reject(new Error("User account not found"));
        return;
      }

      const userAccountId = result.hits.hits[0]._id;
      const userAccount = result.hits.hits[0]._source;

      if (!userAccount.subscriptionId) {
        userAccount.subscriptionId = subscriptionData.id;
        userAccount.accessToken = user.accessToken;
        userAccount.refreshToken = user.refreshToken;
        userAccount.expirationDateTime = subscriptionData.expirationDateTime;

        const updateUserAccountCommand = `
          curl -X POST "http://localhost:9200/user_accounts/_doc/${userAccountId}" -H 'Content-Type: application/json' -d'
          ${JSON.stringify(userAccount)}'
        `;

        exec(updateUserAccountCommand, (error, stdout, stderr) => {
          if (error) {
            console.error("Error updating user account:", stderr);
            reject(new Error(stderr));
            return;
          }
          resolve();
        });
      } else {
        resolve();
      }
    });
  });
}
