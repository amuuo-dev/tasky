import { Router } from "express";
import { registerUser } from "../controllers/user.controller";
import { verifyUserFields } from "../middleware/verifyUserFields";

const router = Router();

router.post("/auth/register", verifyUserFields, registerUser);

export default router;
