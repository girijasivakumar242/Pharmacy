import mongoose from "mongoose";

const pharmacySchema = new mongoose.Schema({
  name: { type: String, required: true },
  licenseNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  address: {
    area: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true }
  },

  pharmacyId: { type: String, required: true, unique: true }
});

export default mongoose.model("Pharmacy", pharmacySchema);
