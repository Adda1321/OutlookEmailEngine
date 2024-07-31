import { Request, Response } from "express";
import passport from "passport";

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
    const account = req.user;
    res.json({ isAuthenticated: true, account });
  } else {
    res.json({ isAuthenticated: false, account: null });
  }
};
export const logoutOutlook = (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    req.logout((err) => {
      req.session.destroy((err) => {
        if (err) {
          console.error("Failed to destroy session during logout.", err);
        }
        res.status(200).send("Sucsessfull Outlook Account logout")
      });
    });
  } else {
    res.json({ isAuthenticated: false });
  }
};
