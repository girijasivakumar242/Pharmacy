import express from "express";
import { searchMedicines } from "../controllers/searchController.js";

const router = express.Router();

router.get("/medicine", searchMedicines);

export default router;
