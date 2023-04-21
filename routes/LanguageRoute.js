import { Router } from "express";
import {
  store,
  language,
  destroy,
  updateLanguages,
} from "../controllers/LanguageController.js";
const router = Router();

router.route("/languages").post(store);
router.route("/languages/:userId").get(language);
router.route("/languages/:languageId").delete(destroy);
router.route("/languages/:id").put(updateLanguages);
export default router;
