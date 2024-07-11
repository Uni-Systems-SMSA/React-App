// src/components/CicicomDashboard/CicicomDashboard.js

import React, { useState, useEffect } from "react";
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
  const [visibleSpots, setVisibleSpots] = useState({});

  useEffect(() => {
    const fetchTokenAndData = async () => {
      try {
        const response = await axiosCicicom.post(
          CICICOM_LOGIN_URL,
          CICICOM_LOGIN_TOKEN
        );
        if (response.data.Success) {
          const authToken = response.data.Result.TokenValue;
          const dataResponse = await axiosCicicom.get(
            CICICOM_PARKING_SENSORS_URL,
            {
              headers: {
                Authorization: `${CICICOM_OATH} ${authToken}`,
              },
            }
          );
          setData(dataResponse.data.Result);
          const initialVisibility = dataResponse.data.Result.reduce(
            (acc, spot) => ({ ...acc, [spot.ID]: true }),
            {}
          );
          setVisibleSpots(initialVisibility);
        } else {
          console.error("Failed to acquire token");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTokenAndData();
  }, []);

  const handleToggleVisibility = (id) => {
    setVisibleSpots((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className={styles["dashboard-container"]}>
      <div className={styles["dashboard-content"]}>
        <MapWithData data={data} visibleSpots={visibleSpots} />
        <Table data={data} onToggleVisibility={handleToggleVisibility} />
      </div>
    </div>
  );
};

export default CicicomDashboard;
