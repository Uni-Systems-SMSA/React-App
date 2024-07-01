import React, { useState, useEffect } from "react";
import axios from "axios";
import ParkingSpot from "./ParkingSpot";
import "./ParkingSpot.css";

const ParkingDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParkingData = async () => {
      try {
        const tokenResponse = await axios.post(
          "http://dev.smartgridnet.com/SmartGridPortalDev/API/Login/acquirenewtoken/CicicomDemo",
          "CicicomDemo123!@#",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Token Response:", tokenResponse);

        const authToken = tokenResponse.data.Result.TokenValue;

        const parkingDataResponse = await axios.get(
          "http://dev.smartgridnet.com/smartGridPortalDev/api/CitizentsΒΟ/GetAllParkingSensors",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `CicicomOath ${authToken}`,
            },
          }
        );
        console.log(parkingDataResponse);
        setData(parkingDataResponse.data.Result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchParkingData();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error.message}</h2>;
  }

  return (
    <div className="dashboard">
      <h2>Parking Table</h2>
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

export default ParkingDashboard;
