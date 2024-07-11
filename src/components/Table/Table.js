import React, { useState, useEffect } from "react";
import { axiosCicicom } from "../../axios/axiosInstances";
import {
  CICICOM_LOGIN_URL,
  CICICOM_LOGIN_TOKEN,
  CICICOM_OATH,
  CICICOM_PARKING_SENSORS_URL,
} from "../../axios/constants";
import "./Table.css";

const Table = ({ data, onToggleVisibility }) => {
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
        setLoading(false);
        onToggleVisibility(response.data.Result);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [authToken, onToggleVisibility]);

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
            <th>Toggle Visibility</th>
          </tr>
        </thead>
        <tbody>
          {data.map((spot) => (
            <tr key={spot.ID}>
              <td>{spot.ParkingSpaceName}</td>
              <td>{spot.ZoneName}</td>
              <td>{spot.CityName}</td>
              <td>{spot.Status}</td>
              <td>{spot.BatteryStatus}</td>
              <td>{spot.LastReport}</td>
              <td>
                <button onClick={() => onToggleVisibility(spot.ID)}>
                  Toggle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
