import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./CicicomDashboard.module.css";
import MapWithData from "../Map/MapWithData";
import Table from "../Table/Table";
import { axiosCicicom } from "../../axios/axiosInstances";
import {
  CICICOM_LOGIN_URL,
  CICICOM_LOGIN_TOKEN,
  CICICOM_OATH,
  CICICOM_PARKING_SENSORS_URL,
} from "../../axios/constants";

const CicicomDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axiosCicicom.post(
          CICICOM_LOGIN_URL,
          CICICOM_LOGIN_TOKEN
        );
        if (response.data.Success) {
          setAuthToken(response.data.Result.TokenValue);
        } else {
          setError("Failed to acquire token");
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!authToken) return;
      try {
        const response = await axiosCicicom.get(CICICOM_PARKING_SENSORS_URL, {
          headers: {
            Authorization: `${CICICOM_OATH} ${authToken}`,
          },
        });
        setData(response.data.Result);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [authToken]);

  const handleToggleVisibility = (spotId) => {
    // Example logic to toggle visibility
    const updatedData = data.map((spot) =>
      spot.ID === spotId ? { ...spot, visible: !spot.visible } : spot
    );
    setData(updatedData);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error.message}</h2>;
  }

  return (
    <div className={styles["dashboard-container"]}>
      <Navbar />
      <div className={styles["dashboard-content"]}>
        <MapWithData data={data} onToggleVisibility={handleToggleVisibility} />
        <Table data={data} onToggleVisibility={handleToggleVisibility} />
      </div>
    </div>
  );
};

export default CicicomDashboard;
