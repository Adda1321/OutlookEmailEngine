import { Request, Response } from 'express';
import { createSubscription, updateUserAccount } from '../services/subscriptionService';
import User from '../types/user';

export const subscribeHandler = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;

    // Create subscription
    const { user: updatedUser, subscriptionData } = await createSubscription(user);

    // Update user account in Elasticsearch
    await updateUserAccount(updatedUser, subscriptionData);

    res.status(200).json({ message: 'Subscription added successfully' });
  } catch (error: any) {
    console.error('Error creating subscription:', error);

    // Log additional details if available
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }

    res.status(500).json({ message: 'Error creating subscription', details: error.message });
  }
};
