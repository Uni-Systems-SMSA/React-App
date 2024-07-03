import React from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./CicicomDashboard.module.css"; // Import CSS module
import Map from "../Map/MapWithData";
import Table from "../Table/Table";
import MapWithData from "../Map/MapWithData";

const CicicomDashboard = () => {
  return (
    <div className={styles["dashboard-container"]}>
      <div className={styles["dashboard-content"]}>
        <MapWithData />
        <Table />
      </div>
    </div>
  );
};

export default CicicomDashboard;
