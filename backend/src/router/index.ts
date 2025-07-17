import { Router } from "express";
import {
  registerUser,
  loginUser,
  logOut,
  getLoggedinUserDetails,
  updateLoggedInUserInfo,
  updateUserPassword,
} from "../controllers/user.controller";
import {
  createTask,
  getAllUserTasks,
  getSpecificTaskById,
  updateTaskById,
} from "../controllers/task.controller";
import { verifyUserFields } from "../middleware/verifyUserFields";
import { uniqueEmail } from "../middleware/uniqueEmail";
import { verifyLogin } from "../middleware/verifyLogin";
import { verifyUserPresent } from "../middleware/verifyUserPresent";
import { verifyTasksInputs } from "../middleware/verifyTasksInputs";

const router = Router();

router.post("/auth/register", verifyUserFields, uniqueEmail, registerUser);
router.post("/auth/login", verifyLogin, loginUser);
router.post("/auth/logout", logOut);
router.get("/user", verifyUserPresent, getLoggedinUserDetails);
router.patch("/user", verifyUserPresent, updateLoggedInUserInfo);
router.patch("/user/password", verifyUserPresent, updateUserPassword);

router.post("/tasks", verifyTasksInputs, verifyUserPresent, createTask);
router.get("/tasks", verifyUserPresent, getAllUserTasks);
router.get("/tasks/:id", verifyUserPresent, getSpecificTaskById);
router.patch("/tasks/:id", verifyUserPresent, updateTaskById);

export default router;
