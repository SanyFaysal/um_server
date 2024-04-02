import express from "express";
import { UserControllers } from "./user.controller";
import { USER_ROLE } from "./user.constants";
import { userValidations } from "./user.validation";
import { validateRequest } from "../../../middlewares/validateRequest";
import { authChecker } from "../../../middlewares/authChecker";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidations.userValidationSchema),
  UserControllers.createUser
);
router.post(
  "/login",
  validateRequest(userValidations.userLoginValidationSchema),
  UserControllers.userLogin
);
router.post(
  "/change-password",
  authChecker(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(userValidations.passwordChangeValidationSchema),
  UserControllers.userPasswordChange
);

export const UserRoutes = router;
