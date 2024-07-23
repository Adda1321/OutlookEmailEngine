import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { exec } from 'child_process';
import User from '../types/user';
import { updateAccessToken, initializeClientWithAccessToken } from '../services/authService';

export const fetchEmailsAndIndex = async (user: User) => {
  await updateAccessToken(user);

  // Check if accessToken is defined
  const accessToken = user.accessToken;
  if (!accessToken) {
    throw new Error('Access token is not available');
  }

  const client = initializeClientWithAccessToken(accessToken);

  let allEmails: any[] = [];
  let response = await client.api('/me/messages').get();
  allEmails.push(...response.value)

  // const bulkData = allEmails.map((email: any) => {
  //   const parsedEmail: any = {
  //     account_id: user.id,
  //     subject: email.subject,
  //     body: email.bodyPreview,
  //     isRead: email.isRead,
  //     datetime: email.receivedDateTime,
  //     from: email.isDraft ? null : email.from.emailAddress,
  //     to: email.isDraft || !email.toRecipients ? [] : email.toRecipients.map((recipient: any) => recipient.emailAddress),
  //   };

  //   return [
  //     // JSON.stringify({ index: { _index: 'account_mails', _id: email.id } }),
  //     JSON.stringify(parsedEmail)
  //   ].join('\n');
  // }).join('\n') + '\n';
  
  const bulkData = allEmails.map((email: any) => {
    return {
      account_id: user.id,
      from_name: email.isDraft ? null : email.from.emailAddress.name,
      to_name: email.isDraft || !email.toRecipients ? null : email.toRecipients.map((recipient: any) => recipient.emailAddress.name).join(', '),
      body: email.bodyPreview,
      subject: email.subject,
    };
  });

  for (const emailData of bulkData) {
    try {
      const response = await axios.post('http://localhost:8082/api/rest/insert_mails', emailData);
      console.log('Email saved to database successfully:', response.data);
    } catch (error) {
      console.error('Error saving email to database:');
    }
  }


return {data: allEmails}



  // const tempFilePath = path.join(__dirname, 'bulk_data.ndjson');
  // fs.writeFileSync(tempFilePath, bulkData);

  // const curlCommand = `
  //   curl -X POST "http://localhost:9200/_bulk" -H "Content-Type: application/x-ndjson" --data-binary @${tempFilePath}
  // `;

  // return new Promise<void>((resolve, reject) => {
  //   exec(curlCommand, (error, stdout, stderr) => {
  //     fs.unlinkSync(tempFilePath);

  //     if (error) {
  //       console.error('Error indexing emails:', stderr);
  //       reject(new Error(stderr));
  //     } else {
  //       console.log('Bulk indexing succeeded:', stdout);
  //       resolve();
  //     }
  //   });
  // });
}


export const queryEmails = async (userId: string) => {
  const query = `
    curl -X GET "http://localhost:9200/account_mails/_search" -H 'Content-Type: application/json' -d'
    {
      "query": {
        "match": {
          "account_id": "${userId}"
        }
      },
      "size": 1000
    }'
  `;

  return new Promise<any[]>((resolve, reject) => {
    exec(query, (error, stdout, stderr) => {
      if (error) {
        console.error('Error querying emails:', stderr);
        reject(new Error(stderr));
      }

      const result = JSON.parse(stdout);
      if (!result.hits || !result.hits.hits || !Array.isArray(result.hits.hits)) {
        console.error('Invalid data format received:', result);
        reject(new Error('Invalid data format received'));
      }

      const emails = result.hits.hits.map((hit: any) => hit._source);
      resolve(emails);
    });
  });
};
