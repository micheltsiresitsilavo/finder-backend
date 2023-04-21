import { Router } from "express";
import {
  store,
  skill,
  destroy,
  updateSkills,
} from "../controllers/SkillController.js";
const router = Router();

router.route("/skills").post(store);
router.route("/skills/:userId").get(skill);
router.route("/skills/:skillId").delete(destroy);
router.route("/skills/:id").put(updateSkills);
export default router;
