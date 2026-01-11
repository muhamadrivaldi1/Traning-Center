import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { FiSun, FiUser } from "react-icons/fi";
import "../../css/app.css";

export default function Dashboard() {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("card");

    const events = [
        {
            title: "Pelatihan Web Development",
            image: "/images/WEb Development.jpeg",
        },
        {
            title: "UI / UX Design",
            image: "/images/UI UX.jpeg",
        },
        {
            title: "Cyber Security",
            image: "/images/Cyber.jpeg",
        },
        {
            title: "Data Science",
            image: "/images/Data.jpeg",
        },
        {
            title: "Mobile Development",
            image: "/images/Mobile App.jpeg",
        },
        {
            title: "Artificial Intelligence",
            image: "/images/AI.jpeg",
        },
    ];

    return (
        <>
            <Sidebar isOpen={isOpen} />

            <div className={`main-content ${isOpen ? "sidebar-open" : ""}`}>
                {/* HEADER */}
                <div className="topbar">
                    <div className="search-box">
                        <input type="text" placeholder="Search" />
                    </div>

                    <div className="topbar-right">
                        <FiSun className="topbar-icon" />
                        <FiUser className="topbar-avatar" />
                    </div>
                </div>

                {/* TITLE */}
                <h2 className="page-title">Daftar Pelatihan</h2>
                <hr />

                {/* TABS */}
                <div className="tabs">
                    <span
                        className={search === "card" ? "tab active" : "tab"}
                        onClick={() => setSearch("card")}
                    >
                        CARD VIEW
                    </span>
                    <span
                        className={search === "table" ? "tab active" : "tab"}
                        onClick={() => setSearch("table")}
                    >
                        TABLE VIEW
                    </span>
                </div>

                {/* SEARCH FILTER */}
                <div className="filter">
                    <label>Pencarian</label>
                    <input type="text" placeholder="Cari event..." />
                </div>

                {/* EVENT CARD */}
                <div className="event-grid">
                    {events.map((item, index) => (
                        <div className="event-card" key={index}>
                            <img src={item.image} alt={item.title} />
                            <h5>{item.title}</h5>
                        </div>
                    ))}
                </div>

                {/* FLOATING BUTTON */}
                <button className="help-btn">💬 PUSAT BANTUAN</button>
            </div>
        </>
    );
}
