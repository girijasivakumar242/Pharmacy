import Pharmacy from "../models/Pharmacy.js";

function generatePharmacyId() {
  const random = Math.floor(100000 + Math.random() * 900000);
  return "PHR-" + random;
}

export const registerPharmacy = async (req, res) => {
  try {
    const { name, licenseNumber, email, contact, address } = req.body;

    if (!name || !licenseNumber || !email || !contact || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    
    const parts = address.split(",").map((p) => p.trim());

    if (parts.length < 3) {
      return res.status(400).json({
        message: "Address must be in: Area, City, Pincode format",
      });
    }

    const [area, city, pincode] = parts;

    if (!area || !city || !pincode) {
      return res.status(400).json({ message: "Complete address required" });
    }

    const emailExists = await Pharmacy.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const licenseExists = await Pharmacy.findOne({ licenseNumber });
    if (licenseExists) {
      return res.status(400).json({ message: "License number already exists" });
    }

    const pharmacyId = generatePharmacyId();

    const newPharmacy = new Pharmacy({
      name,
      licenseNumber,
      email,
      contact,
      address: {
        area,
        city,
        pincode,
      },
      pharmacyId,
    });

    await newPharmacy.save();

    res.status(201).json({ message: "Success", pharmacyId });

  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};
