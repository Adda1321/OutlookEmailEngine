import { Request, Response } from "express";
import {
  createSubscription,
  updateUserAccount,
} from "../services/subscriptionService";
import User from "../types/user";
import axios from "axios";

export const subscribeHandler = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    // Create subscription
    const { user: updatedUser, subscriptionData } = await createSubscription(
      user
    );

    const accountDetails = {
      account_email: user.email,
      subscription_id: subscriptionData.id,
      accessToken: user.accessToken,
    };

    try {
     await axios.post("http://localhost:8082/api/rest/updateaccount", accountDetails);
    } catch (error) {
      console.error("Error updating account:", error);
    }
    res.status(200).json({ message: "Subscription added successfully" });
  } catch (error: any) {
    console.error("Error creating subscription:", error);

    // Log additional details if available
    if (error.response) {
      console.error("Response data:", error.response.data);
    }

    res
      .status(500)
      .json({ message: "Error creating subscription", details: error.message });
  }
};
