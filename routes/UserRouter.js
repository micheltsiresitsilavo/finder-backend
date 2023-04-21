import { Router } from "express";
import AuthMiddleware from "../Middleware/AuthMiddleware.js";
import { validateOnLogin, validateOnRegister } from "../Request/UserRequest.js";
import {
  users,
  user,
  store,
  update,
  vola,
  login,
  register,
} from "../controllers/UserController.js";
const router = Router();

router.route("/users").get(users);
router.route("/users").post(store);
router.route("/users/:id").put(update);
router.route("/login").post(validateOnLogin, login);
router.route("/register").post(validateOnRegister, register);
router.route("/users/:id").get(user);
router.route("/vola").get(AuthMiddleware, vola);

export default router;
