import Medicine from "../models/Medicine.js";
import Pharmacy from "../models/Pharmacy.js";

export const searchMedicines = async (req, res) => {
  try {
    const { medicineName, city } = req.query;

    if (!medicineName || !city) {
      return res.status(400).json({ message: "Medicine name and city required" });
    }

    const pharmacies = await Pharmacy.find({
      "address.city": { $regex: new RegExp(city, "i") }
    });

    if (pharmacies.length === 0) {
      return res.status(200).json({ results: [] });
    }

    const pharmacyIds = pharmacies.map((p) => p._id);

    const medicines = await Medicine.find({
      medicineName: { $regex: new RegExp(medicineName, "i") },
      pharmacyId: { $in: pharmacyIds }
    }).populate("pharmacyId", "name contact address");

    const results = medicines.map((m) => ({
      medicineName: m.medicineName,
      quantity: m.quantity,
      mrp: m.mrp,
      offerPrice: m.offerPrice,
      expiryDate: m.expiryDate,
      pharmacy: {
        name: m.pharmacyId.name,
        contact: m.pharmacyId.contact,
        address: m.pharmacyId.address
      }
    }));

    res.json({ results });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
