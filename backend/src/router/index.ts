import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controller";
import { verifyUserFields } from "../middleware/verifyUserFields";
import { uniqueEmail } from "../middleware/uniqueEmail";
import { verifyLogin } from "../middleware/verifyLogin";

const router = Router();

router.post("/auth/register", verifyUserFields, uniqueEmail, registerUser);
router.post("/auth/login", verifyLogin, loginUser);

export default router;
