import XLSX from "xlsx";
import Pharmacy from "../models/Pharmacy.js";
import Medicine from "../models/Medicine.js";

const REQUIRED_HEADERS = ["medicineName", "expiryDate", "quantity", "mrp", "offerPrice"];

function parseDate(value) {
 
  if (!value) return null;
  if (value instanceof Date) return value;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

export async function uploadSingle(req, res) {
  try {
    const { pharmacyId, medicineName, expiryDate, quantity, mrp, offerPrice } = req.body;

    if (!pharmacyId || !medicineName || !expiryDate || quantity == null || mrp == null || offerPrice == null) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const pharmacy = await Pharmacy.findOne({ pharmacyId });
    if (!pharmacy) return res.status(400).json({ message: "Invalid Pharmacy ID." });

    const exp = parseDate(expiryDate);
    if (!exp) return res.status(400).json({ message: "Invalid expiryDate (use YYYY-MM-DD)." });

    if (Number(quantity) <= 0) return res.status(400).json({ message: "Quantity must be greater than 0." });

    const doc = await Medicine.create({
      pharmacyId: pharmacy._id,  
      medicineName,
      expiryDate: exp,
      quantity: Number(quantity),
      mrp: Number(mrp),
      offerPrice: Number(offerPrice)
    });

    return res.status(201).json({ message: "Medicine uploaded successfully", id: doc._id });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}


export async function uploadExcel(req, res) {
  try {
    const { pharmacyId } = req.body;

    if (!pharmacyId) return res.status(400).json({ message: "pharmacyId is required." });
    const pharmacy = await Pharmacy.findOne({ pharmacyId });
    if (!pharmacy) return res.status(400).json({ message: "Invalid Pharmacy ID." });

    if (!req.file) return res.status(400).json({ message: "No file uploaded." });

    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    if (!rows.length) return res.status(400).json({ message: "Excel is empty." });

    const first = rows[0];
    for (const h of REQUIRED_HEADERS) {
      if (!Object.prototype.hasOwnProperty.call(first, h)) {
        return res.status(400).json({ message: `Invalid Excel format. Missing column: ${h}` });
      }
    }

    const docs = [];
    let skipped = 0;

    for (const r of rows) {
      const exp = parseDate(r.expiryDate);
      const qty = Number(r.quantity);
      const mrp = Number(r.mrp);
      const offer = Number(r.offerPrice);

      if (!r.medicineName || !exp || !Number.isFinite(qty) || qty <= 0 || !Number.isFinite(mrp) || !Number.isFinite(offer)) {
        skipped += 1;
        continue;
      }

      docs.push({
        pharmacyId: pharmacy._id, 
        medicineName: String(r.medicineName).trim(),
        expiryDate: exp,
        quantity: qty,
        mrp,
        offerPrice: offer
      });
    }

    if (docs.length === 0) {
      return res.status(400).json({ message: "No valid rows found in the file." });
    }

    await Medicine.insertMany(docs);

    return res.json({
      message: "Excel uploaded successfully",
      inserted: docs.length,
      skipped
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}
