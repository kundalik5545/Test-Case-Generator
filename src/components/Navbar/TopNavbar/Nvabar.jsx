import { User, Zap } from "lucide-react";
import React from "react";
const websiteName = "Test Case Adder";
function Navbar() {
  return (
    <div>
      <div className="nav-logo shadow-sm bg-gray-100 flex items-center space-x-2 text-xl font-extrabold p-3">
        <Zap size={40} color="blue" />
        <span>{websiteName}</span>
      </div>
    </div>
  );
}

export default Navbar;
