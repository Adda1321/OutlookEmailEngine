import axios from "axios";
import { exec } from "child_process";
import User from "../types/user";
import {
  updateAccessToken,
  initializeClientWithAccessToken,
} from "../services/authService";

export const fetchEmailsAndIndex = async (user: User) => {
  await updateAccessToken(user);

  // Check if accessToken is defined
  const accessToken = user.accessToken;
  if (!accessToken) {
    throw new Error("Access token is not available");
  }

  // in User table we have this user_id means this user is linking the account
  const accountDetails = {
    userId: "707fd1d0-3a9a-434e-8599-b6c20c402628",
    accountId: user.id,
    accountEmail: user.email,
    accessToken: user.accessToken,
    createdAt: new Date().toString(),
  };
  const createAccount_response = await axios.post(
    "http://localhost:8082/api/rest/createaccount",
    accountDetails
  );

  const client = initializeClientWithAccessToken(accessToken);

  let allEmails: any[] = [];
  let response = await client.api("/me/messages").get();
  allEmails.push(...response.value);
  const account_id =
    createAccount_response.data?.insert_linked_accounts?.returning[0]
      ?.account_id;
  const bulkData = allEmails.map((email: any) => {
    return {
      email_id: email.id,
      account_id,
      from_name: email.isDraft ? null : email.from?email.from.emailAddress.name:"from username@mail.com",
      to_name:
        email.isDraft || !email.toRecipients
          ? null
          : email.toRecipients
              .map((recipient: any) => recipient?recipient.emailAddress.name:"from username@mail.com")
              .join(", "),
      body: email.bodyPreview,
      subject: email.subject,
    };
  });
  try {
    const response = await axios.post(
      "http://localhost:8082/api/rest/insert_mails",
      { objects: bulkData }
    );
    console.log("Email saved to database successfully:", response.data);
  } catch (error) {
    console.error("Error saving email to database:");
  }

  return { data: allEmails };

 
};
