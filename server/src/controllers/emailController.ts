import { Request, Response } from "express";
import { fetchEmailsAndIndex } from "../services/emailService";
import axios from "axios";

interface User {
  id: string;
  email: string;
  accessToken: string;
}

export const initialFetchController = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    await fetchEmailsAndIndex(user);

    axios.get("http://localhost:3000/subscribe",{
      headers:{
        Cookie: req.headers.cookie || ''
      }
    })
      .then((response) => {
        console.log("Successfully Subscribed");
        res.redirect("http://localhost:3001/mainPage");
      })
      .catch((error) => {
        console.error("Error calling /subscribe:", error);
      });
  } catch (error: any) {
    console.error("Error fetching or indexing emails:", error);
    res.status(500).send({
      message: "Error fetching or indexing emails",
      details: error.message,
    });
  }
};
