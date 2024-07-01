import React, { useState, useEffect } from "react";
import { axiosLocalhost } from "../../axios/axiosInstances";
import { LOCALHOST_EVENTS_URL } from "../../axios/constants";
import axios from "axios";
import "./Table.css";

const TableTest = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch initial data (GET request)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosLocalhost.get(LOCALHOST_EVENTS_URL);
        setEvents(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // // Function to handle the POST request from Postman or simulated request
  // const handlePostRequest = async () => {
  //   const postData = {
  //     eventId: 12345,
  //     sensorId: "sensor_001",
  //     timestamp: "2024-06-26T12:34:56",
  //     eventType: "fire",
  //     eventData: "fwtiaaaaaaaaa",
  //   };

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8080/event",
  //       postData
  //     ); // Replace with your endpoint
  //     setEvents([...events, response.data]); // Update the state with the new data
  //   } catch (error) {
  //     setError(error);
  //   }
  // };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error.message}</h2>;
  }

  return (
    <div className="table-container">
      <h2>Test Table</h2>
      {/* <button onClick={handlePostRequest}>Simulate POST Request</button> */}
      <table>
        <thead>
          <tr>
            <th>Event ID</th>
            <th>Sensor ID</th>
            <th>Timestamp</th>
            <th>Event Type</th>
            <th>Event Data</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td>{event.eventId}</td>
              <td>{event.sensorId}</td>
              <td>{event.timestamp}</td>
              <td>{event.eventType}</td>
              <td>{event.eventData}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableTest;
