import React, { useState } from "react";
import "../styles/SearchMedicine.css";

function SearchMedicine() {
  const [medicineName, setMedicineName] = useState("");
  const [city, setCity] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!medicineName || !city) {
      alert("Please enter medicine name and city");
      return;
    }

    setLoading(true);
    setResults([]);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/search/medicine?medicineName=${medicineName}&city=${city}`
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Search failed");
        setLoading(false);
        return;
      }

      setResults(data.results);
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h1>Search Medicines</h1>

      <div className="search-form">
        <input
          type="text"
          placeholder="Enter medicine name"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading...</p>}

      <div className="search-results">
        {results.length === 0 && !loading && <p>No results found</p>}

        {results.map((item, index) => (
          <div className="medicine-card" key={index}>
            <h3>{item.medicineName}</h3>
            <p>
              <strong>Quantity:</strong> {item.quantity} |{" "}
              <strong>MRP:</strong> ₹{item.mrp} |{" "}
              <strong>Offer:</strong> ₹{item.offerPrice}
            </p>
            <p>
              <strong>Expiry:</strong>{" "}
              {new Date(item.expiryDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Pharmacy:</strong> {item.pharmacy.name} |{" "}
              <strong>Contact:</strong> {item.pharmacy.contact}
            </p>
            <p>
              <strong>Address:</strong>{" "}
              {`${item.pharmacy.address.area}, ${item.pharmacy.address.city}, ${item.pharmacy.address.state} - ${item.pharmacy.address.pincode}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchMedicine;
