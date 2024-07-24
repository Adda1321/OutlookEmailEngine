import { Request, Response } from "express";
import passport from "passport";
import axios from "axios";

export const authenticateOutlook = passport.authenticate("windowslive", {
  scope: [
    "openid",
    "profile",
    "offline_access",
    "https://outlook.office.com/Mail.Read",
  ],
});

export const outlookCallback = [
  passport.authenticate("windowslive", { failureRedirect: "/" }),
  async (req: Request, res: Response) => {
    if (req.user) {

      res.redirect("/initialFetch");
    } else {
      console.log("Authentication failed");
      res.redirect("/");
    }
  },
];

export const isAuthenticated = (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
};
