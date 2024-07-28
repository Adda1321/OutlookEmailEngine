import { exec } from "child_process";
import {
  initializeClientWithAccessToken,
  updateAccessToken,
} from "../services/authService";
import User from "../types/user";
import axios from "axios";

type UserWithId = User & { _id: string ;
  account_id: string;};

export async function processNotification(notification: any) {
  const { subscriptionId, changeType, resource } = notification;

  // console.log("Processing notification_for_subscriptionId:", subscriptionId);

  const userData = await new Promise<UserWithId>(async (resolve, reject) => {
    try {
      const response = await axios.get("http://localhost:8082/api/rest/getaccountbysubscriptionid", {
        params: {
          subscription_id: subscriptionId
        }
      });
  
      // console.log("RESPONSE_of_USERDATA_after_UPDATE DATA" , response.data );
  
      if (response.data.linked_accounts && response.data.linked_accounts.length > 0) {
        resolve({
          _id: response.data.linked_accounts[0].id,
          account_id: response.data.linked_accounts[0].account_id,
          ...(response.data.linked_accounts[0] as User),
        });
      } else {
        reject(new Error("User data not found for subscription"));
      }
    } catch (err) {
      reject(new Error("Error fetching user data: " ));
    }
  });
  

  // console.log("userData===>AFTER FETCHING THE aCCOUNT:", userData);
  // await updateAccessToken(userData);

  // Check if accessToken is defined
  if (!userData.accessToken) {
    throw new Error("Access token is undefined after update.");
  }

  // Create an instance of the Microsoft Graph client
  const client = initializeClientWithAccessToken(userData.accessToken);

  // Process the notifications
  if (changeType === "created" || changeType === "updated") {
    try {
      // Fetch the updated message using the resource URL
      const email = await client.api(resource).get();
      // console.log("messageFOR Clientttt===>", email);

      const bulkData =  {
        email_id: email.id,
        account_id:userData.account_id,
        from_name: email.isDraft ? null : email.from.emailAddress.name,
        to_name:
          email.isDraft || !email.toRecipients
            ? null
            : email.toRecipients
                .map((recipient: any) => recipient.emailAddress.name)
                .join(", "),
        body: email.bodyPreview,
        subject: email.subject,
      };
      // console.log("emailDocument======>", emailDocument);


      try {
        const response = await axios.post(
          "http://localhost:8082/api/rest/insert_mails",
          { objects: bulkData }
        );
        console.log("Email saved to database successfully:", response.data);
      } catch (error) {
        console.error("Error saving email to database:");
      }


    } catch (error) {
      console.error("Error fetching message from Microsoft Graph:", error);
    }
  } else if (changeType === "deleted") {
    // Delete the message from Elasticsearch
    const deleteEmailCommand = ``;
console.log("DELETEDDDDD")
    // await new Promise<void>((resolve, reject) => {
    //   exec(deleteEmailCommand, (error, stdout, stderr) => {
    //     if (error) {
    //       console.error("Error deleting message:", stderr);
    //       return reject(new Error("Error deleting message"));
    //     }

    //     console.log("Deleted message:", stdout);
    //     resolve();
    //   });
    // });
  }
}
