import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  medicineName: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  quantity: { type: Number, required: true, min: 1 },
  mrp: { type: Number, required: true, min: 0 },
  offerPrice: { type: Number, required: true, min: 0 },
  uploadedAt: { type: Date, default: Date.now },
  pharmacyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pharmacy",
    required: true
  }
});

export default mongoose.model("Medicine", medicineSchema);
