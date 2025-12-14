import { Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import PharmacyRegister from './pages/PharmacyRegister.jsx';
import SearchMedicine from './pages/SearchMedicine.jsx';
import UploadStock from './pages/UploadStock.jsx'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<PharmacyRegister />} />
        <Route path="/search" element={<SearchMedicine />} />
        <Route path="/upload" element={<UploadStock />} />
      </Routes>
    </>
  );
}

export default App;
