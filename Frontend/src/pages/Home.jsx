import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <h1 className="title">Expired Medicines Exchange Platform</h1>
        <p className="subtitle">
          Helping pharmacies reduce waste by sharing near-expiry medicines with nearby pharmacies.
        </p>
        <div className="button-group">
          <Link to="/register"><button className="btn">Register Your Pharmacy</button></Link>
          <Link to="/upload"><button className="btn">Upload Expired Medicines</button></Link>
          <Link to="/search"><button className="btn">Search Medicines</button></Link>
        </div>
      </section>

      <section className="section">
        <h2 className="heading">What is this platform?</h2>
        <p className="text">
          This system allows pharmacies to upload their near-expiry medicines and share them with other pharmacies in the same city. It helps reduce wastage, save costs, and improve medicine availability for customers.
        </p>
      </section>

      <section className="section">
        <h2 className="heading">How it works</h2>
        <ul className="list">
          <li>Register your pharmacy and get a unique Pharmacy ID.</li>
          <li>Upload your expired/near-expiry medicines as a CSV file.</li>
          <li>Other pharmacies can search and contact you if needed.</li>
          <li>Reduce waste. Save money. Help customers.</li>
        </ul>
      </section>

      <section className="section">
        <h2 className="heading">Why pharmacies love this platform</h2>
        <ul className="list">
          <li>Reduce expired stock loss</li>
          <li>Easy uploading using CSV file</li>
          <li>Search medicines across your city</li>
          <li>No login required for pharmacies</li>
          <li>Easy, fast, and completely free</li>
        </ul>
      </section>

      <footer className="footer">
        © 2025 Expired Medicines Exchange — Built as a Real-World MERN Project
      </footer>
    </div>
  );
};

export default Home;
