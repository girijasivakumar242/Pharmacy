import express from "express";
import { registerPharmacy } from "../controllers/PharmacyController.js";

const router = express.Router();

router.post("/register", registerPharmacy);

export default router;
