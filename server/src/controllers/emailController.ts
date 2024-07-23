import { Request, Response } from 'express';
import { fetchEmailsAndIndex, queryEmails } from '../services/emailService';

interface User {
    id: string;
    email: string;
    accessToken: string;
  }

export const initialFetchController = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    await fetchEmailsAndIndex(user);
    res.redirect('http://localhost:3001/mainPage');
  } catch (error: any) {
    console.error('Error fetching or indexing emails:', error);
    res.status(500).send({ message: 'Error fetching or indexing emails', details: error.message });
  }
};

export const queryEmailsController = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    const emails = await queryEmails(user.id);
    res.json(emails);
  } catch (error: any) {
    console.error('Error querying emails:', error);
    res.status(500).json({ message: 'Error querying emails', details: error.message });
  }
};
