import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import { Button } from "@/components/ui/button";
//Navbar page

// Basic Pages
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar/TopNavbar/Nvabar";
import Footer from "./components/Navbar/Footer/Footer";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
