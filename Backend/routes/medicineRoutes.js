import { Router } from "express";
import uploadFile from "../middleware/uploadFile.js";
import { uploadSingle, uploadExcel } from "../controllers/medicineController.js";

const router = Router();


router.post("/upload-single", uploadSingle);
router.post("/upload-excel", uploadFile.single("file"), uploadExcel);

export default router;
