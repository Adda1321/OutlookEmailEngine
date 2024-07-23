import { Request, Response } from 'express';
import createUser from '../services/userService';

export const createUserHandler = async (req: Request, res: Response) => {
  const { id, email, name, number } = req.headers;
  if (!id || !email || !name || !number) {
    return res.status(400).json({ message: 'Missing required headers' });
  }

  try {
    const newUser = await createUser(id as string, email as string, name as string, number as string);
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating user', details: error.message });
  }
};