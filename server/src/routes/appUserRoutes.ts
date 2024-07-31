import { Router, Request, Response } from "express";
import { appUserStore } from "../types/appUser";
import axios from "axios";
const router = Router();

router.post("/createAppUser", async (req: Request, res: Response) => {
  appUserStore.setAppUser(req.body);
  await axios.post("http://localhost:8082/api/rest/createAppUser", req.body);

  res.status(200).send("app user created successfully");
});

export default router;
