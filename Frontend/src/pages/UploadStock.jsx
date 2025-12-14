import React, { useState } from "react";
import "../styles/UpdateStock.css";

function UpdateStock() {
  const [activeTab, setActiveTab] = useState("single");


  const [medicineName, setMedicineName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [mrp, setMRP] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [pharmacyId, setPharmacyId] = useState("");

 
  const [excelPharmacyId, setExcelPharmacyId] = useState("");
  const [excelFile, setExcelFile] = useState(null);

 
  const handleSingleUpload = async () => {
    if (!medicineName || !expiryDate || !quantity || !mrp || !offerPrice || !pharmacyId) {
      alert("All fields are required");
      return;
    }

    const data = {
      medicineName,
      expiryDate,
      quantity,
      mrp,
      offerPrice,
      pharmacyId,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/medicine/upload-single`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Upload failed");
        return;
      }

      alert("Medicine uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  
  const handleExcelUpload = async () => {
    if (!excelPharmacyId) {
      alert("Enter Pharmacy ID");
      return;
    }

    if (!excelFile) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", excelFile);
    formData.append("pharmacyId", excelPharmacyId);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/medicine/upload-excel`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "File upload failed");
        return;
      }

      alert(`Excel Uploaded Successfully! Rows inserted: ${result.inserted}`);
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="upload-container">
      <h1>Upload Expiry Medicines</h1>
      <p className="subtitle">Choose a method to upload your stock.</p>

  
      <div className="tab-buttons">
        <button
          className={activeTab === "single" ? "active" : ""}
          onClick={() => setActiveTab("single")}
        >
          Single Upload
        </button>

        <button
          className={activeTab === "excel" ? "active" : ""}
          onClick={() => setActiveTab("excel")}
        >
          Excel Upload
        </button>
      </div>

     
      {activeTab === "single" && (
        <form className="upload-form" onSubmit={(e) => e.preventDefault()}>
          
          <div>
            <label>Medicine Name</label>
            <input type="text" onChange={(e) => setMedicineName(e.target.value)} />
          </div>

          <div>
            <label>Expiry Date</label>
            <input type="date" onChange={(e) => setExpiryDate(e.target.value)} />
          </div>

          <div>
            <label>Quantity</label>
            <input type="number" onChange={(e) => setQuantity(e.target.value)} />
          </div>

          <div>
            <label>MRP</label>
            <input type="number" onChange={(e) => setMRP(e.target.value)} />
          </div>

          <div>
            <label>Offer Price</label>
            <input type="number" onChange={(e) => setOfferPrice(e.target.value)} />
          </div>

          <div>
            <label>Pharmacy ID</label>
            <input type="text" onChange={(e) => setPharmacyId(e.target.value)} />
          </div>

          <button type="button" onClick={handleSingleUpload}>
            Upload Medicine
          </button>
        </form>
      )}


      {activeTab === "excel" && (
        <div className="excel-upload-box">
          <div>
            <label>Pharmacy ID</label>
            <input
              type="text"
              onChange={(e) => setExcelPharmacyId(e.target.value)}
            />
          </div>

          <p className="file-label">Select an Excel/CSV file</p>
          <input type="file" onChange={(e) => setExcelFile(e.target.files[0])} />

          <button type="button" onClick={handleExcelUpload}>
            Upload File
          </button>

 
          <div className="sample-format-box">
            <h3>Required Excel Format</h3>

            <table className="sample-table">
              <thead>
                <tr>
                  <th>medicineName</th>
                  <th>expiryDate</th>
                  <th>quantity</th>
                  <th>mrp</th>
                  <th>offerPrice</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Paracetamol 500mg</td>
                  <td>2025-01-20</td>
                  <td>50</td>
                  <td>120</td>
                  <td>80</td>
                </tr>
              </tbody>
            </table>

            <p className="note">⚠️ Files with incorrect column names will be rejected.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateStock;
