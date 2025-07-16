import { Router } from "express";
import {
  registerUser,
  loginUser,
  logOut,
  getLoggedinUserDetails,
  updateLoggedInUserInfo,
} from "../controllers/user.controller";
import { verifyUserFields } from "../middleware/verifyUserFields";
import { uniqueEmail } from "../middleware/uniqueEmail";
import { verifyLogin } from "../middleware/verifyLogin";
import { verifyUserPresent } from "../middleware/verifyUserPresent";

const router = Router();

router.post("/auth/register", verifyUserFields, uniqueEmail, registerUser);
router.post("/auth/login", verifyLogin, loginUser);
router.post("/auth/logout", logOut);
router.get("/user", verifyUserPresent, getLoggedinUserDetails);
router.patch("/user", verifyUserPresent, updateLoggedInUserInfo);

export default router;
