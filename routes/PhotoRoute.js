import { Router } from "express";
import { store, photos } from "../controllers/PhotoController.js";
const router = Router();

router.route("/photos").post(store);
router.route("/photos/:userId").get(photos);

export default router;
