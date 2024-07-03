import React from "react";
import "./CicicomDashboard.css";
import MapWithData from "../Map/MapWithData";
import Table from "../Table/Table";

const CicicomDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <MapWithData />
        <Table />
      </div>
    </div>
  );
};

export default CicicomDashboard;
