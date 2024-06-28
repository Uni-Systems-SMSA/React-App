// src/components/Table/Table.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import ParkingSpot from "../Parking/ParkingSpot";
import "./Table.css"; // Import the CSS for the table

const Table = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.post(
          "http://dev.smartgridnet.com/SmartGridPortalDev/API/Login/acquirenewtoken/CicicomDemo",
          "CicicomDemo123!@#",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
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
    if (authToken) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://dev.smartgridnet.com/smartGridPortalDev/api/CitizentsΒΟ/GetAllParkingSensors",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `CicicomOath ${authToken}`,
              },
            }
          );
          setData(response.data.Result);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [authToken]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error.message}</h2>;
  }

  return (
    <div className="table-container">
      <h2>Parking Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Parking Space Name</th>
            <th>Zone Name</th>
            <th>City Name</th>
            <th>Status</th>
            <th>Battery Status</th>
            <th>Last Report</th>
          </tr>
        </thead>
        <tbody>
          {data.map((spot) => (
            <ParkingSpot key={spot.ID} spot={spot} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
