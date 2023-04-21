import { Router } from "express";
import {
  store,
  portfolio,
  destroy,
  updatePortfolio,
} from "../controllers/PortfolioController.js";
const router = Router();

router.route("/portfolios").post(store);
router.route("/portfolios/:userId").get(portfolio);
router.route("/portfolios/:portfolioId").delete(destroy);
router.route("/portfolios/:id").put(updatePortfolio);
export default router;
