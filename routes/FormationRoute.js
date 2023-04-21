import { Router } from "express";
import {
  store,
  formation,
  destroy,
  updateFormations,
} from "../controllers/FormationController.js";
const router = Router();

router.route("/formations").post(store);
router.route("/formations/:userId").get(formation);
router.route("/formations/:formationId").delete(destroy);
router.route("/formations/:id").put(updateFormations);
export default router;
