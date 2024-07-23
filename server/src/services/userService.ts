import { exec } from 'child_process';
import User from '../types/user';



// Define the function to create a new user
export function createUser(id: string, email: string, name: string, number: string): Promise<{ message: string, user?: User, details?: string }> {
  return new Promise((resolve, reject) => {
    const newUser: User = {
      email,
      name,
      number,
      createdAt: new Date().toISOString(),
    };

    const createUserCommand = `
      curl -X POST "http://localhost:9200/users/_doc/${id}" -H 'Content-Type: application/json' -d'
      ${JSON.stringify(newUser)}'
    `;

    exec(createUserCommand, (error, stdout, stderr) => {
      if (error) {
        console.error('Error creating user:', stderr);
        return reject({ message: 'Error creating user', details: stderr });
      }

      console.log('User created:', stdout);
      resolve({ message: 'User created successfully', user: newUser });
    });
  });
}

export default createUser