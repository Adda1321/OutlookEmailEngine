import { Request, Response } from 'express';
import { createAccount } from '../services/accountService';

import User from '../types/user';

export const createAccountHandler = async (req: Request, res: Response) => {
  const user = req.user as User;
 
    const result = await createAccount(user, 'userId', req.headers.cookie || '');
  
};
