import { exec } from 'child_process';
import axios from 'axios';
import User from '../types/user';
import NewAccount from '../types/newAccount';

export function createAccount(user: User, userId: string, cookie: string): Promise<{ message: string, account?: NewAccount, details?: string }> {
  return new Promise((resolve, reject) => {
    const newAccount: NewAccount = {
      account_email: user.email,
      user_id: userId,
      accessToken: user.accessToken,
      createdAt: new Date().toISOString(),
    };

    const createAccountCommand = `
      curl -X POST "http://localhost:9200/user_accounts/_doc/${user.id}" -H 'Content-Type: application/json' -d'
      ${JSON.stringify(newAccount)}'
    `;

    exec(createAccountCommand, (error, stdout, stderr) => {
      if (error) {
        console.error('Error creating account:', stderr);
        return reject({ message: 'Error creating account', details: stderr });
      }

      // // After creating the account, call the /subscribe endpoint
      // axios.get('http://localhost:3000/subscribe', {
      //   headers: {
      //     Cookie: cookie // Pass cookies to maintain the session
      //   }
      // })
      // .then((response) => {
      //   resolve({ message: 'Account created and subscription added successfully', account: newAccount });
      // })
      // .catch((error) => {
      //   console.error('Error calling /subscribe:', error);
      //   reject({ message: 'Account created but error subscribing', details: error.message });
      // });
    });
  });
}
