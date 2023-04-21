import { Router } from "express";
import {
  store,
  area,
  destroy,
  updateArea,
} from "../controllers/DomaineController.js";
const router = Router();

router.route("/areas").post(store);
router.route("/areas/:userId").get(area);
router.route("/areas/:areaId").delete(destroy);
router.route("/areas/:id").put(updateArea);
export default router;
