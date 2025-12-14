import React, { useState } from "react";
import "../styles/PharmacyRegister.css";

function PharmacyRegister() {
  const [formData, setFormData] = useState({
    name: "",
    licenseNumber: "",
    email: "",
    contact: "",
    address: ""
  });

  const [loading, setLoading] = useState(false);
  const [pharmacyId, setPharmacyId] = useState(null);
  const [error, setError] = useState("");


  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPharmacyId(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/pharmacy/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
      } else {
        setPharmacyId(data.pharmacyId);
      }
    } catch (err) {
      setError("Server not connected");
    }

    setLoading(false);
  }

  return (
    <div className="form-container">
      <h1>Register Your Pharmacy</h1>

      <p className="subtitle">
        Fill the details to receive your unique Pharmacy ID.
      </p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Pharmacy Name</label>
          <input
            type="text"
            name="name"
            placeholder="Pharmacy Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>License Number</label>
          <input
            type="text"
            name="licenseNumber"
            placeholder="License Number"
            value={formData.licenseNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contact</label>
          <input
            type="Number"
            name="contact"
            placeholder="Contact No"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Full Address</label>
          <textarea
            name="address"
            placeholder="Door No, Street, Area, City, Pincode"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {pharmacyId && (
        <div className="success-box">
          <h3>Registration Successful!</h3>
          <p>Your Pharmacy ID:</p>
          <h2 className="pharmacy-id">{pharmacyId}</h2>
          <p>Save this ID for uploading & searching medicines.</p>
        </div>
      )}
    </div>
  );
}

export default PharmacyRegister;
