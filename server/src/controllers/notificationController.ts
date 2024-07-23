import { Request, Response } from 'express';
import { processNotification } from '../services/notificationService';

export const notificationHandler = async (req: Request, res: Response) => {
  const validationToken = req.query.validationToken as string;

  if (validationToken) {
    console.log('Validation token received:', validationToken);
    return res.status(200).send(validationToken);
  }

  console.log('Notification received:', req.body);
  const notifications = req.body.value;

  try {
    const notificationPromises = notifications.map((notification: any) => processNotification(notification));
    await Promise.all(notificationPromises);

    res.status(200).send('Notifications processed successfully');
  } catch (error) {
    console.error('Error processing notifications:', error);
    res.status(500).send('Error processing notifications');
  }
};
