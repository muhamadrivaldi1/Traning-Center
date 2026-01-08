import React, { useState } from "react";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="navbar" style={{ padding: "20px", background: "#131D78", color: "#fff" }}>
        <span
          className="menu-icon"
          onClick={() => setIsOpen(!isOpen)}
        >
          &#9776; 
        </span>
      </div>

      <Sidebar isOpen={isOpen} />  
    </>
  );
}
