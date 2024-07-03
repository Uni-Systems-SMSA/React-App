import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content"></div>
    </div>
  );
};

export default Dashboard;
