import { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../../css/app.css";

export default function MainLayout({ children }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="layout">
      <Sidebar isOpen={open} />

      <div className={`content ${open ? "shift" : ""}`}>
        <button className="toggle-btn" onClick={() => setOpen(!open)}>
          ☰
        </button>

        {children}
      </div>
    </div>
  );
}
