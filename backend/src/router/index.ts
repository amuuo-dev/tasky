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
  markTaskAsDeleted,
  restoreDeletedTask,
  markTaskAsComplete,
  markTaskAsInComplete,
} from "../controllers/task.controller";
import { verifyUserFields } from "../middleware/verifyUserFields";
import { uniqueEmail } from "../middleware/uniqueEmail";
import { verifyLogin } from "../middleware/verifyLogin";
import { verifyUserPresent } from "../middleware/verifyUserPresent";
import { verifyTasksInputs } from "../middleware/verifyTasksInputs";
import { passwordStrength } from "../middleware/passwordStrength";

const router = Router();

router.post(
  "/auth/register",
  verifyUserFields,
  uniqueEmail,
  passwordStrength,
  registerUser
);
router.post("/auth/login", verifyLogin, loginUser);
router.post("/auth/logout", logOut);
router.get("/user", verifyUserPresent, getLoggedinUserDetails);
router.patch("/user", verifyUserPresent, updateLoggedInUserInfo);
router.patch("/user/password", verifyUserPresent, updateUserPassword);

router.post("/tasks", verifyTasksInputs, verifyUserPresent, createTask);
router.get("/tasks", verifyUserPresent, getAllUserTasks);
router.get("/tasks/:id", verifyUserPresent, getSpecificTaskById);
router.patch("/tasks/:id", verifyUserPresent, updateTaskById);
router.patch("/tasks/delete/:id", verifyUserPresent, markTaskAsDeleted);
router.patch("/tasks/restore/:id", verifyUserPresent, restoreDeletedTask);
router.patch("/tasks/complete/:id", verifyUserPresent, markTaskAsComplete);
router.patch("/tasks/incomplete/:id", verifyUserPresent, markTaskAsInComplete);

export default router;
